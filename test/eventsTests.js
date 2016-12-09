/* Lead author: Dora */

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
            var content = [
                {name: 'maseeh',lat: 1,lng: 1 },
                {name: 'baker', lat: 2, lng: 2},
                {name: 'mccormick', lat: 3, lng: 5}];
            Loc.create(content[0], function(err, location) {
                Loc.create(content[1], function(err, location2) {
                    Loc.create(content[2], function(err, location3) {
                        // Add dummy users
                        User.createUser("User A", "userA@mit.edu", "pass", function(err, userA) {
                            User.createUser("User B", "userB@mit.edu", "pass2", function(err, userB) {
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
                startTime: new Date(),
                endTime: new Date(),
                room: '32-123',
                description: 'test description',
                locationDescription: 'test location description',
                creator: 'userA@mit.edu',
                location: 'maseeh'
            };
            Event.createEvent(content, function(err, mEvent) {
                assert.equal(mEvent.name, 'Test Event');
                done();
            });
        });

        it("should delete an event from the database", function(done) {
            var content = {
                name: 'Test Event',
                startTime: new Date(),
                endTime: new Date(),
                room: '32-123',
                description: 'test description',
                locationDescription: 'test location description',
                creator: 'userA@mit.edu',
                location: 'maseeh'
            };
            Event.createEvent(content, function(err, mEvent) {
                var eventID = mEvent._id;
                Event.deleteEvent(eventID, function(err, deletedEvent) {
                    Event.count(function(err, count){
                        assert.equal(count, 0);
                        done();
                    })
                })
            });
        });

        it("should find events by the creator", function(done) {
            var content = {
                name: 'Test Event',
                startTime: new Date(),
                endTime: new Date(),
                room: '32-123',
                description: 'test description',
                locationDescription: 'test location description',
                creator: 'userA@mit.edu',
                location: 'maseeh'
            };
            Event.createEvent(content, function(err, mEvent) {
                Event.findEventsByCreator('userA@mit.edu', function(err, events) {
                    assert.equal(events.length, 1);
                    assert.deepEqual(events[0]._id, mEvent._id);
                    assert.equal(events[0].name, 'Test Event');
                    done();
                })
            }); 
        });

        it("should find an event by an id", function(done) {
            var content = {
                name: 'Test Event',
                startTime: new Date(),
                endTime: new Date(),
                room: '32-123',
                description: 'test description',
                locationDescription: 'test location description',
                creator: 'userA@mit.edu',
                location: 'maseeh'
            };
            Event.createEvent(content, function(err, mEvent) {
                var eventID = mEvent._id;
                Event.findEventByID(eventID, function(err, foundEvent) {
                    assert.deepEqual(mEvent._id, foundEvent._id);
                    done();
                })
            });
        });

        it("should find events by location", function(done) {
            var content = {
                name: 'Test Event',
                startTime: new Date(),
                endTime: new Date(),
                room: '32-123',
                description: 'test description',
                locationDescription: 'test location description',
                creator: 'userA@mit.edu',
                location: 'maseeh'
            };
            Event.createEvent(content, function(err, mEvent) {
                Event.findEventsByLocation('maseeh', function(err, events) {
                    assert.equal(events.length, 1);
                    assert.deepEqual(mEvent._id, events[0]._id);
                    done();
                })
            }); 
        });

        it("should find events by time", function(done) {
            var content = {
                name: 'Test Event',
                startTime: new Date('2014-01'),
                endTime: new Date('2016-01'),
                room: '32-123',
                description: 'test description',
                locationDescription: 'test location description',
                creator: 'userA@mit.edu',
                location: 'maseeh'
            };
            Event.createEvent(content, function(err, mEvent) {
                var time = new Date('2015-01');
                var startTime = new Date('2014-01');
                Event.findEventsByTime(time, function(err, events) {
                    assert.equal(events.length, 1);
                    assert.deepEqual(mEvent.startTime, startTime);
                    done();
                })
            });
        });

        it("should find a specific event by id, then update that event", function(done) {
            var content = {
                name: 'Test Event',
                startTime: new Date(),
                endTime: new Date(),
                room: '32-123',
                description: 'test description',
                locationDescription: 'test location description',
                creator: 'userA@mit.edu',
                location: 'maseeh'
            };
            Event.createEvent(content, function(err, mEvent) {
                var eventID = mEvent._id;
                var newContent = {
                    name: 'Updated Event',
                    startTime: new Date(),
                    endTime: new Date(),
                    room: '26-100',
                    description: 'test description',
                    locationDescription: 'test location description',
                    creator: 'userA@mit.edu',
                    location: 'maseeh'
                };
                Event.findAndUpdateEvent(eventID, newContent, function(err, updatedEvent) {
                    assert.deepEqual(updatedEvent._id, mEvent._id);
                    assert.equal(updatedEvent.name, 'Updated Event');
                    assert.equal(updatedEvent.room, '26-100');
                    done();
                });
            });
        });

        it("should filter events by time", function(done) {
            var content1 = {
                    name: 'Event 1',
                    startTime: new Date('November 17, 2016 03:24:00'),
                    endTime: new Date('February 17, 2017 03:24:00'),
                    description: 'test description',
                    locationDescription: 'test location description',
                    creator: 'userA@mit.edu',
                    location: 'maseeh'
            };
            var content2 = {
                    name: 'Event 2',
                    startTime: new Date('January 17, 2017 03:24:00'),
                    endTime: new Date('February 17, 2017 03:24:00'),
                    description: 'test description',
                    locationDescription: 'test location description',
                    creator: 'userA@mit.edu',
                    location: 'baker'
            };
            var searchDict = {
                startTime: {$lt: new Date('December 17, 2016 03:24:00')},
                endTime: {$gt: new Date('December 17, 2016 03:24:00')}
            };

            Event.createEvent(content1, function(err, event1) {
                Event.createEvent(content2, function(err, event2) {
                    Event.filterEvents(searchDict, function(err, filteredEvents) {
                        assert.equal(filteredEvents.length, 1);
                        assert.equal(filteredEvents[0].name, 'Event 1');
                        done();
                    });
                });
            });
        });

        it("should filter events by location", function(done) {
            var content1 = {
                    name: 'Event 1',
                    startTime: new Date('November 17, 2016 03:24:00'),
                    endTime: new Date('February 17, 2017 03:24:00'),
                    description: 'test description',
                    locationDescription: 'test location description',
                    creator: 'userA@mit.edu',
                    location: 'maseeh'
            };
            var content2 = {
                    name: 'Event 2',
                    startTime: new Date('January 17, 2017 03:24:00'),
                    endTime: new Date('February 17, 2017 03:24:00'),
                    description: 'test description',
                    locationDescription: 'test location description',
                    creator: 'userA@mit.edu',
                    location: 'baker'
            };
            var searchDict = {
                location: 'maseeh'
            };

            Event.createEvent(content1, function(err, event1) {
                Event.createEvent(content2, function(err, event2) {
                    Event.filterEvents(searchDict, function(err, filteredEvents) {
                        assert.equal(filteredEvents.length, 1);
                        assert.equal(filteredEvents[0].name, 'Event 1');
                        done();
                    });
                });
            });
        });

        it("should filter events by public events", function(done) {
            var content1 = {
                    name: 'Event 1',
                    startTime: new Date('November 17, 2016 03:24:00'),
                    endTime: new Date('February 17, 2017 03:24:00'),
                    description: 'test description',
                    locationDescription: 'test location description',
                    creator: 'userA@mit.edu',
                    location: 'maseeh',
                    isPublic: true
            };
            var content2 = {
                    name: 'Event 2',
                    startTime: new Date('January 17, 2017 03:24:00'),
                    endTime: new Date('February 17, 2017 03:24:00'),
                    description: 'test description',
                    locationDescription: 'test location description',
                    creator: 'userA@mit.edu',
                    location: 'baker',
                    isPublic: false
            };
            var searchDict = {
                isPublic: true
            };

            Event.createEvent(content1, function(err, event1) {
                Event.createEvent(content2, function(err, event2) {
                    Event.filterEvents(searchDict, function(err, filteredEvents) {
                        assert.equal(filteredEvents.length, 1);
                        assert.equal(filteredEvents[0].name, 'Event 1');
                        done();
                    });
                });
            });
        });

        it("should filter events by group-specific events", function(done) {
            Group.createGroup({name: 'User A Group', creator: 'user_a'}, function(err, group) {
                var content1 = {
                    name: 'Event 1',
                    startTime: new Date('November 17, 2016 03:24:00'),
                    endTime: new Date('February 17, 2017 03:24:00'),
                    description: 'test description',
                    locationDescription: 'test location description',
                    creator: 'userA@mit.edu',
                    location: 'maseeh',
                    isPublic: false,
                    groupsVisibleTo: [group]
                };
                var content2 = {
                        name: 'Event 2',
                        startTime: new Date('January 17, 2017 03:24:00'),
                        endTime: new Date('February 17, 2017 03:24:00'),
                        description: 'test description',
                        locationDescription: 'test location description',
                        creator: 'userA@mit.edu',
                        location: 'baker'
                };
                var searchDict = {
                    groupsVisibleTo: [group]
                };

                Event.createEvent(content1, function(err, event1) {
                    Event.createEvent(content2, function(err, event2) {
                        Event.filterEvents(searchDict, function(err, filteredEvents) {
                            assert.equal(filteredEvents.length, 1);
                            assert.equal(filteredEvents[0].name, 'Event 1');
                            done();
                        });
                    });
                });
            });            
        });

        it("should filter events by time, location, and public events", function(done) {
            Group.createGroup({name: 'User A Group', creator: 'user_a'}, function(err, group) {
                var content1 = {
                    name: 'Event 1',
                    startTime: new Date('November 17, 2016 03:24:00'),
                    endTime: new Date('February 17, 2017 03:24:00'),
                    description: 'test description',
                    locationDescription: 'test location description',
                    creator: 'userA@mit.edu',
                    location: 'maseeh',
                    isPublic: false,
                    groupsVisibleTo: [group]
                };
                var content2 = {
                        name: 'Event 2',
                        startTime: new Date('January 17, 2017 03:24:00'),
                        endTime: new Date('February 17, 2017 03:24:00'),
                        description: 'test description',
                        locationDescription: 'test location description',
                        creator: 'userA@mit.edu',
                        location: 'baker',
                        isPublic: true
                };
                var searchDict = {
                    location: 'baker',
                    isPublic: true,
                    startTime: {$lt: new Date('February 10, 2017 03:24:00')},
                    endTime: {$gt: new Date('December 17, 2016 03:24:00')}
                };

                Event.createEvent(content1, function(err, event1) {
                    Event.createEvent(content2, function(err, event2) {
                        Event.filterEvents(searchDict, function(err, filteredEvents) {
                            assert.equal(filteredEvents.length, 1);
                            assert.equal(filteredEvents[0].name, 'Event 2');
                            done();
                        });
                    });
                });
            }); 
        });

        it("should filter for all events", function(done) {
            var content1 = {
                    name: 'Event 1',
                    startTime: new Date('November 17, 2016 03:24:00'),
                    endTime: new Date('February 17, 2017 03:24:00'),
                    description: 'test description',
                    locationDescription: 'test location description',
                    creator: 'userA@mit.edu',
                    location: 'maseeh',
                    isPublic: true
            };
            var content2 = {
                    name: 'Event 2',
                    startTime: new Date('January 17, 2017 03:24:00'),
                    endTime: new Date('February 17, 2017 03:24:00'),
                    description: 'test description',
                    locationDescription: 'test location description',
                    creator: 'userA@mit.edu',
                    location: 'baker',
                    isPublic: false
            };

            Event.createEvent(content1, function(err, event1) {
                Event.createEvent(content2, function(err, event2) {
                    Event.filterEvents({}, function(err, filteredEvents) {
                        assert.equal(filteredEvents.length, 2);
                        done();
                    });
                });
            });
        });
    });

})
