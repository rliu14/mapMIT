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
        return eventsByLocation;
    }

    getTextForEvents(eventList) {
        var eventDescriptions = eventList.map(function(current) {
            return current.name;
        });
        return (
            <div className="text">
                <span>{eventList[0].location.name}</span>
                {eventList.map(function(event, index, array){
                    return (
                        <div>
                            <span className="popup-event-name" key={index}>
                                {event.name} 
                            </span>
                            <span> ({event.host})</span>
                            <br/>
                            <span className="popup-event-body" key={event}>
                                {event.description} <br/>
                            </span>
                        </div>
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
                <div>
                    <TileLayer attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                               url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                    {Object.keys(events).map(function(locationId, index, array){
                        var popup = events[locationId][0].location;
                        var text = x.getTextForEvents(events[locationId]);
                        return (
                            <Marker key={index.toString()} position={[popup.lat, popup.lng]}>
                                <Popup>
                                    {text}
                                </Popup>
                            </Marker>
                        )
                    })} 
                </div>
            </Map>
        )
    }
}

export default MapMIT;