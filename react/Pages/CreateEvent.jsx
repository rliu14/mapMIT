/* Lead author: Dora */

import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import { MenuItem, DropdownButton } from 'react-bootstrap';
import LocationPicker from '../Elements/LocationPicker.jsx';
import eventServices from '../../services/eventServices';
import groupServices from '../../services/groupServices';
import { DateField, TransitionView, Calendar } from 'react-date-picker'
import 'react-date-picker/index.css';
import update from 'react-addons-update';

class CreateEvent extends Component {
	constructor(props) {
		super(props);
		this.updateEventName = this.updateEventName.bind(this);
		this.updateStartTime = this.updateStartTime.bind(this); // TODO fix these
		this.updateEndTime = this.updateEndTime.bind(this); // TODO fix these
		this.updateRoom = this.updateRoom.bind(this);
		this.updateEventDescription = this.updateEventDescription.bind(this);
		this.updateLocation = this.updateLocation.bind(this);
		this.updateLocationDescription = this.updateLocationDescription.bind(this);
		this.updateHost = this.updateHost.bind(this);
		this.submitEvent = this.submitEvent.bind(this);
		this.onPublicChange = this.onPublicChange.bind(this);
		this.updateGroupSpecificVisibility = this.updateGroupSpecificVisibility.bind(this);
		this.state = {
			eventName: '',
			startTime: Date.now(),
			endTime: Date.now(),
			room: '',
			eventDescription: '',
			location: '',
			locationDescription: '',
			host: '',
			creator: '',
			isPublic: true,
			groups: [],
			groupSpecificVisibility: {}
		}
	};

	componentWillMount() {
		groupServices.getGroupsWithMember(this.props.user)
			.then((resp) => {
				if(resp.success) {
					this.setState( { groups: resp.content.foundGroups });
					var groupVisibilityDict = resp.content.foundGroups.reduce(function(dict, group) {
						dict[group._id] = false;
						return dict;
					}, {});
					this.setState( { groupSpecificVisibility: groupVisibilityDict });
				}
			});	
	}

	updateEventName(event) {
		console.log(this.state.groupSpecificVisibility);
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

	updateRoom(event) {
		this.setState({
			room: event.target.value
		});
	}

	updateEventDescription(event) {
		this.setState({
			eventDescription: event.target.value
		});
	}

	updateLocation(event) {
		this.setState({
			location: event
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
		if (this.state.isPublic !== targetVal) {
			this.setState({isPublic: !this.state.isPublic});
		}
	}

	updateGroupSpecificVisibility(groupId, event) {
		var newVisibility = event.target.value == 'false';
		var newDict = update(this.state.groupSpecificVisibility, {$merge: {[groupId]: newVisibility}});
		this.setState({
			groupSpecificVisibility: newDict
		});
	}

	// creates event in the event database
	submitEvent() {
		// call the createEvent service to create an event with content
		var groupsVisibleTo = this.state.groups.filter(function(group) {
			return this.state.groupSpecificVisibility[group._id];
		}, this);
		var content =  {
			name: this.state.eventName,
			startTime: this.state.startTime,
			endTime: this.state.endTime,
			room: this.state.room,
			description: this.state.eventDescription,
			location: this.state.location, 
			locationDescription: this.state.locationDescription,
			host: this.state.host,
			creator: this.props.user,
			isPublic: this.state.isPublic,
			groupsVisibleTo: groupsVisibleTo
		}
		eventServices.createEvent(content)
			.then((resp) => {
				browserHistory.push('/myEvents');
			})
	}


	render() {
	  	return ( 
	  		<div>
		  		<div className="header">
		  			<h2>Create an Event!</h2>
		  		</div>
		  		<div className="">
		  			<div className="create-event-input">
		  				<span className="create-event-input-label">Event Name* </span> 
		  				<input type="text" className="form-control create-event-input-option" value={this.state.eventName} onChange={this.updateEventName}></input> <br/>
		  			</div>
		  		
		  			<div className="create-event-input">
			  			<span className="create-event-input-label">Time* </span> 
			  			<div className="create-event-input-option">
				  			<DateField forceValidDate
							    	   defaultValue={this.state.startTime}
							    	   dateFormat="MM-DD-YYYY hh:mm a"
							    	   onChange={this.updateStartTime}>
							    <TransitionView>
							    	<Calendar style={{padding: 10}}/>
							    </TransitionView>
							</DateField>
				  			<span> - </span>
				  			<DateField forceValidDate
							    	   defaultValue={this.state.endTime}
							    	   dateFormat="MM-DD-YYYY hh:mm a"
							    	   onChange={this.updateEndTime}>
							    <TransitionView>
							    	<Calendar style={{padding: 10}}/>
							    </TransitionView>
							</DateField><br/>
						</div>
					</div>

		  			<div className="create-event-input">
		  				<span className="create-event-input-label">Room</span> 
		  				<input type="text" className="form-control create-event-input-option" value={this.state.room} onChange={this.updateRoom}></input> <br/>
		  			</div>

		  			<div className="create-event-input">
		  				<span className="create-event-input-label">Event Description </span> 
		  				<input type="text" className="form-control create-event-input-option" value={this.eventDescription} onChange={this.updateEventDescription}></input> <br/>
		  			</div>

		  			<div className="create-event-input">
			  			<span className="create-event-input-label">Select Location* </span> 
			  			<div className="create-event-input-option">
			  				<LocationPicker onUpdate={this.updateLocation}/>
					    </div>
					</div>

		  			<div className="create-event-input">
		  				<span className="create-event-input-label">Location Description </span> 
		  				<input type="text" className="form-control create-event-input-option" value={this.locationDescription} onChange={this.updateLocationDescription}></input> <br/>
		  			</div>

		  			<div className="create-event-input">
			  			<span className="create-event-input-label">Host* </span> 
                        <select className="create-event-input-option" value={this.state.host} onChange={this.updateHost}>
                        	<option value={this.props.user}>{this.props.user}</option>
                            {this.state.groups.map(function(group){
                                return (<option value={group.name}>{group.name}</option>)
                            })}
                        </select>
		  			</div>

		  			<div className="create-event-input">
			  			<span className="create-event-input-label">Privacy* </span> 
			  			<div className="create-event-input-option">
                            <input type="radio" value={true} checked={this.state.isPublic} onChange={this.onPublicChange}/>
                                Public<br/>
                            <input type="radio" value={false} checked={!this.state.isPublic} onChange={this.onPublicChange}/>
                                Group-specific<br/>
                            {this.state.groups.map(function(group){
                                return (
                                	<div>
                                		<input type="checkbox" key={group._id} value={this.state.groupSpecificVisibility[group._id]} checked={this.state.groupSpecificVisibility[group._id]} onChange={this.updateGroupSpecificVisibility.bind(this, group._id)}/>
                                		{group.name}
                                	</div>
                                )
                            }, this)}
		                </div>
	                </div>
		  		</div>
		  		<span className='input-group-btn'>
                    <button type='button' className='btn btn-default' onClick={this.submitEvent}>
                        Create
                    </button>
                </span>
	  		</div>
	  	)
	}
}

export default withRouter(CreateEvent);