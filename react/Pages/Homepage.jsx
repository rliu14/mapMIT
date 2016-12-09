import React, { Component } from 'react';
import MapMIT from '../Elements/Map.jsx';
import Filtering from '../Elements/Filtering.jsx';
import EventTable from '../Elements/EventTable.jsx';
import NavBar from '../Elements/Navbar.jsx';

import { withRouter } from 'react-router';

class Homepage extends Component {
	constructor(props) {
		super(props);
		this.state = {
            events : []
		};
        console.log('homepage');
        console.log(this.props);
        this.updateEvents = this.updateEvents.bind(this);
        this.onFilter = this.onFilter.bind(this);
	}

    updateEvents(request){
        request.then((response) => {
            this.setState({
                events : response.content.events
            })
        }).catch((err) => {
            alert("There was an error updating events: ", err);
        })
    }

    onFilter(filteredEvents) {
        this.setState({
            events : filteredEvents
        });
    };

    componentWillMount(){
        // Call the "getEventsByTime" service to update
        // this.props.events with events happening now
        var request = this.props.services.mEvent.getEventsByTime(Date.now());
        this.updateEvents(request);
        // this.props.services.mEvent.createEvent({});
        document.body.classList.remove('blue-background');
    }

	render() {
      	return ( 
            <div>
                <NavBar currentUser = {this.props.user}
                        logout = {this.props.logout}/>
                <div id="homepage-container">
                    <div id="homepage-left">
                        <Filtering onUpdate={this.onFilter} user={this.props.user}/>
                    </div>
                    <div className="panel panel-default" id="homepage-right">
                        <div className="panel-body">
                            <MapMIT events = {this.state.events}/>
                            <EventTable events = {this.state.events}/>
                        </div>
                    </div>
                </div>
            </div>
      	)
	}
}

export default withRouter(Homepage);