/* Lead author: Rena */

var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * Schema to represent the location model. A location requires a locationName and coordinates.
 */
 var location = mongoose.Schema({
 	name: { type: String, required: true, unique: true },
 	lat: { type: Number, required: true },
 	lng: { type: Number, required: true },
 });

 /** 
  * Finds a location given the locationName. 
  * @param {String} locationName The name of the location.
  * @param {Function} callback The callback function to execute, of the
  *      format cb(err, foundLocation).
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
