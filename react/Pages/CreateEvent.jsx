import React, { Component } from 'react';
import { withRouter } from 'react-router';

class CreateEvent extends Component {
	constructor(props) {
		super(props);
		this.defaultProps = {
		}
	}

	render() {
	  	return ( 
	  		<div>Create Event!</div>
	  	)
	}
}

export default withRouter(CreateEvent);