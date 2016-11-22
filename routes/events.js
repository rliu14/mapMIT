var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Event = require('../models/Event');

// create event
router.post('/', function(req, res) {
	Event.create({
		name: req.body.content.eventName,
		description: req.body.content.eventDescription,
	    startTime: req.body.content.startTime,
	    endTime: req.body.content.endTime,
	    roomNumber: req.body.content.roomNumber,
	    location: req.body.content.location,
	    locationDescription: req.body.content.locationDescription,
	    host: req.body.content.host
	    creator: req.body.content.creator
	}, function(err, createdEvent) {
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

router.get('/:eventID', function(req, res) {
	Event.findEventByID(req.params.eventID, function(err, foundEvent) {
		if(err) {
			utils.sendErrorResponse(res, 404, 'No such event.');
		} else {
			utils.sendSuccessResponse(res, { foundEvent: foundEvent });
		};
	});
});

router.get('/:creator', function(req, res) {
	Event.findEventsByCreator(req.params.creator, function(err, foundEvents) {
		if (err) {
			utils.sendErrorResponse(res, 404, 'No such events.');
		} else {
			utils.sendSuccessResponse(res, { foundEvents: foundEvents });
		};
	});
});

router.get('/location/:loc', function(req, res) {
	Event.findEventsByLocation(req.params.loc, function(err, foundEvents) {
		if(err) {
			utils.sendErrorResponse(res, 404, 'No such events.');
		} else {
			utils.sendSuccessResponse(res, { foundEvents: foundEvents });
		}
	});
});

router.get('/time/:time', function(req, res) {
	// console.log("get by time");
	// utils.sendSuccessResponse(res, {events: [{name: 'Elysa', host: 'me', description: 'desc', date: '49', time: 'omg', location: 'hadsfk'}, {name: 'rena bena', host: 'me', description: 'desc', date: '49', time: 'omg', location: 'hadsfk'}]});
	Event.findEventsByTime(req.params.time, function(err, events) {
		if (err) {
			utils.sendErrorResponse(res, 400, err.msg); 
		} else {
			utils.sendSuccessResponse(res, {events: events});
		}
	});
});

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
