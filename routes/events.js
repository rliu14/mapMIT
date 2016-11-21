var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Event = require('../models/Event');

// create event
router.post('/', function(req, res) {

});

router.get('/:eventID', function(req, res) {

});

router.get('/location/:loc', function(req, res) {

});

router.get('/time/:time', function(req, res) {
	Event.findEventsByTime(Date.now(), function(err, events) {
		if (err) {
			utils.sendErrorResponse(res, 400, err.msg); 
		} else {
			utils.sendSuccessResponse(res, {events: events});
		}
	});
});

router.delete('/:eventID', function(req, res) {

});


module.exports = router;
