/* Lead author: Elysa */

import React, { Component } from 'react';
import { render } from 'react-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


function showLocationName(cell, row){
    return cell.name;
}

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
                            <div key={event._id} className="col-md-4 ">
                                <div className="panel panel-default"> 
                                    <div className="panel-heading">{event.name}</div>
                                    <div className="panel-body">
                                        Host: {event.host} <br/>
                                        Description: {event.description}
                                        Time: {event.startTime} - {event.endTime}
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