import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import { MenuItem, DropdownButton } from 'react-bootstrap';
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
	updateLocation(eventKey) {
		console.log('EVENTKEY');
		console.log(eventKey);
		this.setState({
			location: eventKey
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
			description: this.state.eventDescription,
			location: this.state.location, //TODO bring this back somehow
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
		  			<DropdownButton title='Select' onSelect={this.updateLocation}>
				    	<MenuItem eventKey="Building 1">Building 1</MenuItem>
				    	<MenuItem eventKey="Building 2">Building 2</MenuItem>
				    	<MenuItem eventKey="Building 3">Building 3</MenuItem>
				    	<MenuItem eventKey="Building 4">Building 4</MenuItem>
				    	<MenuItem eventKey="Building 5">Building 5</MenuItem>
				    	<MenuItem eventKey="Building 6">Building 6</MenuItem>
				    	<MenuItem eventKey="Building 7">Building 7</MenuItem>
				    	<MenuItem eventKey="Building 10">Building 10</MenuItem>
				    	<MenuItem eventKey="Building 13">Building 13</MenuItem>
				    	<MenuItem eventKey="Building 14">Building 14</MenuItem>
				    	<MenuItem eventKey="Building 18">Building 18</MenuItem>
				    	<MenuItem eventKey="Building 34">Building 34</MenuItem>
				    	<MenuItem eventKey="Building 36">Building 36</MenuItem>
				    	<MenuItem eventKey="Building 38">Building 38</MenuItem>
				    	<MenuItem eventKey="Building 56">Building 56</MenuItem>
				    	<MenuItem eventKey="Building 66">Building 66</MenuItem>
				    	<MenuItem eventKey="Green Building">Green Building</MenuItem>
				    	<MenuItem eventKey="Stata Center">Stata Center</MenuItem>
				    	<MenuItem eventKey="Maseeh Hall">Maseeh Hall</MenuItem>
				    	<MenuItem eventKey="McCormick Hall">McCormick Hall</MenuItem>
				    	<MenuItem eventKey="Baker House">Baker House</MenuItem>
				    	<MenuItem eventKey="Burton Connor">Burton Connor</MenuItem>
				    	<MenuItem eventKey="Macgregor House">Macgregor House</MenuItem>
				    	<MenuItem eventKey="New House">New House</MenuItem>
				    	<MenuItem eventKey="Next House">Next House</MenuItem>
				    	<MenuItem eventKey="Simmons House">Simmons House</MenuItem>
				    	<MenuItem eventKey="Tennis Courts">Tennis Courts</MenuItem>
				    	<MenuItem eventKey="Z Center">Z Center</MenuItem>
				    	<MenuItem eventKey="Kresge Auditorium">Kresge Auditorium</MenuItem>
				    	<MenuItem eventKey="Kresge Barbecue Pits">Kresge Barbecue Pits</MenuItem>
				    	<MenuItem eventKey="Stratton Student Center">Stratton Student Center</MenuItem>
				    </DropdownButton>

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