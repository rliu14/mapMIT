/* Lead author: Dora */

var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Event = require('../models/Event');

/*
  POST /events
  Request body:
    - content - in the format,
    {
          name: {String}
          startTime: {Date},
          endTime: {Date},
          room: {String},
          description: {String},
          location: {String}, 
          locationDescription: {String},
          host: {String},
          creator: {String} email of the user    
    }
  Response:
    - success: true if event creation succeeded; false otherwise
    - createdEvent: on success, the event that was created
    - err: on error, an error message
*/
router.post('/', function(req, res) {
	Event.createEvent(req.body.content, function(err, createdEvent) {
		if(err) {
			if(err.msg) {
				utils.sendErrorResponse(res, 400, err.msg);
			} else {
				utils.sendErrorResponse(res, 500, 'An unknown error occurred.');
			};
		} else {
			utils.sendSuccessResponse(res, createdEvent);
		};
	});
});

/*
  PUT /events/filter
  Request body:
    - content - in the format,
    {
          startTime: {Date},
          endTime: {Date},
          location: {String},    
    }
  Response:
    - success: true if event filtering succeeded; false otherwise
    - content: on success, an object with a single field 'filteredEvents', the events that were filtered for
    - err: on error, an error message
*/
router.put('/filter', function(req, res) {
  Event.filterEvents(req.body.content, function(err, filteredEvents) {
    if (err) {
      utils.sendErrorResponse(res, 400, err.msg); 
    } else {
      utils.sendSuccessResponse(res, {filteredEvents: filteredEvents});
    };
  });
});

/*
  PUT /events/:eventId
  Request body:
    - eventID
    - content - in the format,
    {
          name: {String}
          startTime: {Date},
          endTime: {Date},
          room: {String},
          description: {String},
          location: {String}, 
          locationDescription: {String},
          host: {String},
          creator: {String} email of the user  
    }
  Response:
    - success: true if event update succeeded; false otherwise
    - updatedEvent: on success, the event that was updated
    - err: on error, an error message
*/
router.put('/:eventId', function(req, res) {
	Event.findAndUpdateEvent(req.params.eventId, req.body.content, function(err, updatedEvent) {
		if(err) {
			if(err.msg) {
				utils.sendErrorResponse(res, 400, err.msg);
			} else {
				utils.sendErrorResponse(res, 500, 'An unknown error occurred.');
			};
		} else {
			utils.sendSuccessResponse(res, updatedEvent);
		};
	});
});

/*
  GET /events?query=query_string
  Request queries:
    - loc
    - creator
    - time
    - eventID
  Response:
    - success: true if get events succeeded; false otherwise
    - content: on success, an object with a single field 'foundEvents', the events that were found
    - err: on error, an error message
*/
router.get('/', function(req, res) {
  // Find all events by location query
  if (req.query.loc != undefined) {
    Event.findEventsByLocation(req.query.loc, function(err, foundEvents) {
      if(err) {
        utils.sendErrorResponse(res, 404, 'No such events.');
      } else {
        utils.sendSuccessResponse(res, { foundEvents: foundEvents });
      }
    });
  // Find all events by creator query
  } else if (req.query.creator != undefined) {
    Event.findEventsByCreator(req.query.creator, function(err, foundEvents) {
      if (err) {
        utils.sendErrorResponse(res, 404, 'No such events.');
      } else {
        utils.sendSuccessResponse(res, { foundEvents: foundEvents });
      };
    });
  // Find all events by time query
  } else if (req.query.time != undefined) {
    Event.findEventsByTime(req.query.time, function(err, events) {
      if (err) {
        utils.sendErrorResponse(res, 400, err.msg); 
      } else {
        utils.sendSuccessResponse(res, {events: events});
      }
    });
  // Find event by event id query
  } else if (req.query.eventID != undefined) {
    Event.findEventByID(req.query.eventID, function(err, foundEvent) {
      if(err) {
        utils.sendErrorResponse(res, 404, 'No such event.');
      } else {
        utils.sendSuccessResponse(res, { foundEvent: foundEvent });
      };
    });
  } else {
      utils.sendErrorResponse(res, 404, 'No such event.');
  };
});

/*
  DELETE /events/:eventID
  Response:
    - success: true if get events succeeded; false otherwise
    - content: on success, an object with a single field 'deletedEvent', the event that was deleted
    - err: on error, an error message
*/
router.delete('/:eventID/:currentUser', function(req, res) {
  Event.findEventByID(req.params.eventID, function(err, mEvent) {
    if (mEvent.creator.email == req.params.currentUser) {
      Event.deleteEvent(req.params.eventID, function(err, deletedEvent) {
        if(err) {
          utils.sendErrorResponse(res, 400, err.msg); 
        } else {
          utils.sendSuccessResponse(res, {deletedEvent: deletedEvent});
        };
      });
    } else {
      utils.sendErrorResponse(res, 400, 'You cannot delete this event.'); 
    };
  });
});

module.exports = router;
