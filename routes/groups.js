/* Lead author: Elysa */

var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Group = require('../models/Group');


router.post('/', function(req, res) {
	Group.createGroup(req.body.content, function(err, createdGroup) {
		if(err) {
			if(err.msg) {
				utils.sendErrorResponse(res, 400, err.msg);
			} else {
				utils.sendErrorResponse(res, 500, 'An unknown error occurred.');
			};
		} else {
			utils.sendSuccessResponse(res, createdGroup);
		};
	});
});

/*
  GET /groups/creator/:creator
  Request body:
    - creator
  Response:
    - success: true if get events succeeded; false otherwise
    - content: on success, an object with a single field 'foundGroups', the events that were found
    - err: on error, an error message
*/
router.get('/creator/:creator', function(req, res) {
	Group.getGroupsByCreator(req.params.creator, function(err, foundGroups) {
		if (err) {
			utils.sendErrorResponse(res, 404, 'No such groups.'); // TODO is this right
		} else {
			utils.sendSuccessResponse(res, { foundGroups: foundGroups });
		};
	});
});

router.get('/memberonly/:member', function(req, res) {
	Group.getGroupsWithMemberNotCreator(req.params.member, function(err, foundGroups) {
		if (err) {
			utils.sendErrorResponse(res, 404, 'No such groups.'); // TODO is this right
		} else {
			utils.sendSuccessResponse(res, { foundGroups: foundGroups });
		};
	});
});

router.get('/member/:member', function(req, res) {
	Group.getGroupsWithMember(req.params.member, function(err, foundGroups) {
		if (err) {
			utils.sendErrorResponse(res, 404, 'No such groups.'); // TODO is this right
		} else {
			utils.sendSuccessResponse(res, { foundGroups: foundGroups });
		};
	});
});

router.put('/add/:groupId', function(req, res) {
	Group.findGroupAndAddMember(req.params.groupId, req.body.username, function(err, updatedGroup) {
		if(err) {
			if(err.msg) {
				utils.sendErrorResponse(res, 400, err.msg);
			} else {
				utils.sendErrorResponse(res, 500, 'An unknown error occurred.');
			};
		} else {
			utils.sendSuccessResponse(res, updatedGroup);
		};
	});
});

router.put('/remove/:groupId', function(req, res) {
	Group.findGroupAndRemoveMember(req.params.groupId, req.body.username, function(err, updatedGroup) {
		if(err) {
			if(err.msg) {
				utils.sendErrorResponse(res, 400, err.msg);
			} else {
				utils.sendErrorResponse(res, 500, 'An unknown error occurred.');
			};
		} else {
			utils.sendSuccessResponse(res, updatedGroup);
		};
	});
});


module.exports = router;
