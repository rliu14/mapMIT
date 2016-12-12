/* Lead author: Elysa */

import React, { Component } from 'react';
import { render } from 'react-dom';
import timeUtils from '../../utils/timeUtils';

/**
* This component will display all details of events.
*/
class EventTable extends Component {
    constructor(props){ 
        super(props);
        this.getTimeString = timeUtils.getTimeString.bind(this);
    }

    render () {
        return (
            <div className="container-fluid event-card-container">
                <div className="row event-card-row">
                    {this.props.events.map(function(event, index) {
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
                                                <span>
                                                    <span>, </span><span className="italic">Room {event.room}</span>
                                                </span>
                                            }
                                        </div>
                                        {event.locationDescription.length > 0 &&
                                            <div>
                                                <span className="italic">Location description:</span> {event.locationDescription}
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