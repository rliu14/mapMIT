/* Lead author: Dora */

import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import eventServices from '../../services/eventServices';
import NavBar from '../Elements/Navbar.jsx';
import { Accordion, Panel } from 'react-bootstrap';


class MyEvents extends Component {
	constructor(props) {
		super(props);
		this.defaultProps = {
		}
		this.toCreateNewEvent = this.toCreateNewEvent.bind(this);
		this.toEditEvent = this.toEditEvent.bind(this);
		this.deleteEvent = this.deleteEvent.bind(this);
		this.state = {
			events: []
		}
	}

	// will get and display all events created by current user
	componentWillMount() {
		eventServices.getEventsByCreator(this.props.user)
			.then((resp) => {
				console.log('got events');
				console.log(resp.content.foundEvents);
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
  		console.log('HELLO');
  		eventServices.deleteEvent(eventID, this.props.user)
  			.then((resp) => {
  				console.log('the resp');
  				console.log(resp);
  				console.log(resp.success);
  				if(resp.success) {
  					console.log('here');
  					eventServices.getEventsByCreator(this.props.user)
						.then((resp) => {
							if(resp.success) {
								console.log('reset state');
								this.setState( { events: resp.content.foundEvents });
							};
						});
  				};
  			});
  	}

	render() {
		// var eventsList = events.map(function(mEvent) {
		// 	return <li>{mEvent}</li>
		// });
	  	return ( 
	  		<div>
	  			<NavBar
	                currentUser = {this.props.user}
	                logout = {this.props.logout}
	            />
	            <div className="events-container">
					<div className="events-panel panel panel-default">
	            		<div className="panel-body events-panel-body">
				  			<div className="events-header-row">
				  				<h2 className="my-events-header">My Upcoming Events</h2>
				  				<button type='button' className='btn btn-blue create-event-btn' onClick={this.toCreateNewEvent}>Create New Event</button>
				  			</div>
				  			<div>
				  				<Accordion>
				  				{this.state.events.map(function(mEvent) {
			  						return (
									    <Panel header={mEvent.name} eventKey={mEvent._id}>
									    	<div className="group-members-section">
			  									
				  							</div>
				  							<div className="add-group-member-section">
				  								<button type='button' className='btn btn-default' onClick={this.toEditEvent.bind(this, mEvent._id)}>Edit</button>
	  											<button type='button' className='btn btn-default' onClick={this.deleteEvent.bind(this, mEvent._id)}>Cancel Event</button>
							                </div>								    
			  							</Panel>
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