import React, { Component } from 'react';
import { render } from 'react-dom';
import eventServices from '../../services/eventServices';
import groupServices from '../../services/groupServices';
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
            location: 'None',
            memberGroups: ['a','b'],
        };

        this.onPublicChange = this.onPublicChange.bind(this);
        this.onGroupEventChange = this.onGroupEventChange.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.onApplyFilter = this.onApplyFilter.bind(this);
        this.getAllGroups = this.getAllGroups.bind(this);
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

    getAllGroups() {
        if (this.props.user == undefined) {
            this.setState({memberGroups: []});
            return;
        }
        groupServices.getGroupsWithMember(this.props.user)
            .then((resp) => {
                this.setState({
                    memberGroups: resp.content.foundGroups
                });
            });
    }

    componentWillMount() {
        // this.getAllGroups();
    }

    onApplyFilter() {
        var content = {};
        if (this.state.location != 'None') {
            content['location'] = this.state.location;
        };
        if (this.state.timeOption != 'none') {
            content['startTime'] = {$lt: this.state.time};
            content['endTime'] = {$gt: this.state.time};
        };

        eventServices.getFilteredEvents(content)
            .then((resp) => {
                console.log(resp.content.filteredEvents);
                this.setState({
                    location: 'None',
                    time: Date.now()
                });
                this.props.onUpdate(resp.content.filteredEvents);
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
                    {this.state.memberGroups.length != 0 &&
                        <form>
                            <label> Group
                                <select value={this.selectedGroup} onChange={this.onGroupEventChange}>
                                    {this.state.memberGroups.map(function(group, index, array){
                                        return (<option key={index} value={group}>{group}</option>)
                                    })}
                                </select>
                            </label>
                        </form>
                    }
                   
                    {/*<div className="checkbox">
                        <label>
                            <input type="checkbox" value='ID OF GROUP' checked={this.state.isPublic} onChange={this.onPublicChange}/>
                                Group-specific

                        </label>
                    </div>*/}

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