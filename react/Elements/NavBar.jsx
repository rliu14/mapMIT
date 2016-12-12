/* Lead author: Casey */

import { Component } from 'react';
import React from 'react';
import { IndexLink, Link, withRouter } from 'react-router';

/**
* This component allows users to navigate between the homepage, my events page, and my groups page.
* It allows allows users to logout.
*/
class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
		this.defaultProps = {
			currentUser : 'Not Logged In'
		};
	}

	render() {
		var currentUserItem = (this.props.currentUser === undefined || this.props.currentUser === 'Not Logged In') ? null : (
			<span>Logged in as: {this.props.currentUser}</span>
		);

		var myEventsItem = this.props.currentUser === undefined ? null : (
				<IndexLink to = '/myevents' className = 'myevents'>My Events</IndexLink>
		);

		var myGroupsItem = this.props.currentUser === undefined ? null : (
				<IndexLink to = '/mygroups' className = 'mygroups'>My Groups</IndexLink>
		);


		var logoutItem = this.props.currentUser === undefined ? null : (
				<a className="logout-link" onClick={this.props.logout}>Log Out</a>
		);

		return (
			<nav className = 'navbar navbar-fixed-top'>

				<div id="navbar-left">
					<div id="home-link" className="navbar-item right-bar">
						<IndexLink to = '/' className = 'homepage'>Home</IndexLink>
					</div>
					<div id="user-events" className="navbar-item right-bar">
						{ myEventsItem }
					</div>
					<div id="user-groups" className="navbar-item">
						{ myGroupsItem }
					</div>	
				</div>	



				<div id="navbar-right">
					<div id="welcome-user" className="navbar-item">
						{ currentUserItem }
					</div>
					<div id="logout" className="navbar-item">
						{ logoutItem }
					</div>
				</div>
				<div id="navbar-center">
					<div className="navbar-item">
						<IndexLink to = '/' className = 'homepage'>
							<img className="navbar-logo-img" src='https://s3.amazonaws.com/mapmit/logo_white.png'/>
						</IndexLink>
					</div>
				</div>
			</nav>
		)
	}
};

NavBar.propTypes = {
	currentUser : React.PropTypes.any,
	logoutCallback : React.PropTypes.func
}

export default withRouter(NavBar);

