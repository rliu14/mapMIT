import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class MapMIT extends Component {
    constructor(props){ 
        super(props);
        this.state = {
            lat: 42.3589,
            lng: -71.0935,
            zoom: 15,
            popups: [{location: "Maseeh", text: "EVENT", lat: 42.3577, lng: -71.0934}, 

                    {location: "Baker", text: "blahblah", lat: 42.356791, lng: -71.095381}]
        };
    }
    
    componentDidMount() {
        this.setState({popupText: "HELLO"}) ;
    }

    componentDidUpdate() {

    }
    
    render () {
        const position = [this.state.lat, this.state.lng]
        return (
            <Map center={position} zoom={this.state.zoom} id="map">
                {this.state.popups.map(function(popup){
                    return (
                        <div>
                            <TileLayer
                                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                            />
                            <Marker position={[popup.lat, popup.lng]}>
                                <Popup>
                                    <span>{popup.location}<br /> {popup.text} </span>
                                </Popup>
                            </Marker>
                        </div>
                    )
                })}  
            </Map>
        )
    }
}

    

export default MapMIT;