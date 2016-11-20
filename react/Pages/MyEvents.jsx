import React, { Component } from 'react';
import { withRouter } from 'react-router';

class MyEvents extends Component {
	constructor(props) {
		super(props);
		this.defaultProps = {
		}
	}

	render() {
	  	return ( 
	  		<div>My Events!</div>
	  	)
	}
}

export default withRouter(MyEvents);