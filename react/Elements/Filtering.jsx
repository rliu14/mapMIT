import React, { Component } from 'react';
import { render } from 'react-dom';
import { MenuItem, DropdownButton } from 'react-bootstrap';
import eventServices from '../../services/eventServices';
import Homepage from '../Pages/Homepage.jsx';

class Filtering extends Component {
    constructor(props){ 
        super(props);
        this.state = {
            isPublic: false,
            checkedGroupIds: [],
            timeOption: 'none',
            location: ''
        };
        this.onPublicChange = this.onPublicChange.bind(this);
        this.onGroupEventChange = this.onGroupEventChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.onApplyFilter = this.onApplyFilter.bind(this);
    }

    onPublicChange() {
        this.setState({isPublic: !this.state.isPublic});
    }

    onGroupEventChange(event) {
        var groupId = event.target.value;
    }

    handleOptionChange(event) {
        this.setState({
            timeOption: event.target.value
        });
    }

    updateLocation(eventKey) {
        this.setState({
            location: eventKey
        });
    }

    onApplyFilter() {
        console.log("apply filter");
        eventServices.getEventsByLocation(this.state.location)
            .then((resp) => {
                console.log('resp');
                console.log(resp);
                this.setState = {
                    location: ''
                };
                var filteredEvents = resp.content.foundEvents;
                console.log('filtered events');
                console.log(filteredEvents);
                console.log(this.props);
                // console.log(this.props.onUpdate(onFilter));
                this.props.onUpdate(filteredEvents);
            });
    }
  
  render () {
    return (
        <div id="filter">
            <h1>Filter</h1>
                <h3>Event Type</h3>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" checked={this.state.isPublic} onChange={this.onPublicChange}/>
                                Public
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value='ID OF GROUP' checked={this.state.isPublic} onChange={this.onPublicChange}/>
                                Group-specific
                        </label>
                    </div>

                <h3>Time</h3>
                    <div className="radio">
                        <label>
                            <input type="radio" value="none" checked={this.state.timeOption === 'none'} onChange={this.handleOptionChange} />
                                None
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="now" checked={this.state.timeOption === 'now'} onChange={this.handleOptionChange} />
                                Happening Now
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="at" checked={this.state.timeOption === 'at'} onChange={this.handleOptionChange} />
                                Happening At
                        </label>
                    </div>

                <h3>Location</h3>
                    <DropdownButton title='Select' onSelect={this.updateLocation}>
                        <MenuItem eventKey="Building 1">Building 1</MenuItem>
                        <MenuItem eventKey="Building 2">Building 2</MenuItem>
                        <MenuItem eventKey="Building 3">Building 3</MenuItem>
                        <MenuItem eventKey="Building 4">Building 4</MenuItem>
                        <MenuItem eventKey="Building 5">Building 5</MenuItem>
                        <MenuItem eventKey="Building 6">Building 6</MenuItem>
                        <MenuItem eventKey="Building 7">Building 7</MenuItem>
                        <MenuItem eventKey="Building 10">Building 10</MenuItem>
                        <MenuItem eventKey="Building 13">Building 13</MenuItem>
                        <MenuItem eventKey="Building 14">Building 14</MenuItem>
                        <MenuItem eventKey="Building 18">Building 18</MenuItem>
                        <MenuItem eventKey="Building 34">Building 34</MenuItem>
                        <MenuItem eventKey="Building 36">Building 36</MenuItem>
                        <MenuItem eventKey="Building 38">Building 38</MenuItem>
                        <MenuItem eventKey="Building 56">Building 56</MenuItem>
                        <MenuItem eventKey="Building 66">Building 66</MenuItem>
                        <MenuItem eventKey="Green Building">Green Building</MenuItem>
                        <MenuItem eventKey="Stata Center">Stata Center</MenuItem>
                        <MenuItem eventKey="Maseeh Hall">Maseeh Hall</MenuItem>
                        <MenuItem eventKey="McCormick Hall">McCormick Hall</MenuItem>
                        <MenuItem eventKey="Baker House">Baker House</MenuItem>
                        <MenuItem eventKey="Burton Connor">Burton Connor</MenuItem>
                        <MenuItem eventKey="Macgregor House">Macgregor House</MenuItem>
                        <MenuItem eventKey="New House">New House</MenuItem>
                        <MenuItem eventKey="Next House">Next House</MenuItem>
                        <MenuItem eventKey="Simmons House">Simmons House</MenuItem>
                        <MenuItem eventKey="Tennis Courts">Tennis Courts</MenuItem>
                        <MenuItem eventKey="Z Center">Z Center</MenuItem>
                        <MenuItem eventKey="Kresge Auditorium">Kresge Auditorium</MenuItem>
                        <MenuItem eventKey="Kresge Barbecue Pits">Kresge Barbecue Pits</MenuItem>
                        <MenuItem eventKey="Stratton Student Center">Stratton Student Center</MenuItem>
                    </DropdownButton>

        <button type='button' className='btn btn-default' onClick={this.onApplyFilter}>Apply</button>
      </div>
    )
  }
}

export default Filtering;