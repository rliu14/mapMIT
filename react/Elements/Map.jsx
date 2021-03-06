/* Lead author: Rena */

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import timeUtils from '../../utils/timeUtils';

/**
* This component displays a map of MIT's campus with popups that correspond to events.
*/
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
        this.getTimeString = timeUtils.getTimeString.bind(this);
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
                        <div key={index.toString()}>
                            <span key={index}>
                                <span className="bold">{event.name}</span> <span className="italic">({event.host})</span>
                            </span>
                            {event.description.length > 0 &&
                                <div>
                                    <span className="italic">Description:</span> {event.description}
                                </div>
                            }
                            <div>
                                <span className="italic">Time:</span> {this.getTimeString(event.startTime, event.endTime)}
                            </div>
                            <div>
                                {event.room.length > 0 &&
                                <span>
                                    <span className="italic">Location:</span> {event.location.name}
                                    <span>
                                        <span>, </span><span className="italic">Room: {event.room}</span>
                                    </span>
                                </span>
                                }

                            </div>
                            {event.locationDescription.length > 0 &&
                                <div>
                                    <span className="italic">Location description:</span> {event.locationDescription}
                                </div>
                            }
                        </div>
                    )
                }, this)}
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
                    (<TileLayer attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
                        url='https://api.mapbox.com/styles/v1/rliu14/ciwl6w4d8001g2pplw4bmn9e3/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmxpdTE0IiwiYSI6ImNpd2w1bGhvZDAwNWEyb3A3MGx0eGllaTUifQ.DxdN9doqqY3DNqxd5Rr14Q'
                        minZoom={14}/>
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