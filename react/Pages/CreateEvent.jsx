import React, { Component } from 'react';
import { withRouter } from 'react-router';
import eventServices from '../../services/eventServices';
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
	updateStartTime(dateString, { dateMoment, timestamp }) {
		console.log('update start time');
		console.log(dateMoment);
		this.setState({
			startTime: dateMoment.toDate()
		});
		console.log(this.state.startTime);
	}

	// END TIME
	updateEndTime(dateString, { dateMoment, timestamp }) {
		console.log('update end time');
		console.log(dateMoment);
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
			name: this.state.eventName,
			startTime: this.state.startTime,
			endTime: this.state.endTime,
			room: this.state.room,
			eventDescription: this.state.eventDescription,
			// location: this.state.location, TODO bring this back somehow
			locationDescription: this.state.locationDescription,
			host: this.state.host,
			creator: this.props.user // TODO figure this out
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
		  			
		  			<span>Time* </span> 
		  			<DateField forceValidDate
					    	   defaultValue={"2016-05-30 15:23:34"}
					    	   dateFormat="YYYY-MM-DD HH:mm:ss"
					    	   onChange={this.updateStartTime}>
					    <TransitionView>
					    	<Calendar style={{padding: 10}}/>
					    </TransitionView>
					</DateField>
		  			<span> - </span>
		  			<DateField forceValidDate
					    	   defaultValue={"2016-05-30 15:23:34"}
					    	   dateFormat="YYYY-MM-DD HH:mm:ss"
					    	   onChange={this.updateEndTime}>
					    <TransitionView>
					    	<Calendar style={{padding: 10}}/>
					    </TransitionView>
					</DateField> <br/>

		  			<span>Room</span> 
		  			<input type="text" className="form-control" value={this.state.room} onChange={this.updateRoom}></input> <br/>

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