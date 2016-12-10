/* Lead author: Dora */

const BASE_URL = 'http://localhost:3000/events';

var request = require('request-promise-native');

export default {
    createEvent : (content) => {
        return request({
            uri : BASE_URL,
            method : 'POST',
            body : {
                content: content
            },
            json : true
        });
    },

    updateEvent : (eventID, content) => {
        return request({
            uri : BASE_URL + `/${eventID}`,
            method : 'PUT',
            body : {
                content : content
            },
            json : true
        });
    },

    deleteEvent : (eventID, currentUser) => {
        return request({
            uri : BASE_URL + `/${eventID}`,
            method : 'DELETE',
            body : {
                currentUser : currentUser
            },
            json : true
        });
    },

    getEvent : (eventID) => {
        return request({
            uri : BASE_URL + `/?eventID=${eventID}`,
            method : 'GET',
            json : true
        });
    },

    getEventsByCreator : (creator) => {
        return request({
            uri : BASE_URL + `?creator=${creator}`,
            method: 'GET',
            json : true
        });
    },

    getEventsByLocation : (loc) => {
        return request({
            uri : BASE_URL + `?loc=${loc}`,
            method: 'GET',
            json : true
        });
    },

    getEventsByTime : (time) => {
        return request({
            uri : BASE_URL + `?time=${time}`,
            method: 'GET',
            json : true
        });
    },

    getFilteredEvents : (content) => {
        return request({
            uri : BASE_URL + `/filter`,
            method : 'PUT',
            body : {
                content : content
            },
            json : true
        });
    },
};

