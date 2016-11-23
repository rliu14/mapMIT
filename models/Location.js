var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * The schema for a location. A location requires a locationName and coordinates.
 */
 var location = mongoose.Schema({
 	name: { type: String, required: true, unique: true },
 	lat: { type: Number, required: true },
 	lng: { type: Number, required: true },
 });

 /** 
  * Finds a location given the locationName. Callback on the location
  * matching the locationName, or null if an error occurred.
  */
 location.statics.findLocation = function(locationName, callback) {
 	this.findOne({'name': locationName}, function (err, foundLocation) {
 		if (err) {
 			callback({msg: err});
 		} else {
 			callback(err, foundLocation);
 		}
 	});
 }

module.exports = mongoose.model("Location", location);
