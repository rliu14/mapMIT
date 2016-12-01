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
    creator: { type: ObjectId, ref: 'User', default: null }
});

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

// TODO: methods to update other fields

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

eventSchema.statics.findEventByID = function(eventID, cb) {
    this.findById(eventID, function(err, foundEvent) {
        if (err) {
            cb({ msg: err });
        } else {
            cb(err, foundEvent);
        };
    });
};

eventSchema.statics.findEventsByLocation = function(loc, cb) {
    this.find( { location: loc}, function(err, events) {
        if (err) {
            cb( { msg: err });
        } else {
            // found events with specified location
            cb(err, events);
        }
    });
};

eventSchema.statics.findEventsByTime = function(time, cb) {
    this.find( { startTime: {$lt: time}, endTime: {$gt: time} }).populate('location').exec(function(err, events) {
        if (err) {
            cb({ msg: err });
        } else {
            cb(err, events);
        }
    });
};

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
