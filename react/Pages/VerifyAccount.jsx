/* Lead author: Casey */

import React, { Component } from 'react';
import { IndexLink, Link, withRouter } from 'react-router';

/**
* This page notifies the user when they have verified their account.
*/
class VerifyAccount extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.verifyAccount = this.verifyAccount.bind(this);
	}

	componentWillMount() {
		this.verifyAccount();
	}
	
	verifyAccount() {
		this.props.verifyAccount(this.props.params.URL); 
	}

	render() {
	  	return ( 
	  		<div className = 'container'>               
                <p>Congrats! You've verified your account. You will now be able to login to mapMIT!</p>
            </div>
	  	)
	}
}

export default withRouter(VerifyAccount);