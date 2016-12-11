/* Lead author: Elysa */

import React, { Component } from 'react';
import { render } from 'react-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import moment from 'moment';

class EventTable extends Component {
    constructor(props){ 
        super(props);
        this.getTimeString = this.getTimeString.bind(this);
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

    render () {
        return (
            <div className="container-fluid event-card-container">
                <div className="row">
                    {this.props.events.map(function(event) {
                        return ( 
                            <div key={event._id} className="col-md-6 ">
                                <div className="panel panel-default"> 
                                    <div className="panel-heading">
                                        <span className="bold">{event.name}</span>
                                    </div>
                                    <div className="panel-body">
                                        <div>
                                            <span className="italic">Host:</span> {event.host}
                                        </div>
                                        {event.description.length > 0 &&
                                            <div>
                                                <span className="italic">Description:</span> {event.description}
                                            </div>
                                        }
                                        <div>
                                            <span className="italic">Time:</span> {this.getTimeString(event.startTime, event.endTime)}
                                        </div>
                                        <div>
                                            <span className="italic">Location:</span> {event.location.name}
                                            {event.room.length > 0 &&
                                                <span>, Room {event.room}</span>
                                            }
                                        </div>
                                        {event.locationDescription.length > 0 &&
                                            <div>
                                                <span className="italic">Location description:</span> event.locationDescription}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }, this)}
                </div>
            </div>
        )
    }
}

export default EventTable;