import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Login extends Component {
	constructor(props) {
		super(props);
		this.defaultProps = {
		}
	}

	render() {
	  	return ( 
	  		<div>Login!</div>
	  	)
	}
}

export default withRouter(Login);