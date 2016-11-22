var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Event = require('../models/Event');
var Locationn = require('../models/Location');

// create event
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
	// var location1 = {_id: "1", name: "Maseeh", text: "EVENT", lat: 42.3577, lng: -71.0934};
	// var location2 = {_id: "2", name: "Baker", text: "blahblah", lat: 42.356791, lng: -71.095381};
	// utils.sendSuccessResponse(res, {events: [{name: 'Elysa', host: 'me', description: 'elysa\'s event!', date: '49', time: 'omg', location: location1},
	// 										{name: 'dora', host: 'blah', description: 'dora\'s event', date: '49', time: 'omg', location: location1} ,   
	// 										{name: 'rena bena', host: 'me', description: 'rena\'s event', date: '49', time: 'omg', location: location2} ]});
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
