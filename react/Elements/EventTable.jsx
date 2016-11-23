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
            <BootstrapTable data={ this.props.events }>
                <TableHeaderColumn dataField='name' isKey>Event Name</TableHeaderColumn>
                <TableHeaderColumn dataField='host'>Host</TableHeaderColumn>
                <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
                <TableHeaderColumn dataField='startTime'>Start Time</TableHeaderColumn>
                <TableHeaderColumn dataField='endTime'>End Time</TableHeaderColumn>
                <TableHeaderColumn dataField='location' dataFormat={showLocationName}>Location</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

export default EventTable;