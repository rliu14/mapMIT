import React, { Component } from 'react';
import MapMIT from '../Elements/Map.jsx';
import Filtering from '../Elements/Filtering.jsx';
import EventTable from '../Elements/EventTable.jsx';


import { withRouter } from 'react-router';

class Homepage extends Component {
	constructor(props) {
		super(props);
		this.state = {
            events : []
		};
        this.updateEvents = this.updateEvents.bind(this);
	}

    updateEvents(request){
        request.then((response) => {
            console.log("BLAH HERES THE RESPONSE: " + response);
            this.setState({
                events : response.content.events
            })
        }).catch((err) => {
            alert("There was an error updating events: ", err);
        })
    }

    componentWillMount(){
        // Call the "getEventsByTime" service to update
        // this.props.events with events happening now
        var request = this.props.services.mEvent.getEventsByTime(Date.now());
        this.updateEvents(request);
        // this.props.services.mEvent.createEvent({});
    }

	render() {
      	return ( 
            <div id="homepage-container">
                <div id="homepage-left">
                    <Filtering />
                </div>
                <div id="homepage-right">
                    <MapMIT events = {this.state.events}/>
                    <EventTable events = {this.state.events}/>
                </div>
            </div>
      	)
	}
}

export default withRouter(Homepage);