/* Lead author: Dora */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require("./User.js");

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

// eventSchema.statics.createEvent = function(content, cb) {
//     // TODO do validation on lots of things
//     this.create(content, cb);
// }

eventSchema.statics.createEvent = function(content, cb) {
    var username = content.creator;
    var Event = this;
    User.findUser(username, function(err, creator) {
        if (err) {
            cb({ msg: err });
        } else {
            content.creator = creator;
            Event.create(content, cb);
        }
    });
    
}

// TODO: methods to update other fields

eventSchema.statics.deleteEvent = function(eventID, cb) {
    this.findByIdAndRemove(eventID, function(err, deletedEvent) {
        if (err) {
            cb({ msg: err });
        } else if (deletedEvent != null) {
            // event is properly deleted
            cb(err, true);
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
    // this.find( { creator: eventCreator }, function(err, events) {
    //     if (err) {
    //         cb({ msg: err });
    //     } else {
    //         cb(err, events);
    //     };
    // });
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
    this.find( { startTime: {$lt: time}, endTime: {$gt: time} }, function(err, events) {
        if (err) {
            cb({ msg: err });
        } else {
            cb(err, events);
        }
    });
};

eventSchema.statics.updateEvent = function(content, cb) {
    this.name = content.name;
    this.description = content.description;
    this.startTime = content.startTime;
    this.endTime = content.endTime;
    this.room = content.room;
    this.location = content.location;
    this.locationDescription = this.locationDescription;
    this.host = this.host;
    this.save(function(err, updatedEvent) {
        if(err) {
            cb({ msg: err });
        } else {
            cb(err, updatedEvent);
        };
    });
};

module.exports = mongoose.model('Event', eventSchema)
