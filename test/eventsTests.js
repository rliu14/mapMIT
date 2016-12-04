/* Lead author: Dora */

var assert = require("assert");
var mongoose = require("mongoose");
var Event = require("../models/Event.js");
var User = require("../models/User.js");
var Loc = require("../models/Location.js");


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
            var content = [
                {name: 'maseeh',lat: 1,lng: 1 },
                {name: 'baker', lat: 2, lng: 2},
                {name: 'mccormick', lat: 3, lng: 5}];
            Loc.create(content[0], function(err, location) {
                Loc.create(content[1], function(err, location2) {
                    Loc.create(content[2], function(err, location3) {
                        // Add dummy users
                        User.createUser("user_a", "pass", function(err, user) {
                            User.createUser("user_b", "pass2", function(err, user) {
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

    describe("Event", function() {
        it("should create an event in the database", function(done) {
       		var content = {
               	name: 'Test Event',
               	startTime: Date.now(),
               	endTime: Date.now(),
               	room: '32-123',
               	description: 'test description',
              	locationDescription: 'test location description',
                creator: 'user_a',
                location: 'maseeh'
           	};
           	Event.createEvent(content, function(err, mEvent) {
           		assert.equal(mEvent.name, 'Test Event');
           		done();
           	});
        });

        it("should delete an event from the database", function(done) {
            done();
        });

        it("should find events by the creator", function(done) {
            done();  
        });

        it("should find an event by an id", function(done) {
            done();  
        });

        it("should find events by location", function(done) {
            done();  
        });

        it("should find events by time", function(done) {
            done();  
        });

        it("should find a specific event by id, then update that event", function(done) {
            done();  
        });
    });

})
