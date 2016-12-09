/* Lead author: Elysa */

import React, { Component } from 'react';
import { withRouter } from 'react-router';

class NotFound extends Component {
	constructor(props) {
		super(props);
		this.defaultProps = {
		}
	}

	render() {
	  	return ( 
	  		<div>Page not found</div>
	  	)
	}
}

export default withRouter(NotFound);