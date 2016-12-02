/* Lead author: Dora */

import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import eventServices from '../../services/eventServices';

class MyEvents extends Component {
	constructor(props) {
		super(props);
		this.defaultProps = {
		}
		this.toCreateNewEvent = this.toCreateNewEvent.bind(this);
		this.toEditEvent = this.toEditEvent.bind(this);
		this.deleteEvent = this.deleteEvent.bind(this);
		this.state = {
			creator: this.props.user, // TODO elysa has a question about this dora
			events: []
		}
	}

	// will get and display all events created by current user
	componentWillMount() {
		eventServices.getEventsByCreator(this.state.creator)
			.then((resp) => {
				console.log('got events');
				console.log(resp.content.foundEvents);
				if(resp.success) {
					this.setState( { events: resp.content.foundEvents });
				}
			});
	};

	toCreateNewEvent() {
    	browserHistory.push('/myEvents/create');
  	}

  	toEditEvent(eventID) {
  		browserHistory.push('/myEvents/edit/' + eventID)
  	}
  	
  	deleteEvent(eventID) {
  		console.log('HELLO');
  		eventServices.deleteEvent(eventID)
  			.then((resp) => {
  				console.log('the resp');
  				console.log(resp);
  				console.log(resp.success);
  				if(resp.success) {
  					console.log('here');
  					eventServices.getEventsByCreator(this.state.creator)
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
		  		<div className="header">
		  			<h1>Your Upcoming Events</h1>
		  			<div>
		  					{this.state.events.map(function(mEvent) {
		  						return (
		  							<li key={mEvent._id}>
		  								{mEvent.name}
		  								<button type='button' className='btn btn-default' onClick={this.toEditEvent.bind(this, mEvent._id)}>Edit</button>
		  								<button type='button' className='btn btn-default' onClick={this.deleteEvent.bind(this, mEvent._id)}>Cancel Event</button>
		  							</li>
		  						)
		  					}, this)}
		  				
		  			</div>
		  			
		  			<button type='button' className='btn btn-default' onClick={this.toCreateNewEvent}>Create New Event</button>
		  		</div>

		  	</div>
	  	)
	}
}

export default withRouter(MyEvents);