var mongoose = require("mongoose");

var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * The schema for a location. A location requires a locationName, coordinates.
 */
 var location = mongoose.Schema({
 	locationName: { type: String, required: true, unique: true },
 	coordinateX: { type: int, required: true },
 	coordinateY: { type: int, required: true },
 	isBuilding: { type: boolean },
 	roomNumber: {type: int }
 });

module.exports = mongoose.model("Location", location);
