/* Lead author: Dora */

import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import eventServices from '../../services/eventServices';
import groupServices from '../../services/groupServices';
import LocationPicker from '../Elements/LocationPicker.jsx';
import { DateField, TransitionView, Calendar } from 'react-date-picker'
import 'react-date-picker/index.css';

class EditEvent extends Component {
	constructor(props) {
		super(props);
		this.updateEventName = this.updateEventName.bind(this);
		this.updateStartTime = this.updateStartTime.bind(this);
		this.updateEndTime = this.updateEndTime.bind(this);
		this.updateRoomNumber = this.updateRoomNumber.bind(this);
		this.updateEventDescription = this.updateEventDescription.bind(this);
		this.updateLocation = this.updateLocation.bind(this);
		this.updateLocationDescription = this.updateLocationDescription.bind(this);
		this.updateHost = this.updateHost.bind(this);
		this.updateEvent = this.updateEvent.bind(this);
		this.backToMyEvents = this.backToMyEvents.bind(this);
        this.onGroupEventChange = this.onGroupEventChange.bind(this);
        this.onPublicChange = this.onPublicChange.bind(this);

		this.state = {
			isLoaded: false,
			eventName: '',
			startTime: Date.now(),
			endTime: Date.now(),
			roomNumber: '',
			eventDescription: '',
			location: '',
			locationDescription: '',
			host: '',
			memberGroups: [],
			isPublic: false,
			checkedGroupIds: new Set()
		}
	}

	// pre-populates all the input forms with the event's current details
	componentDidMount() {
		var eventId = this.props.params.eventId;
		console.log(eventId);
		eventServices.getEvent(eventId)
			.then((resp) => {
				if(resp.success) {
					var foundEvent = resp.content.foundEvent;
					this.setState( { 
						eventName: foundEvent.name,
						startTime: Date.parse(foundEvent.startTime), // TODO blah this doesn't work
						endTime: Date.parse(foundEvent.endTime), // TODO same here
						roomNumber: foundEvent.room,
						eventDescription: foundEvent.description,
						location: foundEvent.location.name,
						locationDescription: foundEvent.locationDescription,
						host: foundEvent.host,
						isPublic: foundEvent.isPublic,
						isLoaded: true,
						checkedGroupIds: new Set(foundEvent.groupsVisibleTo)
					});
				}
			});
		groupServices.getGroupsWithMember(this.props.user)
			.then((resp) => {
				if(resp.success) {
					this.setState( { memberGroups: resp.content.foundGroups });
				}
			});		
	}

	updateEventName(event) {
		this.setState({
			eventName: event.target.value
		});
	}

	updateStartTime(dateString, { dateMoment, timestamp }) {
		this.setState({
			startTime: dateMoment.toDate()
		});
		console.log(this.state.startTime);
	}

	updateEndTime(dateString, { dateMoment, timestamp }) {
		this.setState({
			endTime: dateMoment.toDate()
		});
		console.log(this.state.endTime);
	}

	updateRoomNumber(event) {
		this.setState({
			roomNumber: event.target.value
		});
	}

	updateEventDescription(event) {
		this.setState({
			eventDescription: event.target.value
		});
	}

	updateLocation(location) {
		console.log(this.state.location);
		this.setState({
			location: location
		});
	}

	updateLocationDescription(event) {
		this.setState({
			locationDescription: event.target.value
		});
	}

	updateHost(event) {
		this.setState({
			host: event.target.value
		});
	}

	onPublicChange(event) {
		var targetVal = event.target.value === 'true';
		this.setState({isPublic: targetVal});
	}

	onGroupEventChange(event) {
		console.log(this.state.checkedGroupIds);
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

	updateEvent() {
		var content = {
			name: this.state.eventName,
			startTime: this.state.startTime,
			endTime: this.state.endTime,
			room: this.state.roomNumber,
			description: this.state.eventDescription,
			location: this.state.location, //TODO bring this back somehow
			locationDescription: this.state.locationDescription,
			host: this.state.host,
			creator: this.state.user,
			isPublic: this.state.isPublic,
			groupsVisibleTo: Array.from(this.state.checkedGroupIds)
		}
		eventServices.updateEvent(this.props.params.eventId, content)
			.then((resp) => {
				console.log(resp);
				this.backToMyEvents();
			})
	}

	backToMyEvents() {
		browserHistory.push('/myEvents');
	}

	render() {
	  	return ( 
	  		<div>
		  		<div className="header">
		  			<h1>Edit Your Event</h1>
		  		</div>		  		
		  		{this.state.isLoaded &&
		  		<div className="input-group">
		  			<span>Event Name* </span> 
		  			<input type="text" className="form-control" value={this.state.eventName} onChange={this.updateEventName}></input> <br/>

		  			<span>Time* </span> 
		  			{/*<DateField forceValidDate
							   defaultValue={this.state.startTime}
					    	   dateFormat="YYYY-MM-DD HH:mm:ss"
					    	   onChange={this.updateStartTime}>
					    <TransitionView>
					    	<Calendar style={{padding: 10}}/>
					    </TransitionView>
					</DateField>
		  			<span> - </span>
		  			<DateField forceValidDate
							   defaultValue={this.state.endTime}
					    	   dateFormat="YYYY-MM-DD HH:mm:ss"
					    	   onChange={this.updateStartTime}>
					    <TransitionView>
					    	<Calendar style={{padding: 10}}/>
					    </TransitionView>
					</DateField> <br/> */}
					<form>
                            <input type="datetime-local" onChange={this.updateTime}/>
                    </form>

		  			<span>Room Number</span> 
		  			<input type="text" className="form-control" value={this.state.roomNumber} onChange={this.updateRoomNumber}></input> <br/>

		  			<span>Event Description </span> 
		  			<input type="text" className="form-control" value={this.state.eventDescription} onChange={this.updateEventDescription}></input> <br/>

		  			<span>Select Location* </span> 
					<div className="create-event-input-option">
		  				<LocationPicker onUpdate={this.updateLocation} location={this.state.location}/>
				    </div>

		  			<span>Location Description </span> 
		  			<input type="text" className="form-control" value={this.state.locationDescription} onChange={this.updateLocationDescription}></input> <br/>

		  			<span>Host* </span> 
		  			<select className="create-event-input-option" value={this.state.host} onChange={this.updateHost}>
                    	<option value={this.props.user}>{this.props.user}</option>
                        {this.state.memberGroups.map(function(group){
                            return (<option key={group._id} value={group.name}>{group.name}</option>)
                        })}
                    </select>

                	<span>Privacy* </span> 
		  			<div className="create-event-input-option">
                        <input type="radio" value={true} checked={this.state.isPublic} onChange={this.onPublicChange}/>
                            Public<br/>
                        {this.state.memberGroups.length != 0 &&
                        	<div className="group-radio-container">
                            	<input type="radio" value={false} checked={!this.state.isPublic} onChange={this.onPublicChange}/>
                                Group-specific<br/>
                                <div>
                                {this.state.memberGroups.map(function(group) {
                                    return (
                                            <div key={group._id}>
                                                {this.state.isPublic && 
                                                    <div>
                                                        <input type="checkbox" value={group._id} defaultChecked={this.state.checkedGroupIds.has(group._id)} onChange={this.onGroupEventChange} disabled/>
                                                            {group.name}
                                                    </div>
                                                }

                                                {!this.state.isPublic &&
                                                    <div> 
                                                        <input type="checkbox" value={group._id} defaultChecked={this.state.checkedGroupIds.has(group._id)} onChange={this.onGroupEventChange} />
                                                            {group.name}
                                                    </div>
                                                }
                                            </div>
                                        )
                                    }, this)
                                }
                                </div>
                            </div>
                        }
	                </div>
		  		</div>
		  		}

		  		<span className='input-group-btn'>
                    <button type='button' className='btn btn-default' onClick={this.updateEvent}>Save</button>
                    <button type='button' className='btn btn-default' onClick={this.backToMyEvents}>Cancel</button>
                </span>
	  		</div>
	  	)
	}
}

export default withRouter(EditEvent);