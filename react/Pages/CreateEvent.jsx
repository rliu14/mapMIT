/* Lead author: Dora */

import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import { MenuItem, DropdownButton } from 'react-bootstrap';
import LocationPicker from '../Elements/LocationPicker.jsx';
import eventServices from '../../services/eventServices';
import groupServices from '../../services/groupServices';
import { DateField, TransitionView, Calendar } from 'react-date-picker'
import 'react-date-picker/index.css';

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
			groups: []
		}
	};

	componentWillMount() {
		groupServices.getGroupsWithMember(this.props.user)
			.then((resp) => {
				if(resp.success) {
					this.setState( { groups: resp.content.foundGroups });
				}
			});		
	}

	updateEventName(event) {
		console.log(this.state.groups);
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

	// creates event in the event database
	submitEvent() {
		// call the createEvent service to create an event with content
		var content =  {
			name: this.state.eventName,
			startTime: this.state.startTime,
			endTime: this.state.endTime,
			room: this.state.room,
			description: this.state.eventDescription,
			location: this.state.location, 
			locationDescription: this.state.locationDescription,
			host: this.state.host,
			creator: this.props.user
		}
		eventServices.createEvent(content)
			.then((resp) => {
				this.setState = {
					eventName: '',
					startTime: '',
					endTime: '',
					room: '',
					eventDescription: '',
					location: '',
					locationDescription: '',
					host: '',
					creator: ''
				};
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
							    	   dateFormat="MM-DD-YYYY HH:mm a"
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