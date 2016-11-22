import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import eventServices from '../../services/eventServices';
import createEventPage from './CreateEvent.jsx';

class MyEvents extends Component {
	constructor(props) {
		super(props);
		this.defaultProps = {
		}
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			creator: this.props.user,
			events: ['event1', 'event2']
		}
	}

	// componentWillMount() {
	// 	eventServices.getEventsByCreator(this.state.creator)
	// 		.then((resp) => {
	// 			if(resp.success) {
	// 				this.setState( { events: ['test', 'test'] });//resp.content.foundEvents });
	// 			}
	// 		});
	// };

	handleClick() {
    	browserHistory.push('/myEvents/create');
  	}

	render() {
	  	return ( 
	  		<div>
		  		<div className="header">
		  			<h1>Your Upcoming Events</h1>
		  			<div>
		  				{this.state.events.map((mEvent) =>
		  					<li key={mEvent}>
		  						{mEvent}
		  						<button type='button' className='btn btn-default'>Edit</button>
		  						<button type='button' className='btn btn-default'>Cancel Event</button>
							</li> 
		  				)}
		  			</div>
		  			
		  			<button type='button' className='btn btn-default' onClick={this.handleClick}>Create New Event</button>
		  		</div>

		  	</div>
	  	)
	}
}

export default withRouter(MyEvents);