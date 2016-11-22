import React, { Component } from 'react';
import { withRouter } from 'react-router';
import eventServices from '../../services/eventServices';

class CreateEvent extends Component {
	constructor(props) {
		super(props);
		this.updateEventName = this.updateEventName.bind(this);
		this.updateEventDate = this.updateEventDate.bind(this);
		this.updateStartTime = this.updateStartTime.bind(this);
		this.updateEndTime = this.updateEndTime.bind(this);
		this.updateRoomNumber = this.updateRoomNumber.bind(this);
		this.updateEventDescription = this.updateEventDescription.bind(this);
		this.updateLocation = this.updateLocation.bind(this);
		this.updateLocationDescription = this.updateLocationDescription.bind(this);
		this.updateHost = this.updateHost.bind(this);
		this.submitEvent = this.submitEvent.bind(this);
		this.state = {
			eventName: '',
			eventDate: '',
			startTime: '',
			endTime: '',
			roomNumber: '',
			eventDescription: '',
			location: '',
			locationDescription: '',
			host: '',
			creator: ''
		}
	};

	updateEventName(event) {
		this.setState({
			eventName: event.target.value
		});
	}

	// DATE PICKER?
	updateEventDate(event) {
		this.setState({
			eventDate: event.target.value
		});
	}

	// TIME PICKER?
	updateStartTime(event) {
		this.setState({
			startTime: event.target.value
		});
	}

	// END TIME
	updateEndTime(event) {
		this.setState({
			endTime: event.target.value
		});
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

	// NEED LOCATION DROPDOWN 
	updateLocation(event) {
		this.setState({
			location: event.target.value
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

	submitEvent() {
		// call the createEvent service
		var content = {
			eventName: this.state.eventName,
			eventDate: this.state.eventDate,
			startTime: this.state.startTime,
			endTime: this.state.endTime,
			roomNumber: this.state.roomNumber,
			eventDescription: this.state.eventDescription,
			location: this.state.location,
			locationDescription: this.state.locationDescription,
			host: this.state.host,
			creator: this.props.user
		}
		eventServices.createEvent(content)
			.then((resp) => {
				this.setState = {
					eventName: '',
					eventDate: '',
					startTime: '',
					endTime: '',
					roomNumber: '',
					eventDescription: '',
					location: '',
					locationDescription: '',
					host: '',
					creator: ''
				}
			})
	}


	render() {
	  	return ( 
	  		<div>
		  		<div className="header">
		  			<h1>Create an Event!</h1>
		  		</div>
		  		<div className="input-group">
		  			
		  			<span>Event Name* </span> 
		  			<input type="text" className="form-control" value={this.state.eventName} onChange={this.updateEventName}></input> <br/>

		  			<span>Date* </span> 
		  			<input type="text" className="form-control" value={this.state.eventDate} onChange={this.updateEventDate} placeholder="TEMP"></input> <br/>

		  			<span>Time* </span> 
		  			<input type="text" className="form-control" value={this.startTime} onChange={this.updateStartTime} placeholder="Start"></input>
		  			<span> - </span>
		  			<input type="text" className="form-control" value={this.endTime} onChange={this.updateEndTime} placeholder="End"></input> <br/>

		  			<span>Room Number</span> 
		  			<input type="text" className="form-control" value={this.state.roomNumber} onChange={this.updateRoomNumber}></input> <br/>

		  			<span>Event Description </span> 
		  			<input type="text" className="form-control" value={this.eventDescription} onChange={this.updateEventDescription}></input> <br/>

		  			<span>Select Location* </span> 
		  			<input type="text" className="form-control" value={this.state.location} onChange={this.updateLocation} placeholder="TEMP"></input> <br/>


		  			<span>Location Description </span> 
		  			<input type="text" className="form-control" value={this.locationDescription} onChange={this.updateLocationDescription}></input> <br/>

		  			<span>Host* </span> 
		  			<input type="text" className="form-control" value={this.host} onChange={this.updateHost}></input> <br/>
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