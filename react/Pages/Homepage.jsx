import React, { Component } from 'react';
import MapMIT from '../Elements/Map.jsx';
import Filtering from '../Elements/Filtering.jsx';

import { withRouter } from 'react-router';

class Homepage extends Component {
	constructor(props) {
		super(props);
		this.defaultProps = {
		}
	}
  
	render() {
      	return ( 
            <div id="homepage-container">
                <div id="homepage-left">
                    <Filtering />
                </div>
                <div id="homepage-right">
                    <MapMIT />
                </div>
            </div>
      	)
	}
}

export default withRouter(Homepage);