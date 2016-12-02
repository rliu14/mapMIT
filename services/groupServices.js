const BASE_URL = 'http://localhost:3000/groups';

var request = require('request-promise-native');

export default {
    createGroup : (content) => {
        return request({
            uri : BASE_URL,
            method : 'POST',
            body : {
                content: content
            },
            json : true
        });
    },

    addMemberToGroup : (groupId, content) => {
        return request({
            uri : BASE_URL + `/add/${groupId}`,
            method : 'PUT',
            body : {
                content : content
            },
            json : true
        });
    },

    removeMemberFromGroup : (groupId, content) => {
        return request({
            uri : BASE_URL + `/remove/${groupId}`,
            method : 'PUT',
            body : {
                content : content
            },
            json : true
        });
    },

    getGroupsByCreator : (creator) => {
        return request({
            uri : BASE_URL + `/creator/${creator}`,
            method: 'GET',
            json : true
        });
    },

    getGroupsWithMember : (member) => {
        return request({
            uri : BASE_URL + `/member/${member}`,
            method : 'GET',
            json : true
        });
    },

}