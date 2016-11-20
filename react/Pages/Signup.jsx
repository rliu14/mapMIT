import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.defaultProps = {
		}
	}

	render() {
	  	return ( 
	  		<div>Signup!</div>
	  	)
	}
}

export default withRouter(Signup);