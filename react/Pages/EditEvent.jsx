import React, { Component } from 'react';
import { withRouter } from 'react-router';

class EditEvent extends Component {
	constructor(props) {
		super(props);
		this.defaultProps = {
		}
	}

	render() {
	  	return ( 
	  		<div>Edit Event!</div>
	  	)
	}
}

export default withRouter(EditEvent);