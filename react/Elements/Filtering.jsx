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
            timeOption: 'none',
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
        this.setState({
            timeOption: event.target.value
        });
    }

    updateLocation(location) {
        this.setState({
            location: location
        });
    }

    updateTime(dateString, { dateMoment, timestamp }) {
        this.setState({
            time: dateMoment.toDate()
        });
    }

    onApplyFilter() {
        console.log('hello params ' + this.state.location + ' ' + this.state.time + ' ' + this.state.timeOption);
        var content = {
            locFilter: this.state.location,
            timeFilter: this.state.time,
            timeOption: this.state.timeOption
        };
        eventServices.getFilteredEvents(content)
            .then((resp) => {
                console.log('THE RESP FILTERED EVENTS');
                console.log(resp.content.filteredEvents);
                this.setState({
                    location: 'None',
                    time: Date.now()
                });
                this.props.onUpdate(resp.content.filteredEvents);
            });
        // var locationEvents, timeEvents;
        // console.log("apply filter");
        // // APPLY LOCATION FILTER
        // eventServices.getEventsByLocation(this.state.location)
        //     .then((resp) => {
        //         this.setState({
        //             location: ''
        //         });
        //         var locationEvents = resp.content.foundEvents;
        //         console.log('location events');
        //         console.log(locationEvents);
                
        //         // APPLY TIME FILTER
        //         if (this.state.timeOption != 'none') {
        //             console.log('state time');
        //             console.log(this.state.time);
        //             eventServices.getEventsByTime(this.state.time)
        //                 .then((resp) => {
        //                     this.setState({
        //                         time: Date.now()
        //                     }) ;
        //                     var timeEvents = resp.content.events;
        //                     console.log('filtered time events');
        //                     console.log(timeEvents);
        //                     var filteredEvents = [];
        //                     locationEvents.forEach(function(loc) {
        //                         timeEvents.forEach(function(time) {
        //                             if (loc._id == time._id) {
        //                                 filteredEvents.push(loc);
        //                             };
        //                         });
        //                     });
        //                     console.log('filtered events');
        //                     console.log(filteredEvents);
        //                     this.props.onUpdate(filteredEvents);
        //                 });
        //         };
        //     });
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
                                    dateFormat="YYYY-MM-DD hh:mm:ss"
                                    onChange={this.updateTime}>
                                    <TransitionView>
                                        <Calendar style={{padding: 10}}/>
                                    </TransitionView>
                                </DateField>
                        </label>
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