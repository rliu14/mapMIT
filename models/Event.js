/* Lead author: Dora */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

/* Schema to represent the Event model */
var eventSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: null },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    roomNumber: { type: int, default: null },
    location: { type: ObjectId, ref: 'Location'},
    locationDescription: { type: String, default: null },
    host: { type: String, required: true }
});

// TODO: methods to update other fields

eventSchema.statics.deleteEvent = function(eventID, cb) {
    this.findByIdAndRemove(eventID, function(err, deletedEvent) {
        if (err) {
            cb(err, null);
        } else if (deletedEvent != null) {
            // event is properly deleted
            cb(err, true);
        } else {
            cb(err, false);
        };
    });
};

eventSchema.statics.findEventbyID = function(eventID, cb) {
    this.findById(eventID, function(err, foundEvent) {
        if (err) {
            cb({ msg: err });
        } else if (foundEvent != null) {
            cb(err, foundEvent);
        } else {
            cb({ msg: 'No such event.' });
        };
    });
};

eventSchema.statics.findEventByLocation = function(loc, cb) {
    this.find( { location: loc}, function(err, events) {
        if (err) {
            cb(err, null);
        } else if (events.length > 0) {
            // found events with specified location
            cb(err, events);
        } else {
            cb(err, null);
        };
    });
};

eventSchema.statics.findEventsByTime = function(time, cb) {
    this.find( { startTime: {$lt: time}, endTime: {$gt: time} }, function(err, events) {
        if (err) {
            cb(err, null);
        } else if (events.length > 0) {
            // found events happening at this time
            cb(err, events);
        } else {
            cb(err, null);
        };
    });
};

eventSchema.statics.updateEventName = function(updatedName) {
    this.name = updatedName;
};

module.exports = mongoose.model('Event', eventSchema)
