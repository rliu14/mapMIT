import React, { Component } from 'react';
import MapMIT from '../Elements/Map.jsx';
import { withRouter } from 'react-router';

class Homepage extends Component {
	constructor(props) {
		super(props);
		this.defaultProps = {
		}
	}
  
	render() {
  	return ( 
      <MapMIT />
  	)
	}
}

export default withRouter(Homepage);