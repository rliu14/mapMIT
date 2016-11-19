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
    /*constructor(props){
        super(props);
        this.state = {
            // TODO 
        };
        // TODO props
    }

    componentWillMount(){
        // TODO 
    }

    render(){
        return (
            <div id='reactRoot'>
                <MapMIT/>
            </div>
        );
    }*/
    constructor(props){ 
        super(props);
        this.state = {
          lat: 51.505,
          lng: -0.09,
          zoom: 13,
        };
    }
  
    render () {
        const position = [this.state.lat, this.state.lng]
        return (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <Marker position={position}>
                    <Popup>
                        <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                    </Popup>
                </Marker>
            </Map>
        )
    }
}

export default withRouter(App);
