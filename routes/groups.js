/* Lead author: Elysa */

var express = require('express');
var router = express.Router();
var utils = require('../utils/utils');
var Group = require('../models/Group');

const checkForSessionEmail = function(req) {
	return req.session.email !== undefined;
}

/*
  POST /groups
  Request body:
    - content - in the format,
    {
          name: {String}
          creator: {String} email of the user   
    }
  Response:
    - success: true if group creation succeeded; false otherwise
    - createdGroup: on success, the group that was created
    - err: on error, an error message
*/
router.post('/', function(req, res) {
	if (!checkForSessionEmail(req)) {
		utils.sendErrorResponse(res, 403, 'not logged in');
		return;
	}
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
  GET /groups?query=query_string
  Request queries:
    - creator
    - memberOnly
    - member
  Response:
    - success: true if get groups succeeded; false otherwise
    - content: on success, an object with a single field 'foundGroups', the groups that were found
    - err: on error, an error message
*/
router.get('/', function(req, res) {
	if (!checkForSessionEmail(req)) {
		utils.sendErrorResponse(res, 403, 'not logged in');
		return;
	}
	// Find all groups by creator query
	if (req.query.creator != undefined) {
		Group.getGroupsByCreator(req.query.creator, function(err, foundGroups) {
			if (err) {
				utils.sendErrorResponse(res, 404, 'No such groups.'); 
			} else {
				utils.sendSuccessResponse(res, { foundGroups: foundGroups });
			};
		});
	// Find all groups by memberOnly query
	} else if (req.query.memberOnly != undefined) {
		Group.getGroupsWithMemberNotCreator(req.query.memberOnly, function(err, foundGroups) {
			if (err) {
				utils.sendErrorResponse(res, 404, 'No such groups.'); 
			} else {
				utils.sendSuccessResponse(res, { foundGroups: foundGroups });
			};
		});
	// Find all groups by member query
	} else if (req.query.member != undefined) {
		Group.getGroupsWithMember(req.query.member, function(err, foundGroups) {
			if (err) {
				utils.sendErrorResponse(res, 404, 'No such groups.'); 
			} else {
				utils.sendSuccessResponse(res, { foundGroups: foundGroups });
			};
		});
	}
})

/*
  PUT /groups/:groupId
  Request body:
    - username
  Response:
    - success: true if adding member succeeded; false otherwise
    - updatedGroup: on success, the group that was updated
    - err: on error, an error message
*/
router.put('/:groupId', function(req, res) {
	if (!checkForSessionEmail(req)) {
		utils.sendErrorResponse(res, 403, 'not logged in');
		return;
	}
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

/*
  DELETE /groups/:groupId
  Request body:
    - groupId
  Response:
    - success: true if delete group succeeded; false otherwise
    - updatedGroup: on success, the group that was deleted
    - err: on error, an error message
*/
router.delete('/:groupId/:email', function(req, res) {
	if (!checkForSessionEmail(req)) {
		utils.sendErrorResponse(res, 403, 'not logged in');
		return;
	}
	Group.findGroupAndRemoveMember(req.params.groupId, req.params.email, function(err, updatedGroup) {
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
