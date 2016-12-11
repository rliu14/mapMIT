import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import { MenuItem, DropdownButton } from 'react-bootstrap';
import LocationPicker from '../Elements/LocationPicker.jsx';
import DateTimePicker from '../Elements/DateTimePicker.jsx';
import eventServices from '../../services/eventServices';
import groupServices from '../../services/groupServices';

class EventEditor extends Component {
    constructor(props){ 
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
        this.findEvent = this.findEvent.bind(this);

		this.state = {
			eventName: '',
			startTime: new Date(),
			endTime: new Date(),
			room: '',
			eventDescription: '',
			location: 'Building 1',
			locationDescription: '',
			host: this.props.fullname,
			creator: '',
			isPublic: true,
			memberGroups: [],
            checkedGroupIds: new Set(),
            isLoaded: false,
            message: '',
		}
	}

	componentDidMount() {
		var new_state = {};
		var that = this;
		if (this.props.eventId != undefined) {
			this.findEvent(this.props.eventId, function(new_state) {
				groupServices.getGroupsWithMember(that.props.user)
					.then((resp) => {
						if(resp.success) {
							new_state["memberGroups"] = resp.content.foundGroups;
							that.setState(new_state);
						} else {
							console.log("Something went wrong getting groups");
						}
					});
			});

		} else {
			groupServices.getGroupsWithMember(this.props.user)
				.then((resp) => {
					if(resp.success) {
						new_state["memberGroups"] = resp.content.foundGroups;
						new_state['isLoaded'] = true;
						this.setState(new_state);
					} else {
						console.log("Something went wrong getting groups");
					}
				});
		}
	
	}
	

	findEvent(eventId, callback) {
		console.log(eventId);
		
		eventServices.getEvent(eventId)
			.then((resp) => {
				if(resp.success) {
					var foundEvent = resp.content.foundEvent;
					console.log("FOUND EVENT", resp.content.foundEvent);
					var new_state = {
						eventName: foundEvent.name,
						startTime: new Date(foundEvent.startTime),
						endTime: new Date(foundEvent.endTime),
						room: foundEvent.room,
						eventDescription: foundEvent.description,
						location: foundEvent.location.name,
						locationDescription: foundEvent.locationDescription,
						host: foundEvent.host,
						isPublic: foundEvent.isPublic,
						isLoaded: true,
						checkedGroupIds: new Set(foundEvent.groupsVisibleTo)
					}

					callback(new_state); 
				} else {
					console.log("Something went wrong trying to find event");
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
		}
		if (this.state.startTime > this.state.endTime) {
			result.push('The times are invalid. ');
		}
		if (!this.state.isPublic && this.state.checkedGroupIds.size==0) {
			result.push('Please select at least 1 group.');
		}
		return result;
	}

	submitEvent() {
		var message = this.checkValidEvent();
		if (message.length == 0) {
			this.props.onSubmit(this.state);
		} else {
			this.setState({message: message});
		}
	}

	backToMyEvents() {
		browserHistory.push('/myEvents');
	}

    render() {
    	return (
				<div className="events-container">
  					<span className="validation-message">{this.state.message}</span>

				   {this.state.isLoaded && 
					<div className="events-panel panel panel-default">
	            		<div className="panel-body events-panel-body">
				  			<h2 className="create-event-header">{this.props.buttonName} an Event!</h2>
				  			<div>
				  				<div className="create-event-input">
					  				<span className="create-event-input-label">Event Name* </span> 
					  				<input type="text" className="form-control create-event-input-option event-name" value={this.state.eventName} onChange={this.updateEventName}></input> <br/>
					  			</div>

					  			<div className="create-event-input">
						  			<span className="create-event-input-label">Host* </span> 
			                        <select className="create-event-input-option host-dropdown form-control" value={this.state.host} onChange={this.updateHost}>
			                        	<option value={this.props.fullname}>{this.props.fullname}</option>
			                            {this.state.memberGroups.map(function(group){
			                                return (<option key={group.name} value={group.name}>{group.name}</option>)
			                            })}
			                        </select>
					  			</div>					  			

					  			<div className="create-event-input">
						  			<span className="create-event-input-label">Time* </span> 
						  			<div className="create-event-input-option">
							  			<DateTimePicker onChange={this.updateStartTime} defaultTime={this.state.startTime} classname="event-datetimepicker" />
						  				<span className="time-row-span"> - </span>
						  				<DateTimePicker onChange={this.updateEndTime} defaultTime={this.state.endTime} classname="event-datetimepicker" />
									</div>
								</div>					  			

								<div className="create-event-input">
					  				<span className="create-event-input-label">Event Description </span> 
					  				<textarea className="form-control create-event-input-option" value={this.state.eventDescription} onChange={this.updateEventDescription}></textarea> <br/>
					  			</div>

					  			<div className="create-event-input">
						  			<span className="create-event-input-label">Select Location* </span> 
						  			<div className="create-event-input-option">
						  				<LocationPicker onUpdate={this.updateLocation} location={this.state.location}/>
								    </div>
								</div>

					  			<div className="create-event-input">
					  				<span className="create-event-input-label">Room</span> 
					  				<input type="text" className="form-control create-event-input-option room-option" value={this.state.room} onChange={this.updateRoom}></input> <br/>
					  			</div>					  			

					  			<div className="create-event-input">
					  				<span className="create-event-input-label">Location Description </span> 
					  				<textarea type="text" className="form-control create-event-input-option" value={this.state.locationDescription} onChange={this.updateLocationDescription}></textarea> <br/>
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
				                        {this.props.buttonName} Event
				                    </button>
			                    </div>
			                </div>
				  		</div>
		  			</div> 
		  		}
		  		</div>
		  	)
		}
	}


export default EventEditor;
		  