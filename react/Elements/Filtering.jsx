/* Lead author: Dora & Rena */

import React, { Component } from 'react';
import { render } from 'react-dom';
import eventServices from '../../services/eventServices';
import groupServices from '../../services/groupServices';
import LocationPicker from './LocationPicker.jsx';
import DateTimePicker from './DateTimePicker.jsx';
import { DateField, TransitionView, Calendar, MonthView } from 'react-date-picker'

class Filtering extends Component {
    constructor(props){ 
        super(props);
        this.state = {
            timeOption: 'now',
            datePickerTime: new Date(),
            location: 'Any',
            groupsLoaded: false,
            memberGroups: [],
            checkedGroupIds: new Set(),
            typeOfEvent: "all"
        };

        this.onGroupEventChange = this.onGroupEventChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.onApplyFilter = this.onApplyFilter.bind(this);
        this.getAllGroups = this.getAllGroups.bind(this);
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
        console.log('handle option change')
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

    getAllGroups() {
        if (this.props.user == undefined) {
            return;
        }
        groupServices.getGroupsWithMember(this.props.user)
            .then((resp) => {
                this.setState({
                    memberGroups: resp.content.foundGroups,
                    groupsLoaded: true
                });
            });
    }

    componentDidMount() {
        this.getAllGroups();
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
        }

        eventServices.getFilteredEvents(content)
            .then((resp) => {
                console.log(resp.content.filteredEvents);
                this.setState({
                });
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
                    { this.state.groupsLoaded && 
                        <div className="radio">
                            <label>
                                <input type="radio" value='group' checked={this.state.typeOfEvent === 'group'} onChange={this.handleTypeChange} />
                                    Group Events
                            </label>

                            {this.state.memberGroups.length != 0 &&
                                <div>
                                {this.state.memberGroups.map(function(group) {
                                    return (
                                            <div key={group._id}>
                                                <label>
                                                    {this.state.typeOfEvent != 'group' && 
                                                        <div>
                                                            <input type="checkbox" value={group._id} onChange={this.onGroupEventChange} disabled/>
                                                                {group.name}
                                                        </div>
                                                    }

                                                    {this.state.typeOfEvent == 'group' &&
                                                        <div> 
                                                            <input type="checkbox" value={group._id} onChange={this.onGroupEventChange} />
                                                                {group.name}
                                                        </div>
                                                    }

                                                </label>
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
                        <DateTimePicker defaultTime={this.state.datePickerTime} onChange={this.updateTime}/>
                    </div>

                <h4>Location</h4>
                <div>
                    <LocationPicker onUpdate={this.updateLocation} optional={true}/>
                </div>
                <button type='button' className='btn btn-default' onClick={this.onApplyFilter}>Apply</button>
            </div>
        </div>
    )
  }
}

export default Filtering;