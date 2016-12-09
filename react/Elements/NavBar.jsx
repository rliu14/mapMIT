/* Lead author: Casey */

import { Component } from 'react';
import React from 'react';
import { IndexLink, Link, withRouter } from 'react-router';

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

		console.log("props currentUser", this.props.currentUser);
		console.log("props", this.props);
		var currentUserItem = (this.props.currentUser === undefined || this.props.currentUser === 'Not Logged In') ? null : (
			<p>Logged in as: {this.props.currentUser}</p>
		);

		var myEventsItem = this.props.currentUser === undefined ? null : (
				<IndexLink to = '/myevents' className = 'myevents'>My Events</IndexLink>
		);

		var myGroupsItem = this.props.currentUser === undefined ? null : (
				<IndexLink to = '/mygroups' className = 'mygroups'>My Groups</IndexLink>
		);


		var logoutItem = this.props.currentUser === undefined ? null : (
				<a onClick={this.props.logout}>Log Out</a>
		);

		return (
			<nav className = 'navbar'>

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

				<div id="navbar-center">
					<div className="navbar-item">
						<img className="navbar-logo-img" src={require('../../public/img/logo_white.png')}/>
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
			</nav>
		)
	}
};

NavBar.propTypes = {
	currentUser : React.PropTypes.any,
	logoutCallback : React.PropTypes.func
}

export default withRouter(NavBar);

