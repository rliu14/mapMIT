/* Lead author: Dora */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var User = require('./User');
console.log(User);

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
    User.findUser(username, function(err, creator) {
        if (err) {
            cb({ msg: err });
        } else {
            content.creator = creator;
            this.create(content, cb);
        }
    });
    // TODO do validation on lots of things
    
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
    this.find( { creator: eventCreator }, function(err, events) {
        if (err) {
            cb({ msg: err });
        } else {
            cb(err, events);
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

eventSchema.statics.updateEventName = function(updatedName) {
    this.name = updatedName;
};

module.exports = mongoose.model('Event', eventSchema)
