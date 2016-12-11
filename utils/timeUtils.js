import moment from 'moment';

// Utils for functionality related to dates and times
var timeUtils = (function() {

    var _utils = {};

    /**
     * Given a start Date and end Date, format a string of the
     * timespan.
     * 
     * @param {Date} start The Date representing the start
     *      datetime of the timespan.
     * @param {Date} end The Date representing the end
     *      datetime of the timespan.
     * @returns {String} The string of the timespan from start
     *      to end.
     */
    _utils.getTimeString = function(start, end) {
        var startMoment = moment(start);
        var startMomentString = startMoment.format("ddd, MMM Do \u2022 h:mm a");
        var endMoment = moment(end);
        var endMomentString = endMoment.format("h:mm a");
        if (startMoment.get('date') !== endMoment.get('date')) {
            endMomentString = endMoment.format("ddd, MMM Do \u2022 h:mm a");
        }
        return startMomentString + " - " + endMomentString;
    }

    Object.freeze(_utils);
    return _utils;

})();

module.exports = timeUtils;