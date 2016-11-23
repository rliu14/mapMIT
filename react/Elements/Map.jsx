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
        this.sortByLocation = this.sortByLocation.bind(this);
        this.getTextForEvents = this.getTextForEvents.bind(this);
    }
    
    componentWillMount() {
    }

    componentDidUpdate() {

    }

    sortByLocation() {
        var mapByLocation = {}
        var allEvents = this.props.events;
        console.log('allEvents');
        console.log(allEvents);
        var eventsByLocation = allEvents.reduce(function(current, next) {
            if (next.location != undefined && next.location != null) { // TODO probs change after MVP
                if (next.location._id in current) {
                    current[next.location._id].push(next);
                } else {
                    current[next.location._id] = [next]
                }
            }
            return current;
        }, {});
        console.log(eventsByLocation);
        return eventsByLocation;
    }

    getTextForEvents(eventList) {
        var eventDescriptions = eventList.map(function(current) {
            return current.description;
        });
        console.log(eventDescriptions);
        return (
            <div className="text">
                <span>{eventList[0].location.name}</span>
                {eventDescriptions.map(function(event, index, array){
                    return (
                        <li key={index.toString()}>{event}</li>
                    )
                })}
            </div>
        )
    }
    
    render () {
        var x = this;
        var events = this.sortByLocation();
        const position = [this.state.lat, this.state.lng];
        return (
            <Map center={position} zoom={this.state.zoom} id="map">
                {Object.keys(events).map(function(locationId, index, array){
                    var popup = events[locationId][0].location;
                    var text = x.getTextForEvents(events[locationId]);
                    return (
                        <div key={index.toString()}>
                            <TileLayer
                                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                            <Marker position={[popup.latitude, popup.longitude]}>
                                <Popup>
                                    {text}
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