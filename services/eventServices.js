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
            uri : BASE_URL + `/update/${eventID}`,
            method : 'PUT',
            body : {
                content : content
            },
            json : true
        });
    },

    deleteEvent : (eventID) => {
        console.log('delete event service');
        return request({
            uri : BASE_URL + `/${eventID}`,
            method : 'DELETE',
            json : true
        });
    },

    getEvent : (eventID) => {
        return request({
            uri : BASE_URL + `/${eventID}`,
            method : 'GET',
            json : true
        });
    },

    getEventsByCreator : (creator) => {
        console.log("get by creator service");
        return request({
            uri : BASE_URL + `/creator/${creator}`,
            method: 'GET',
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
        return request({
            uri : BASE_URL + `/time/${time}`,
            method: 'GET',
            json : true
        });
    },

    getFilteredEvents : (locFilter, timeFilter, timeOption) => {
        console.log('get filtered events service');
        // console.log(content);
        return request({
            uri : BASE_URL + `/filter/${locFilter}/${timeFilter}/${timeOption}`,
            method : 'GET',
            // body : {
            //     content : content
            // },
            json : true
        });
    },
};

