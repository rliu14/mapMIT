/* Lead author: Dora */

import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import { MenuItem, DropdownButton } from 'react-bootstrap';
import LocationPicker from '../Elements/LocationPicker.jsx';
import DateTimePicker from '../Elements/DateTimePicker.jsx';
import eventServices from '../../services/eventServices';
import groupServices from '../../services/groupServices';
import { DateField, TransitionView, Calendar } from 'react-date-picker'
import 'react-date-picker/index.css';
import update from 'react-addons-update';
import NavBar from '../Elements/Navbar.jsx';

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
        this.onGroupEventChange = this.onGroupEventChange.bind(this);
        this.backToMyEvents = this.backToMyEvents.bind(this);
        this.checkValidEvent = this.checkValidEvent.bind(this);

		// this.updateGroupSpecificVisibility = this.updateGroupSpecificVisibility.bind(this);
		this.state = {
			eventName: '',
			startTime: new Date(),
			endTime: new Date(),
			room: '',
			eventDescription: '',
			location: '',
			locationDescription: '',
			host: this.props.user,
			creator: '',
			isPublic: true,
			memberGroups: [],
            checkedGroupIds: new Set(),
            message: ''
		}
	};

	componentDidMount() {
		groupServices.getGroupsWithMember(this.props.user)
			.then((resp) => {
				if(resp.success) {
					this.setState( { memberGroups: resp.content.foundGroups });
				}
			});	
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

	updateEventName(event) {
		this.setState({
			eventName: event.target.value
		});
	}

	updateStartTime(startTime) {
		this.setState({
			startTime: startTime
		});
	}

	updateEndTime(endTime) {
		this.setState({
			endTime: endTime,
		});
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

	checkValidEvent() {
		var result = []
		if (this.state.eventName == '') {
			result.push('Event Name is required. ');
		};
		if (this.state.startTime > this.state.endTime) {
			result.push('The times are invalid. ');
		};
		if (!this.state.isPublic && this.state.checkedGroupIds.size==0) {
			result.push('Please select at least 1 group.');
		};
		return result;
	}

	// creates event in the event database
	submitEvent() {
		var result = this.checkValidEvent();
		if (result.length == 0) {
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
			groupsVisibleTo: Array.from(this.state.checkedGroupIds)
			}
			eventServices.createEvent(content)
				.then((resp) => {
					browserHistory.push('/myEvents');
			});
		} else {
			this.setState({ message : result });
			
		}
	}

	backToMyEvents() {
		browserHistory.push('/myEvents');
	}

	render() {
	  	return ( 
            <div>
                <NavBar
                    currentUser = {this.props.user}
                    logout = {this.props.logout}
                />
				<div className="events-container">
					<div className="events-panel panel panel-default">
	            		<div className="panel-body events-panel-body">
				  			<h2 className="create-event-header">Create an Event!</h2>
				  			<div>				  					
				  				<span className="validation-message">{this.state.message}</span>

				  				<div className="create-event-input">
					  				<span className="create-event-input-label">Event Name* </span> 
					  				<input type="text" className="form-control create-event-input-option event-name" value={this.state.eventName} onChange={this.updateEventName}></input> <br/>
					  			</div>

					  			<div className="create-event-input">
						  			<span className="create-event-input-label">Host* </span> 
			                        <select className="create-event-input-option host-dropdown form-control" value={this.state.host} onChange={this.updateHost}>
			                        	<option value={this.props.user}>{this.props.user}</option>
			                            {this.state.memberGroups.map(function(group){
			                                return (<option value={group.name}>{group.name}</option>)
			                            })}
			                        </select>
					  			</div>					  			

					  			<div className="create-event-input">
						  			<span className="create-event-input-label">Time* </span> 
						  			<div className="create-event-input-option">
							  			<DateTimePicker onChange={this.updateStartTime} classname="event-datetimepicker" />
						  				<span className="time-row-span"> - </span>
						  				<DateTimePicker onChange={this.updateEndTime} classname="event-datetimepicker" />
									</div>
								</div>					  			

								<div className="create-event-input">
					  				<span className="create-event-input-label">Event Description </span> 
					  				<textarea className="form-control create-event-input-option" value={this.eventDescription} onChange={this.updateEventDescription}></textarea> <br/>
					  			</div>

					  			<div className="create-event-input">
						  			<span className="create-event-input-label">Select Location* </span> 
						  			<div className="create-event-input-option">
						  				<LocationPicker onUpdate={this.updateLocation}/>
								    </div>
								</div>

					  			<div className="create-event-input">
					  				<span className="create-event-input-label">Room</span> 
					  				<input type="text" className="form-control create-event-input-option room-option" value={this.state.room} onChange={this.updateRoom}></input> <br/>
					  			</div>					  			

					  			<div className="create-event-input">
					  				<span className="create-event-input-label">Location Description </span> 
					  				<textarea type="text" className="form-control create-event-input-option" value={this.locationDescription} onChange={this.updateLocationDescription}></textarea> <br/>
					  			</div>

					  			<div className="create-event-input">
						  			<span className="create-event-input-label">Privacy* </span> 
						  			<div className="create-event-input-option">
			                            <input type="radio" value={true} checked={this.state.isPublic} onChange={this.onPublicChange} className="radio-btn"/>
			                                Public<br/>
			                            {this.state.memberGroups.length != 0 &&
			                            	<div className="group-radio-container">
				                            	<input type="radio" value={false} checked={!this.state.isPublic} onChange={this.onPublicChange} className="radio-btn"/>
				                                Group-specific<br/>
				                                <div>
				                                {this.state.memberGroups.map(function(group) {
				                                    return (
				                                            <div key={group._id}>
			                                                    {this.state.isPublic && 
			                                                        <div>
			                                                            <input type="checkbox" value={group._id} onChange={this.onGroupEventChange} disabled className="checkbox-btn"/>
			                                                                {group.name}
			                                                        </div>
			                                                    }

			                                                    {!this.state.isPublic &&
			                                                        <div> 
			                                                            <input type="checkbox" value={group._id} onChange={this.onGroupEventChange} className="checkbox-btn"/>
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
					  		</div>

					  		<div>
					  			<div className="event-btn-container">
						  			<button type='button' className='btn btn-default event-cancel-btn' onClick={this.backToMyEvents}>
				                        Cancel
				                    </button>
				                    <button type='button' className='btn btn-default btn-blue event-submit-btn' onClick={this.submitEvent}>
				                        Create Event
				                    </button>
			                    </div>
			                </div>
				  		</div>
		  			</div>
		  		</div>
	  		</div>	
	  	)
	}
}

export default withRouter(CreateEvent);