/* Lead author: Dora */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require("./User.js");
var Loc = require("./Location.js");

/* Schema to represent the Event model */
var eventSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: null },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    room: { type: String, default: null },
    location: { type: ObjectId, ref: 'Location', default: null },
    locationDescription: { type: String, default: null },
    host: { type: String, default: null },
    creator: { type: ObjectId, ref: 'User', default: null },
    isPublic: { type: Boolean, default: true },
    groupsVisibleTo: [{ type: ObjectId, ref: 'Group'}]
});

/**
 * Creates an event in the events database.
 * @param {Object} content The information needed to create an event,
 *      content is in the format - {
 *          name: {String}
 *          startTime: {Date},
 *          endTime: {Date},
 *          room: {String},
 *          description: {String},
 *          location: {Location}, 
 *          locationDescription: {String},
 *          host: {String},
 *          creator: {User}
 *      }
 * @param {Function} cb The callback function to execute, of the
 *      format cb(err).
 */
eventSchema.statics.createEvent = function(content, cb) {
    var username = content.creator;
    var location = content.location;
    var Event = this;
    User.findUser(username, function(err, creator) {
        if (err) {
            cb({ msg: err });
        } else {
            content.creator = creator;
            Loc.findLocation(location, function(err, foundLocation) {
                if (err) {
                    cb({ msg: err });
                } else {
                    content.location = foundLocation;
                    Event.create(content, cb);
                };
            });
        };
    });    
};

/**
 * Deletes specified event from events database.
 * @param {String} eventID The id of the event we want to delete
 * @param {Function} cb The callback function to execute, of the
 *      format cb(err, deletedEvent), where deletedEvent is the
 *          event that was just deleted.
 */
eventSchema.statics.deleteEvent = function(eventID, cb) {
    this.findByIdAndRemove(eventID, function(err, deletedEvent) {
        if (err) {
            cb({ msg: err });
        } else if (deletedEvent != null) {
            // event is properly deleted
            cb(err, deletedEvent);
        } else {
            cb({ msg: 'Event not deleted.' });
        };
    });
};

/**
 * Finds events in the events database that are created by a specified creator.
 * @param {String} eventCreator The specified creator
 * @param {Function} cb The callback function to execute, of the
 *      format cb(err, events), where events is the
 *          list of events created by eventCreator.
 */
eventSchema.statics.findEventsByCreator = function(eventCreator, cb) {
    var Event = this;
    User.findUser(eventCreator, function(err, user) {
        if (err) {
            cb({ msg: err });
        } else {
            Event.find( { creator: user }, function(err, events) {
                if (err) {
                    cb({ msg: err });
                } else {
                    cb(err, events);
                };
            });
        };
    });
};

/**
 * Finds the specified event from events database.
 * @param {String} eventID The id of the event we want to find
 * @param {Function} cb The callback function to execute, of the
 *      format cb(err, foundEvent), where foundEvent is the
 *          event that was just found.
 */
eventSchema.statics.findEventByID = function(eventID, cb) {
    this.findById(eventID, function(err, foundEvent) {
        if (err) {
            cb({ msg: err });
        } else {
            cb(err, foundEvent);
        };
    });
};

/**
 * Finds events from then events database with a specified location.
 * @param {ObjectId} loc The specified location
 * @param {Function} cb The callback function to execute, of the
 *      format cb(err, events), where events is the
 *          list of events at the specified location.
 */
eventSchema.statics.findEventsByLocation = function(loc, cb) {
    var Event = this;
    Loc.findLocation(loc, function(err, foundLocation) {
        if (err) {
            cb({ msg: err });
        } else {
            Event.find( { location: foundLocation}, function(err, events) {
                if (err) {
                    cb( { msg: err });
                } else {
                    // found events with specified location

                    cb(err, events);
                }
            }).populate('location');
        };
    });    
};

/**
 * Finds events from then events database happening at a specified time.
 * @param {Date} time The specified time
 * @param {Function} cb The callback function to execute, of the
 *      format cb(err, events), where events is the
 *          list of events at the specified time.
 */
eventSchema.statics.findEventsByTime = function(time, cb) {
    this.find( { startTime: {$lt: time}, endTime: {$gt: time} }).populate('location').exec(function(err, events) {
        if (err) {
            cb({ msg: err });
        } else {
            cb(err, events);
        }
    });
};

eventSchema.statics.filterEvents = function(locFilter, timeFilter, timeOption, cb) {
    console.log("HELLOOO");
    var dict = {};
    if (locFilter != 'None') {
        Loc.findLocation(locFilter, function(err, location) {
            if (err) {
                cb({ msg: err });
            } else {
                dict['location'] = location;
            };
        });
    };
    if (timeOption != 'none') {
        dict['startTime'] = {$lt: timeFilter};
        dict['endTime'] = {$gt: timeFilter};
    };    
    console.log('THE PARAMS ' + locFilter + ' ' + timeFilter + ' ' + timeOption);
    console.log('THE DICT');
    console.log(dict);
    this.find(dict, function(err, filteredEvents) {
        if (err) {
            cb({ msg: err });
        } else {
            cb(err, filteredEvents);
        };
    });
};

/**
 * Finds an from then events database with a specified id,
 *      then updates that event.
 * @param {String} eventID The specified event id
 * @param {Object} content The new content to update the event.
 *      content is in the format - {
 *          name: {String}
 *          startTime: {Date},
 *          endTime: {Date},
 *          room: {String},
 *          description: {String},
 *          location: {Location}, 
 *          locationDescription: {String},
 *          host: {String},
 *          creator: {User}
 *      }
 * @param {Function} cb The callback function to execute, of the
 *      format cb(err, updatedEvent), where updatedEvent is the
 *          event that was just updated.
 */
eventSchema.statics.findAndUpdateEvent = function(eventID, content, cb) {
    this.findById(eventID, function(err, foundEvent) {
        if (err) {
            cb({ msg: err });
        } else {
            foundEvent.name = content.name;
            foundEvent.description = content.description;
            foundEvent.startTime = content.startTime;
            foundEvent.endTime = content.endTime;
            foundEvent.room = content.room;
            // this.location = content.location; // TODO somehow add back in
            foundEvent.locationDescription = content.locationDescription;
            foundEvent.host = content.host;
            foundEvent.save(function(err, updatedEvent) {
                if(err) {
                    cb({ msg: err });
                } else {
                    cb(err, updatedEvent);
                };
            });

        };
    });

};

module.exports = mongoose.model('Event', eventSchema)
