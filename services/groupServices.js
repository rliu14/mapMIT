/* Lead author: Elysa */

var request = require('request-promise-native');
var constants = require('../utils/constants');
const BASE_URL_GROUPS = constants.BASE_URL + '/groups'; 

export default {
    createGroup : (content) => {
        console.log("this is the content", content);
        return request({
            uri : BASE_URL_GROUPS,
            method : 'POST',
            body : {
                content: content
            },
            json : true
        });
    },

    addMemberToGroup : (groupId, username) => {
        return request({
            uri : BASE_URL_GROUPS + `/${groupId}`,
            method : 'PUT',
            body : {
                username : username
            },
            json : true
        });
    },

    removeMemberFromGroup : (groupId, username) => {
        return request({
            uri : BASE_URL_GROUPS + `/${groupId}`,
            method : 'DELETE',
            body : {
                username : username
            },
            json : true
        });
    },

    getGroupsByCreator : (creator) => {
        return request({
            uri : BASE_URL_GROUPS + `?creator=${creator}`,
            method: 'GET',
            json : true
        });
    },

    getGroupsWithMemberNotCreator : (memberOnly) => {
        return request({
            uri : BASE_URL_GROUPS + `?memberOnly=${memberOnly}`,
            method : 'GET',
            json : true
        });
    },

    getGroupsWithMember : (member) => {
        return request({
            uri : BASE_URL_GROUPS + `?member=${member}`,
            method : 'GET',
            json : true
        });
    }

}