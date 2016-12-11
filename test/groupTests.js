/* Lead author: Elysa */

var assert = require("assert");
var mongoose = require("mongoose");
var Event = require("../models/Event.js");
var User = require("../models/User.js");
var Loc = require("../models/Location.js");
var Group = require("../models/Group.js");

describe("App", function() {
    // The mongoose connection object
    var con;

    // Before running any tests, connect to mapmit database
    before(function(done) {
        con = mongoose.connect("mongodb://localhost/mapmitTest", function() {
            done();
        });
    });

    // Delete the database before each test.
    beforeEach(function(done) {
        con.connection.db.dropDatabase(function() {
            // Add in necessary locations
            var content = [{name: 'maseeh', lat: 1, lng: 1 }];
            Loc.create(content[0], function(err, location) {
                // Add dummy users
                var userA_content = {username : 'UserA', email : 'userA@mit.edu', password : 'password'};
                User.create(userA_content, function(err, userA) {
                    assert.equal(err, null);
                    userB_content = {username: "User B", email: "userB@mit.edu", password: "password2"};
                    User.create(userB_content, function(err, userB) {
                        assert.equal(err, null);
                        done();
                    });
                });
            });
        });
    });

	describe("Group", function() {

	    describe("Create group", function() {
	        it("should create a group successfully", function(done) {
	            var content = {
	                name: 'Test Group',
	                creator: 'userA@mit.edu'
	            };
	            Group.createGroup(content, function(err, group) {
	            	assert.equal(err, null);
	                assert.equal(group.name, 'Test Group');
	                assert.equal(group.creator.email, 'userA@mit.edu');
	                assert.equal(group.members.length, 1);
	                done();
	            });
	        });

	        it("should err when try to create a group", function(done) {
				var content = {
	                name: 'Test Group',
	                creator: 'ekohrs@mit.edu'
	            };
	            Group.createGroup(content, function(err, group) {
	            	assert.notEqual(err, null);
	                done();
	            });
	        });
    	});
		
		describe("Get groups by creator", function() {
	        it("should get group by creator", function(done) {
	            var content = {
	                name: 'Test Group',
	                creator: 'userA@mit.edu'
	            };
	            Group.createGroup(content, function(err, group) {
	            	assert.equal(err, null);
	            	var content2 = {
		                name: 'Test Group 2',
		                creator: 'userB@mit.edu'
		            };
	            	Group.createGroup(content2, function(err, group) {
	            		assert.equal(err, null);
		            	Group.getGroupsByCreator('userA@mit.edu', function(err, groups) {
		            		assert.equal(err, null);
		            		assert.equal(groups.length, 1);
		            		done();
		            	});
		            });
	            });
	        });

	        it("should get no groups by creator", function(done) {
				var content = {
	                name: 'Test Group',
	                creator: 'userA@mit.edu'
	            };
	            Group.createGroup(content, function(err, group) {
	            	assert.equal(err, null);
	            	Group.getGroupsByCreator('userB@mit.edu', function(err, groups) {
	            		assert.equal(err, null);
	            		assert.equal(groups.length, 0);
	            		done();
	            	});
	            });
	        });
    	});

		describe("Find group and add member", function() {
	        it("should find group and add new member", function(done) {
	            var content = {
	                name: 'Test Group',
	                creator: 'userA@mit.edu'
	            };
	            Group.createGroup(content, function(err, group) {
	            	assert.equal(err, null);
	            	var groupId = group._id;
		            assert.equal(group.members.length, 1);
	            	Group.findGroupAndAddMember(groupId, 'userB@mit.edu', function(err, group) {
	            		assert.equal(err, null);
		            	assert.equal(group.members.length, 2);
		            	done();
		            });
	            });
	        });

	        it("should find group and err if try to add existing member", function(done) {
	            var content = {
	                name: 'Test Group',
	                creator: 'userA@mit.edu'
	            };
	            Group.createGroup(content, function(err, group) {
	            	assert.equal(err, null);
	            	var groupId = group._id;
		            assert.equal(group.members.length, 1);
	            	Group.findGroupAndAddMember(groupId, 'userB@mit.edu', function(err, group) {
	            		assert.equal(err, null);
	            		assert.equal(group.members.length, 2);
	            		Group.findGroupAndAddMember(groupId, 'userB@mit.edu', function(err, group) {
			            	assert.notEqual(err, null);
			            	done();
			            });
		            });
	            });
	        });
    	});

		describe("Find group and remove member", function() {
	        it("should find group and remove member of group", function(done) {
	            var content = {
	                name: 'Test Group',
	                creator: 'userA@mit.edu'
	            };
	            Group.createGroup(content, function(err, group) {
	            	assert.equal(err, null);
	            	var groupId = group._id;
		            assert.equal(group.members.length, 1);
	            	Group.findGroupAndAddMember(groupId, 'userB@mit.edu', function(err, group) {
	            		assert.equal(err, null);
		            	assert.equal(group.members.length, 2);
		            	Group.findGroupAndRemoveMember(groupId, 'userB@mit.edu', function(err, group) {
		            		assert.equal(err, null);
			            	assert.equal(group.members.length, 1);
			            	done();
			            });
		            });
	            });
	        });

	        it("should find group and err if try to remove a member not in group", function(done) {
	            var content = {
	                name: 'Test Group',
	                creator: 'userA@mit.edu'
	            };
	            Group.createGroup(content, function(err, group) {
	            	assert.equal(err, null);
	            	var groupId = group._id;
		            assert.equal(group.members.length, 1);
	            	Group.findGroupAndRemoveMember(groupId, 'userB@mit.edu', function(err, group) {
	            		assert.equal(err, null);
		            	assert.equal(group.members.length, 1);
		            	done();
		            });
	            });
	        });
    	});
    });
});