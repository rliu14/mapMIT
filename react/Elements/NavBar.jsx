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
			<p>Welcome, {this.props.currentUser}</p>
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
				<div className = 'container'>
					<ul>
						<div id="home-link">
							<li>
								<IndexLink to = '/' className = 'homepage'>MapMIT</IndexLink>
							</li>
						</div>
						<div id="welcome-user">
							<li>
								{ currentUserItem }
							</li>
						</div>
						<div id="user-events">
							<li>
								{ myEventsItem }
							</li>
						</div>
						<div id="user-groups">
							<li>
								{ myGroupsItem }
							</li>
						</div>
						<div id="logout">
							<li>
								{ logoutItem }
							</li>
						</div>
					</ul>
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

