/* Lead author: Elysa */

// const BASE_URL = 'http://localhost:3000/groups';
// const BASE_URL = 'https://mapmit.herokuapp.com/groups'
const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://mapmit.herokuapp.com/groups' : 'http://localhost:3000/groups';

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

    addMemberToGroup : (groupId, username) => {
        return request({
            uri : BASE_URL + `/add/${groupId}`,
            method : 'PUT',
            body : {
                username : username
            },
            json : true
        });
    },

    removeMemberFromGroup : (groupId, username) => {
        return request({
            uri : BASE_URL + `/remove/${groupId}`,
            method : 'PUT',
            body : {
                username : username
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

    getGroupsWithMemberNotCreator : (member) => {
        return request({
            uri : BASE_URL + `/memberonly/${member}`,
            method : 'GET',
            json : true
        });
    },

    getGroupsWithMember : (member) => {
        return request({
            uri : BASE_URL + `/member/${member}`,
            method : 'GET',
            json : true
        });
    }

}