/* Lead author: Rena */

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import moment from 'moment';

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
        this.getTimeString = this.getTimeString.bind(this);
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

    getTimeString(start, end) {
        var startMoment = moment(start);
        // var startMomentString = startMoment.format("ddd, MMM Do ") + '\u2022' + startMoment.format(" h:mm a");
        var startMomentString = startMoment.format("ddd, MMM Do \u2022 h:mm a");
        var endMoment = moment(end);
        var endMomentString = endMoment.format("h:mm a");
        if (startMoment.get('date') !== endMoment.get('date')) {
            endMomentString = endMoment.format("ddd, MMM Do \u2022 h:mm a");
        }
        return startMomentString + " - " + endMomentString;
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
                                    <span>, Room {event.room}</span>
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