/* Lead author: Dora */

var request = require('request-promise-native');
var constants = require('../utils/constants');
const BASE_URL_EVENTS = constants.BASE_URL + '/events';

export default {
    createEvent : (content) => {
        return request({
            uri : BASE_URL_EVENTS,
            method : 'POST',
            body : {
                content: content
            },
            json : true
        });
    },

    updateEvent : (eventID, content) => {
        return request({
            uri : BASE_URL_EVENTS + `/${eventID}`,
            method : 'PUT',
            body : {
                content : content
            },
            json : true
        });
    },

    deleteEvent : (eventID, currentUser) => {
        return request({
            uri : BASE_URL_EVENTS + `/${eventID}`,
            method : 'DELETE',
            body : {
                currentUser : currentUser
            },
            json : true
        });
    },

    getEvent : (eventID) => {
        return request({
            uri : BASE_URL_EVENTS + `/?eventID=${eventID}`,
            method : 'GET',
            json : true
        });
    },

    getEventsByCreator : (creator) => {
        return request({
            uri : BASE_URL_EVENTS + `?creator=${creator}`,
            method: 'GET',
            json : true
        });
    },

    getEventsByLocation : (loc) => {
        return request({
            uri : BASE_URL_EVENTS + `?loc=${loc}`,
            method: 'GET',
            json : true
        });
    },

    getEventsByTime : (time) => {
        return request({
            uri : BASE_URL_EVENTS + `?time=${time}`,
            method: 'GET',
            json : true
        });
    },

    getFilteredEvents : (content) => {
        return request({
            uri : BASE_URL_EVENTS + `/filter`,
            method : 'PUT',
            body : {
                content : content
            },
            json : true
        });
    },
};

