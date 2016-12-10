/* Lead author: Elysa */

import React, { Component } from 'react';
import { render } from 'react-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class EventTable extends Component {
    constructor(props){ 
        super(props);
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
                                        <span className="bold">{event.name}</span> ({event.host})
                                    </div>
                                    <div className="panel-body">
                                        {event.startTime.toLocaleString()} - {event.endTime} <br/>
                                        {event.description} <br/>
                                        Location: {event.location}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default EventTable;