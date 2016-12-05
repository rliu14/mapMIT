import React, { Component } from 'react';
import { render } from 'react-dom';
import eventServices from '../../services/eventServices';
import LocationPicker from './LocationPicker.jsx';
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
    }

    onPublicChange() {
        this.setState({isPublic: !this.state.isPublic});
    }

    onGroupEventChange(event) {
        var groupId = event.target.value;
    }

    handleOptionChange(event) {
        console.log('handle option change')
        this.setState({
            timeOption: event.target.value,
        });
    }

    updateLocation(location) {
        this.setState({
            location: location
        });
    }

    updateTime(dateString, { dateMoment, timestamp }) {
        console.log('update time');
        this.setState({
            time: dateMoment.toDate(),
            timeOption: 'at'
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
                        </label>
                        <DateField forceValidDate
                                defaultValue={this.state.time}
                                dateFormat="MM-DD-YY hh:mm a"
                                onChange={this.updateTime}>
                                <TransitionView>
                                    <Calendar style={{padding: 10}}/>
                                </TransitionView>
                        </DateField>
                    </div>

                <h3>Location</h3>
                <div>
                    <LocationPicker onUpdate={this.updateLocation}/>
                </div>
        <button type='button' className='btn btn-default' onClick={this.onApplyFilter}>Apply</button>
      </div>
    )
  }
}

export default Filtering;