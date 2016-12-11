/* Lead author: Dora */

import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import eventServices from '../../services/eventServices';
import NavBar from '../Elements/Navbar.jsx';
import { Accordion, Panel } from 'react-bootstrap';
import timeUtils from '../../utils/timeUtils';

/**
* This page allows the user to view all their events.
* The user can edit, cancel, or create an event.
*/
class MyEvents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			events: []
		}		
		this.toCreateNewEvent = this.toCreateNewEvent.bind(this);
		this.toEditEvent = this.toEditEvent.bind(this);
		this.deleteEvent = this.deleteEvent.bind(this);
        this.getTimeString = timeUtils.getTimeString.bind(this);
	}

	// will get and display all events created by current user
	componentWillMount() {
		eventServices.getEventsByCreator(this.props.user)
			.then((resp) => {
				if(resp.success) {
					this.setState( { events: resp.content.foundEvents });
				}
			});
        document.body.classList.remove('blue-background');
	};

	toCreateNewEvent() {
    	browserHistory.push('/myEvents/create');
  	}

  	toEditEvent(eventID) {
  		browserHistory.push('/myEvents/edit/' + eventID)
  	}
  	
  	deleteEvent(eventID) {
  		eventServices.deleteEvent(eventID, this.props.user)
  			.then((resp) => {
  				if(resp.success) {
  					eventServices.getEventsByCreator(this.props.user)
						.then((resp) => {
							if(resp.success) {
								this.setState( { events: resp.content.foundEvents });
							};
						});
  				};
  			});
  	}

	render() {
	  	return ( 
	  		<div>
	  			<NavBar currentUser = {this.props.fullname}
	                    logout = {this.props.logout} />
	            <div className="events-container">
					<div className="events-panel panel panel-default">
	            		<div className="panel-body events-panel-body">
				  			<div className="events-header-row">
				  				<h2 className="my-events-header">My Events</h2>
				  				<button type='button' className='btn btn-blue create-event-btn' onClick={this.toCreateNewEvent}>Create New Event</button>
				  			</div>
				  			<div>
				  				<Accordion>
				  				{this.state.events.map(function(event) {
			  						return (
			  							<div className="panel panel-default my-event-panel"> 
		                                    <div className="panel-heading">
		                                        <span className="bold bigger-text">{event.name}</span>
		                                        <div className="edit-cancel-event-btn-container">
					  								<button type='button' className='btn btn-default edit-event-btn' onClick={this.toEditEvent.bind(this, event._id)}>Edit Event</button>
		  											<button type='button' className='btn btn-default cancel-event-btn' onClick={this.deleteEvent.bind(this, event._id)}>Cancel Event</button>
								                </div>	
		                                    </div>
		                                    <div className="panel-body">
		                                        <div>
		                                            <span className="italic">Host:</span> {event.host}
		                                        </div>
		                                        {event.description.length > 0 &&
		                                            <div>
		                                                <span className="italic">Description:</span> {event.description}
		                                            </div>
		                                        }
		                                        <div>
		                                            <span className="italic">Time:</span> {this.getTimeString(event.startTime, event.endTime)}
		                                        </div>
		                                        <div>
		                                            <span className="italic">Location:</span> {event.location.name}
		                                            {event.room.length > 0 &&
		                                                <span>, Room {event.room}</span>
		                                            }
		                                        </div>
		                                        {event.locationDescription.length > 0 &&
		                                            <div>
		                                                <span className="italic">Location description:</span> {event.locationDescription}
		                                            </div>
		                                        }
		                                    </div>
		                                </div>
					  				)
					  			}, this)}
								</Accordion>
				  			</div>
				  		</div>
		  			</div>
		  		</div>
		  	</div>
	  	)
	}
}

export default withRouter(MyEvents);