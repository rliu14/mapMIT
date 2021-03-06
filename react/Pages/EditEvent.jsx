/* Lead author: Dora */

import React, { Component } from 'react';
import NavBar from '../Elements/NavBar.jsx';
import EventEditor from '../Elements/EventEditor.jsx';
import { withRouter, browserHistory } from 'react-router';
import eventServices from '../../services/eventServices';

/**
* This page allows users to edit an event.
*/
class EditEvent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
		}
		this.updateEvent = this.updateEvent.bind(this);
	}

	updateEvent(form) {
		var content = {
			name: form.eventName,
			startTime: form.startTime,
			endTime: form.endTime,
			room: form.room,
			description: form.eventDescription,
			location: form.location, 
			locationDescription: form.locationDescription,
			host: form.host,
			creator: form.user,
			isPublic: form.isPublic,
			groupsVisibleTo: Array.from(form.checkedGroupIds)
		}
		eventServices.updateEvent(this.props.params.eventId, content)
			.then((resp) => {
				browserHistory.push('/myEvents');
			})
	}

	render() {
	  	return ( 
	  		<div>
                <NavBar
                    currentUser = {this.props.fullname}
                    logout = {this.props.logout}
                />
                <EventEditor onSubmit={this.updateEvent} user={this.props.user} fullname={this.props.fullname} buttonName={"Edit"} eventId={this.props.params.eventId}/>
		  	</div>
	  	)
	}
}

export default withRouter(EditEvent);