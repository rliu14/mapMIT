import React, { Component } from 'react';
import { withRouter } from 'react-router';

class CreateEvent extends Component {
	constructor(props) {
		super(props);
		this.defaultProps = {
		}
		this.updateEventName = this.updateEventName.bind(this);
		this.updateRoomNumber = this.updateRoomNumber.bind(this);
		this.updateEventDescription = this.updateEventDescription.bind(this);
		this.updateLocationDescription = this.updateLocationDescription.bind(this);
		this.updateHost = this.updateHost.bind(this);
		this.state = {
			eventName: '',
			eventDate: '',
			startTime: '',
			endTime: '',
			roomNumber: '',
			eventDescription: '',
			location: '',
			locationDescription: '',
			host: ''
		}
	};

	updateEventName(event) {
		this.setState({
			eventName: event.target.value
		});
	}

	// NEED UPDATE EVENTDATE
	// NEED UPDATE START TIME , END TIME

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

	// NEED UPDATE EVENT LOCATION

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
		  			<br/>

		  			<span>Time* </span> 
		  			<input type="text" className="form-control" placeholder="Start"></input>
		  			<span> - </span>
		  			<input type="text" className="form-control" placeholder="End"></input> <br/>

		  			<span>Room Number</span> 
		  			<input type="text" className="form-control" value={this.state.roomNumber} onChange={this.updateRoomNumber}></input> <br/>

		  			<span>Event Description </span> 
		  			<input type="text" className="form-control" value={this.eventDescription} onChange={this.updateEventDescription}></input> <br/>

		  			<span>Select Location* </span> 
		  			<br/>

		  			<span>Location Description </span> 
		  			<input type="text" className="form-control" value={this.locationDescription} onChange={this.updateLocationDescription}></input> <br/>

		  			<span>Host* </span> 
		  			<input type="text" className="form-control" value={this.host} onChange={this.updateHost}></input> <br/>
		  		</div>
	  		</div>
	  	)
	}
}

export default withRouter(CreateEvent);