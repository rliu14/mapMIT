import React, { Component } from 'react';
import { render } from 'react-dom';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class EventTable extends Component {
    constructor(props){ 
        super(props);
    }
    // TODO get actual events
  
    render () {
        return (
            <BootstrapTable data={ this.props.events }>
                <TableHeaderColumn dataField='name' isKey>Event Name</TableHeaderColumn>
                <TableHeaderColumn dataField='host'>Host</TableHeaderColumn>
                <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
                <TableHeaderColumn dataField='date'>Date</TableHeaderColumn>
                <TableHeaderColumn dataField='time'>Time</TableHeaderColumn>
                <TableHeaderColumn dataField='location'>Location</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

export default EventTable;