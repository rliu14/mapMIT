import React, { Component } from 'react';
import { render } from 'react-dom';
import { MenuItem, DropdownButton } from 'react-bootstrap';
import eventServices from '../../services/eventServices';
import { DateField, TransitionView, Calendar } from 'react-date-picker'

class Filtering extends Component {
    constructor(props){ 
        super(props);
        this.state = {
            isPublic: false,
            checkedGroupIds: [],
            timeOption: '',
            time: Date.now(),
            location: 'None'
        };

        this.onPublicChange = this.onPublicChange.bind(this);
        this.onGroupEventChange = this.onGroupEventChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.onApplyFilter = this.onApplyFilter.bind(this);
        this.getLocations = this.getLocations.bind(this);

    }

    getLocations() {
        return ['None', 'Building 1', 'Building 2', 'Building 3', 'Building 4', 'Building 5',
                        'Building 6', 'Building 7', 'Building 10', 'Building 13', 'Building 14', 'Building 18',
                        'Building 34', 'Building 36', 'Building 38', 'Building 56', 'Building 66', 'Green Building',
                        'Stata Center', 'Maseeh Hall', 'McCormick Hall', 'Baker House', 'Burton Connor', 'Macgregor House',
                        'New House', 'Next House', 'Simmons House', 'Tennis Courts', 'Z Center', 'Kresge Auditorium',
                        'Kresge Barbecue Pits', 'Stratton Student Center'];
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
        console.log("HERE", eventKey);
        this.setState({
            location: eventKey.value
        });
    }

    updateTime(dateString, { dateMoment, timestamp }) {
        this.setState({
            time: dateMoment.toDate()
        });
    }

    onApplyFilter() {
        // var locationEvents, timeEvents;
        console.log("apply filter");
        // APPLY LOCATION FILTER
        eventServices.getEventsByLocation(this.state.location)
            .then((resp) => {
                this.setState({
                    location: ''
                });
                var locationEvents = resp.content.foundEvents;
                console.log('location events');
                console.log(locationEvents);
                
                // APPLY TIME FILTER
                if (this.state.timeOption != 'none') {
                    console.log('state time');
                    console.log(this.state.time);
                    eventServices.getEventsByTime(this.state.time)
                        .then((resp) => {
                            this.setState({
                                time: Date.now()
                            }) ;
                            var timeEvents = resp.content.events;
                            console.log('filtered time events');
                            console.log(timeEvents);
                            var filteredEvents = [];
                            locationEvents.forEach(function(loc) {
                                timeEvents.forEach(function(time) {
                                    if (loc._id == time._id) {
                                        filteredEvents.push(loc);
                                    };
                                });
                            });
                            console.log('filtered events');
                            console.log(filteredEvents);
                            this.props.onUpdate(filteredEvents);
                        });
                };
            });

        

        // console.log('time option');
        // console.log(this.state.timeOption);
        // console.log(this.state.time);
        // console.log('location and time events');
        // console.log(locationEvents);
        // console.log(timeEvents);
        // var filteredEvents = locationEvents.filter(function(e) {
        //     return timeEvents.indexOf(e) != -1;
        // });
        // this.props.onUpdate(filteredEvents);
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
                            <input type="radio" value='none' checked={this.state.timeOption === 'none'} onChange={this.handleOptionChange} />
                                None
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value='now' checked={this.state.timeOption === 'now'} onChange={this.handleOptionChange} />
                                Happening Now
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="at" checked={this.state.timeOption === 'at'} onChange={this.handleOptionChange} />
                                Happening At
                                <DateField forceValidDate
                                    defaultValue={"2016-05-30 15:23:34"}
                                    dateFormat="YYYY-MM-DD HH:mm:ss"
                                    onChange={this.updateTime}>
                                    <TransitionView>
                                        <Calendar style={{padding: 10}}/>
                                    </TransitionView>
                                </DateField>
                        </label>
                    </div>

                <h3>Location</h3>
                    <form>
                        <label>
                            <select value={this.state.location} onChange={this.updateLocation}>
                                {this.getLocations().map(function(location){
                                    return (<option value={location}>{location}</option>)
                                })}
                            </select>
                        </label>
                    </form>
                    {/* <DropdownButton title='Select' onSelect={this.updateLocation} toggleLabel= {this.state.location}>
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
                    </DropdownButton> */}



        <button type='button' className='btn btn-default' onClick={this.onApplyFilter}>Apply</button>
      </div>
    )
  }
}

export default Filtering;