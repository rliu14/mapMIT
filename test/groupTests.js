/* Lead author: Elysa */

var assert = require("assert");
var mongoose = require("mongoose");
var Event = require("../models/Event.js");
var User = require("../models/User.js");
var Loc = require("../models/Location.js");
var Group = require("../models/Group.js");

describe("Group", function() {
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

    describe("Create group", function() {
        it("should create a group successfully", function(done) {
            var content = {
                name: 'Test Group',
                creator: 'userA@mit.edu'
            };
            Group.createGroup(content, function(err, group) {
                assert.equal(group.name, 'Test Group');
                assert.equal(group.creator.email, 'userA@mit.edu');
                assert.equal(group.members.length, 1);
                done();
            });
        });

        it("should err when try to create a group", function(done) {
                done();
        });
    });
});