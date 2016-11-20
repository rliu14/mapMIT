import Services from '../services';
// TODO import navbar???
import { Component } from 'react';
import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

// TODO import any services?

class App extends Component {
    constructor(props){ 
        super(props);
        this.state = {
        };
    }

    render(){
        return (
            <div>
                <div id='reactRoot'>
                    Test
                </div>
                <div id='page-content'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default withRouter(App);
