/* Lead author: Dora */

import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import NavBar from '../Elements/NavBar.jsx';
import EventEditor from '../Elements/EventEditor.jsx';
import eventServices from '../../services/eventServices';

class CreateEvent extends Component {
	constructor(props) {
		super(props);

		this.submitEvent = this.submitEvent.bind(this);

		// this.updateGroupSpecificVisibility = this.updateGroupSpecificVisibility.bind(this);
	};

	// creates event in the event database
	submitEvent(form) {
		var content =  {
			name: form.eventName,
			startTime: form.startTime,
			endTime: form.endTime,
			room: form.room,
			description: form.eventDescription,
			location: form.location, 
			locationDescription: form.locationDescription,
			host: form.host,
			creator: this.props.user,
			isPublic: form.isPublic,
			groupsVisibleTo: Array.from(form.checkedGroupIds)
		}
		eventServices.createEvent(content)
			.then((resp) => {
				browserHistory.push('/myEvents');
			})
	}

	render() {
		return (
			<div>
				<NavBar
					currentUser = {this.props.user}
					logout = {this.props.logout}
				/>
				<EventEditor onSubmit={this.submitEvent} user={this.props.user} buttonName={"Create"}/>
		    </div>
		)
	}
}

export default withRouter(CreateEvent);