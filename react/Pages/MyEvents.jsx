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
			creator: this.props.user,
			events: []
		}
	}

	componentWillMount() {
		console.log('GETTING EVENT');
		console.log(this.state.creator);
		eventServices.getEventsByCreator(this.state.creator)
			.then((resp) => {
				console.log(resp.content);
				if(resp.success) {
					this.setState( { events: resp.content.foundEvents });
				}
			});
	};

	toCreateNewEvent() {
    	browserHistory.push('/myEvents/create');
  	}

  	//TODO: INCORPORATE EVENT ID
  	toEditEvent(eventID) {
  		browserHistory.push('/myEvents/edit');
  		// browserHistory.push('/myEvents/edit/:eventID')
  	}
  	
  	deleteEvent(eventID) {
  		eventServices.deleteEvent(eventID)
  			.then((resp) => {
  				if(resp.success) {
  					browserHistory.push('/myEvents');
  				};
  			});
  	}

	render() {
		var events = this.state.events;
		console.log('events');
		console.log(events);
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
		  								<button type='button' className='btn btn-default' onClick={this.toEditEvent}>Edit</button>
		  								<button type='button' className='btn btn-default' onClick={this.deleteEvent}>Cancel Event</button>
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