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

    deleteEvent : (eventID) => {
        return request({
            uri : BASE_URL + `/${eventID}`,
            method : 'DELETE'
        });
    },

    getEvent : (eventID) => {
        return request({
            uri : BASE_URL + `/${eventID}`,
            method : 'GET',
            json : true
        });
    },

    getEventsByLocation : (loc) => {
        return request({
            uri : BASE_URL + `/location/${loc}`,
            method : 'GET',
            json : true
        });
    },

    getEventsByTime : (time) => {
        console.log('get events by time service');
        return request({
            uri : BASE_URL + `/time/${time}`,
            method: 'GET',
            json : true
        });
    },
};

