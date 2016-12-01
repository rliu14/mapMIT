/* Lead author: Dora */

var assert = require("assert");
var mongoose = require("mongoose");
var Event = require("../models/Event.js");
var User = require("../models/User.js");

describe("App", function() {
  // The mongoose connection object
  var con;

  // Before running any tests, connect to mapmit database
  before(function(done) {
    con = mongoose.connect("mongodb://localhost/mapmit", function() {
      done();
    });
  });

  // Delete the database before each test.
  beforeEach(function(done) {
    con.connection.db.dropDatabase(function() { done(); });
  });

  describe("Event", function() {
    it("should create an event in the database", function(done) {
    	done();
   		// var content = {
     //       	name: 'Test Event',
     //       	startTime: Date.now(),
     //       	endTime: Date.now(),
     //       	room: '32-123',
     //       	description: 'test description',
     //      	locationDescription: 'test location description'
     //   	};
     //   	Event.createEvent(content, function(err, mEvent) {
     //   		assert.equal(mEvent.name, 'Test Event');
     //   		done();
     //   	});
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
