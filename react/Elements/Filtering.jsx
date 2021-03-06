/* Lead author: Dora & Rena */

import React, { Component } from 'react';
import { render } from 'react-dom';
import eventServices from '../../services/eventServices';
import groupServices from '../../services/groupServices';
import LocationPicker from './LocationPicker.jsx';
import DateTimePicker from './DateTimePicker.jsx';

/**
* This component allows users to filter for specific events by event type, time, and location.
*/
class Filtering extends Component {
    constructor(props){ 
        super(props);
        this.state = {
            timeOption: 'now',
            datePickerTime: new Date(),
            location: 'Any',
            checkedGroupIds: new Set(),
            typeOfEvent: "all"
        };

        this.onGroupEventChange = this.onGroupEventChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.onApplyFilter = this.onApplyFilter.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    onGroupEventChange(event) {
        var newGroup = event.target.value;
        if (event.target.checked) {
            this.setState((prevState) => {
                prevState.checkedGroupIds.add(newGroup);
                return prevState;
            });
        } else {
            this.setState((prevState) => {
                prevState.checkedGroupIds.delete(newGroup);
                return prevState;
            });
        }
    }

    handleOptionChange(event) {
        var timeType = event.target.value;
        this.setState(prevState => {
            prevState.timeOption = timeType;
            if (timeType == "now") {
                prevState.time = new Date();
            }
            return prevState;
        });
    }

    handleTypeChange(event) {
        var newValue = event.target.value
        this.setState(prevState => {
            if (newValue != 'group') {
                prevState.checkedGroupIds = new Set();
            }
            prevState.typeOfEvent = newValue
            return prevState;
        });
    }

    updateLocation(location) {
        this.setState({
            location: location
        });
    }

    updateTime(date) {
        if (date == null) {
            return;
        }
        this.setState({
            datePickerTime: date,
            timeOption: 'at'
        });
    }


    onApplyFilter() {
        var content = {};
        if (this.state.location != 'Any') {
            content['location'] = this.state.location;
        };
        if (this.state.timeOption != 'any') {
            if (this.state.timeOption == 'now') {
                var now = new Date();
                content['startTime'] = {$lt: now};
                content['endTime'] = {$gt: now};
            } else {
                content['startTime'] = {$lt: this.state.datePickerTime};
                content['endTime'] = {$gt: this.state.datePickerTime};               
            }
        };

        // we only allow users to select a subset of
        // groups if they are only looking for group events
        if (this.state.typeOfEvent == 'public') {
            content['isPublic'] = true;
        } else if (this.state.typeOfEvent == 'group') {
            content['groupsVisibleTo'] = { $in: Array.from(this.state.checkedGroupIds) };
        } else {
            content['$or'] = [{groupsVisibleTo: { $in: this.props.groups}}, {isPublic: true}];
        }
        eventServices.getFilteredEvents(content)
            .then((resp) => {
                this.props.onUpdate(resp.content.filteredEvents);
            });
    }

  
  render () {
    return (
        <div id="filter" className="panel panel-default">
            <div className="panel-body">
                <h2 id="filter-header">Filter Events</h2>
                <h4>Event Type</h4>
                    <div className="radio">
                        <label>
                            <input type="radio" value='all' checked={this.state.typeOfEvent === 'all'} onChange={this.handleTypeChange} />
                                Any
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value='public' checked={this.state.typeOfEvent === 'public'} onChange={this.handleTypeChange} />
                                Public
                        </label>
                    </div>
                    { this.props.groups && 
                        <div className="radio">
                            <label>
                                <input type="radio" value='group' checked={this.state.typeOfEvent === 'group'} onChange={this.handleTypeChange} />
                                    Group Events
                            </label>

                            {this.props.groups.length != 0 &&
                                <div>
                                {this.props.groups.map(function(group) {
                                    return (
                                            <div key={group._id}>
                                                    {this.state.typeOfEvent != 'group' && 
                                                        <div>
                                                            <input type="checkbox" value={group._id} onChange={this.onGroupEventChange} className="checkbox-btn" disabled/>
                                                                {group.name}
                                                        </div>
                                                    }

                                                    {this.state.typeOfEvent == 'group' &&
                                                        <div> 
                                                            <input type="checkbox" value={group._id} onChange={this.onGroupEventChange} className="checkbox-btn" />
                                                                {group.name}
                                                        </div>
                                                    }
                                            </div>
                                        )
                                    }, this)
                                }
                                </div>
                            }
                        </div>
                    }

                <h4>Time</h4>
                    <div className="radio">
                        <label>
                            <input type="radio" value='any' checked={this.state.timeOption === 'any'} onChange={this.handleOptionChange} />
                                Any
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
                        </label> <br/>
                        <DateTimePicker defaultTime={this.state.datePickerTime} onChange={this.updateTime} classname='filtering-datetimepicker'/>
                    </div>

                <h4>Location</h4>
                <div>
                    <LocationPicker onUpdate={this.updateLocation} optional={true}/>
                </div>
                <button type='button' className='btn btn-blue float-right' onClick={this.onApplyFilter}>Apply</button>
            </div>
        </div>
    )
  }
}

export default Filtering;