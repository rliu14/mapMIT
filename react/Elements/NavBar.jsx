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
		var currentUserItem = this.props.currentUser === undefined ? null : (
			<li>
				<Link to={'/users/'+this.props.currentUser}>Welcome, {this.props.currentUser}</Link>
			</li>	
		);

		var logoutItem = this.props.currentUser === undefined ? null : (
			<li>
				<a onClick = {this.props.logout}>Log Out</a>
			</li>
		);

		return (
			<nav className = 'navbar'>
				<div className = 'container'>
					<ul>
						<li>
							<IndexLink to = '/' className = 'homepage'>MapMIT</IndexLink>
						</li>
						<li>
							{ currentUserItem }
							{ logoutItem }
						</li>
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

