/* Lead author: Casey */

import React, { Component } from 'react';
import { IndexLink, Link, withRouter } from 'react-router';

class VerifyAccount extends Component {
	constructor(props) {
		super(props);
		// this.defaultProps = {
		// }
		this.state = {
		};
		this.verifyAccount = this.verifyAccount.bind(this);
	}

	componentWillMount() {
		this.verifyAccount();
	}
	
	verifyAccount() {
		console.log("Verifying account...");
		console.log(this.props.params.URL);
		this.props.verifyAccount(this.props.params.URL); 
	}

	render() {
	  	return ( 
	  		<div className = 'container'>               
                <p>Congrats! You've verified your account. Login <IndexLink to = '/login' className = 'login-link'>here</IndexLink> to enter MapMIT!</p>
            </div>
	  	)
	}
}

export default withRouter(VerifyAccount);