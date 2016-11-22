var mongoose = require("mongoose");

var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * The schema for a location. A location requires a locationName and coordinates.
 */
 var location = mongoose.Schema({
 	name: { type: String, required: true, unique: true },
 	coordinateX: { type: int, required: true },
 	coordinateY: { type: int, required: true },
 	// isBuilding: { type: boolean },
 	// roomNumber: {type: int }
 });

 /** 
  * Finds a location given the locationName. Callback on the location
  * matching the locationName, or null if an error occurred.
  */
 location.statics.findLocation = function(locationName, callback) {
 	this.where({'locationName': locationName}).findOne(function (err, foundLocation) {
 		if (err) {
 			callback(null);
 		} else {
 			callback(foundLocation);
 		}
 	});
 }

module.exports = mongoose.model("Location", location);
