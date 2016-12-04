/* Lead author: Rena */

var assert = require("assert");
var mongoose = require("mongoose");
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
            var content = [
                {name: 'maseeh',lat: 1,lng: 1 },
                {name: 'baker', lat: 2, lng: 2},
                {name: 'mccormick', lat: 3, lng: 5}];
            Loc.create(content[0], function(err, location) {
                Loc.create(content[1], function(err, location2) {
                    Loc.create(content[2], function(err, location3) {
                        done(); 
                    });
                });
            });
        });
    });

    describe("Location", function() {
        it("should find location by name database", function(done) {
            Loc.findLocation('maseeh', function(err, foundLocation){
                assert.notEqual(foundLocation, undefined);
                assert.equal(foundLocation.name, 'maseeh');
                assert.equal(foundLocation.lat, 1);
                assert.equal(foundLocation.lng, 1);
                done();
            });
        });

        it("should should not find any locations by name", function(done) {
            // Should return undefined if location name is not in db
            Loc.findLocation('mcc', function(err, foundLocation) {
                assert.equal(foundLocation, undefined);
                // Locations should be case sensitive
                Loc.findLocation('Maseeh', function(err, foundLocation) {
                    assert.equal(foundLocation, undefined)
                    done();  
                });
            });
        });
  });

})