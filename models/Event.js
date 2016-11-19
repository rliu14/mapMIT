/* Lead author: Dora */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

/* Schema to represent the Event model */
var EventSchema = mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String }
	startTime: { type: Date, required: true },
	endTime: { type: Date, required: true },
	roomNumber: { type: int, default: null },
	location: { type: ObjectId, ref: 'Location'},
	locationDescription: { type: String },
	host: { type: String, required: true }
});

module.exports = mongoose.model('Event', eventSchema)
