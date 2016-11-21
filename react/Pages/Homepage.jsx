import React, { Component } from 'react';
import MapMIT from '../Elements/Map.jsx';
import Filtering from '../Elements/Filtering.jsx';
import EventTable from '../Elements/EventTable.jsx';


import { withRouter } from 'react-router';

class Homepage extends Component {
	constructor(props) {
		super(props);
		this.defaultProps = {
            events : []
		};
        this.getEventsByTime = this.getEventsByTime.bind(this);
        this.updateEvents = this.updateEvents.bind(this);
	}

    updateEvents(request){
        request.then((response) => {
            console.log(response);
            this.setState({
                events : response.content.events
            })
        }).catch((err) => {
            alert("There was an error updating events: ", err);
        })
    }

    getEventsByTime(time){
        this.props.services.mEvent.getEventsByTime(time).then((resp) => {
            this.setState((prevState) => {
                prevState.events = resp.content.events;
                return prevState;
            });
        });
    }

    componentWillMount(){
        // Call the "getEventsByTime" service to update
        // this.props.events with events happening now
        console.log('componentWillMount');
        var request = this.getEventsByTime(Date.now());
        console.log(request);
        this.updateEvents(request);
    }

	render() {
        const rows = [
            ['a1', 'b1', 'c1'],
            ['a2', 'b2', 'c2'],
            ['a3', 'b3', 'c3'],
        ];
      	return ( 
            <div id="homepage-container">
                <div id="homepage-left">
                    <Filtering />
                </div>
                <div id="homepage-right">
                    <MapMIT />
                    <EventTable />
                </div>
            </div>
      	)
	}
}

export default withRouter(Homepage);