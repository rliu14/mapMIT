/* Lead author: Casey */

const BASE_URL = 'http://localhost:3000/users';

var request = require('request-promise-native');

export default {
	register : (fullname, email, password) => {
		return request({
			uri : BASE_URL,
			method : 'POST',
			json : true,
			body : {
				fullname : fullname,
				email : email,
				password : password
			}
		});
	},

	verifyAccount : (URL) => {
		return request({
			uri : BASE_URL + '/email-verification' + `/${URL}`,
			method : 'GET',
			json : true
		})
	},

	login : (email, password) => {
		return request({
			uri : BASE_URL + '/login',
			method : 'POST',
			body : {
				email : email,
				password : password
			},
			json : true
		});
	},

	logout : () => {
		return request({
			uri : BASE_URL + '/logout',
			method: 'PUT',
			json : true
		});
	},

	// TODO does this even get used?
	getCurrentUser: () => {
		return request({
			uri : BASE_URL + '/current',
			method : 'GET',
			json : true
		});
	}
}