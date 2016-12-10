import React, { Component } from 'react';
import MapMIT from '../Elements/Map.jsx';
import Filtering from '../Elements/Filtering.jsx';
import EventTable from '../Elements/EventTable.jsx';
import NavBar from '../Elements/Navbar.jsx';
import eventServices from '../../services/eventServices';
import groupServices from '../../services/groupServices';

import { withRouter } from 'react-router';

class Homepage extends Component {
	constructor(props) {
		super(props);
		this.state = {
            events : [],
            dataLoaded : false,
            groups : []
		};
        this.updateEvents = this.updateEvents.bind(this);
        this.getAllGroups = this.getAllGroups.bind(this);
        this.onFilter = this.onFilter.bind(this);
	}

    getAllGroups(callback) {
        if (this.props.user == undefined) {
            return;
        }
        this.props.services.group.getGroupsWithMember(this.props.user)
            .then((resp) => {
                this.setState({ groups: resp.content.foundGroups }, function() {
                    callback();
                });
            });
    }

    updateEvents(request){
        request.then((response) => {
            this.setState({
                events : response.content.filteredEvents,
                dataLoaded : true
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
        var x = this;
        this.getAllGroups(function() {
            var now = new Date();
            var content = { startTime: {$lt: now},
                            endTime: {$gt: now},
                            $or: [{groupsVisibleTo: {$in: x.state.groups} }, {isPublic: true}]};
            console.log("initial filter", content);
            var request = eventServices.getFilteredEvents(content);
            x.updateEvents(request);
        });
        document.body.classList.remove('blue-background');
    }

	render() {
      	return (
            <div>
            { this.state.dataLoaded && 
                <div>
                    <NavBar currentUser = {this.props.user}
                            logout = {this.props.logout}/>
                    <div id="homepage-container">
                        <div id="homepage-left">
                            <Filtering onUpdate={this.onFilter} groups={this.state.groups}/>
                        </div>
                        <div id="homepage-right">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <MapMIT events = {this.state.events}/>
                                    {<EventTable events = {this.state.events}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            </div>
      	)
	}
}

export default withRouter(Homepage);