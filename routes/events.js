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
          location: {Location}, 
          locationDescription: {String},
          host: {String},
          creator: {User}      
    }
  Response:
    - success: true if event creation succeeded; false otherwise
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
  PUT /events/update/:eventId
  Request body:
    - eventID
    - content - in the format,
    {
          name: {String}
          startTime: {Date},
          endTime: {Date},
          room: {String},
          description: {String},
          location: {Location}, 
          locationDescription: {String},
          host: {String},
          creator: {User}      
    }
  Response:
    - success: true if event update succeeded; false otherwise
    - err: on error, an error message
*/
router.put('/update/:eventId', function(req, res) {
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
  PUT /events/filter
  Request body:
    - content - in the format,
    {
          startTime: {Date},
          endTime: {Date},
          location: {Location},    
    }
  Response:
    - success: true if event filtering succeeded; false otherwise
    - err: on error, an error message
*/
router.put('/filter', function(req, res) {
  console.log('filter route');
  Event.filterEvents(req.body.content, function(err, filteredEvents) {
    console.log('filtered events from route');
    console.log(filteredEvents);
    if (err) {
      utils.sendErrorResponse(res, 400, err.msg); 
    } else {
      utils.sendSuccessResponse(res, {filteredEvents: filteredEvents});
    };
  });
});

/*
  GET /events/:eventID
  Request body:
    - eventID
  Response:
    - success: true if get event succeeded; false otherwise
    - content: on success, an object with a single field 'foundEvent', the event that was found
    - err: on error, an error message
*/
router.get('/:eventID', function(req, res) {
	Event.findEventByID(req.params.eventID, function(err, foundEvent) {
		if(err) {
			utils.sendErrorResponse(res, 404, 'No such event.');
		} else {
			utils.sendSuccessResponse(res, { foundEvent: foundEvent });
		};
	});
});

/*
  GET /events/creator/:creator
  Request body:
    - creator
  Response:
    - success: true if get events succeeded; false otherwise
    - content: on success, an object with a single field 'foundEvents', the events that were found
    - err: on error, an error message
*/
router.get('/creator/:creator', function(req, res) {
	console.log('route for get by creator');
	Event.findEventsByCreator(req.params.creator, function(err, foundEvents) {
		if (err) {
			utils.sendErrorResponse(res, 404, 'No such events.');
		} else {
			utils.sendSuccessResponse(res, { foundEvents: foundEvents });
		};
	});
});

/*
  GET /events/location/:loc
  Request body:
    - loc
  Response:
    - success: true if get events succeeded; false otherwise
    - content: on success, an object with a single field 'foundEvents', the events that were found
    - err: on error, an error message
*/
router.get('/location/:loc', function(req, res) {
  console.log('location route');
  console.log(req.params.loc);
	Event.findEventsByLocation(req.params.loc, function(err, foundEvents) {
    console.log('foundEvents');
    console.log(foundEvents);
		if(err) {
			utils.sendErrorResponse(res, 404, 'No such events.');
		} else {
			utils.sendSuccessResponse(res, { foundEvents: foundEvents });
		}
	});
});

/*
  GET /events/time/:time
  Request body:
    - time
  Response:
    - success: true if get events succeeded; false otherwise
    - content: on success, an object with a single field 'events', the events that were found
    - err: on error, an error message
*/
router.get('/time/:time', function(req, res) {
	Event.findEventsByTime(req.params.time, function(err, events) {
		if (err) {
			utils.sendErrorResponse(res, 400, err.msg); 
		} else {
			utils.sendSuccessResponse(res, {events: events});
		}
	});
});



/*
  DELETE /events/:eventID
  Request body:
    - eventID
  Response:
    - success: true if get events succeeded; false otherwise
    - content: on success, an object with a single field 'deletedEvent', the event that was deleted
    - err: on error, an error message
*/
router.delete('/:eventID', function(req, res) {
	Event.deleteEvent(req.params.eventID, function(err, deletedEvent) {
		if(err) {
			utils.sendErrorResponse(res, 400, err.msg); 
		} else {
			utils.sendSuccessResponse(res, {deletedEvent: deletedEvent});
		};
	});
});

module.exports = router;
