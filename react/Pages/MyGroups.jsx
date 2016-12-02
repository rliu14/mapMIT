/* Lead author: Elysa */

import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import groupServices from '../../services/groupServices';

class MyGroups extends Component {
	constructor(props) {
		super(props);
		this.defaultProps = {
		}
		// bind things?
		this.state = {
			// creator: this.props.user,
			creatorGroups: [],
			memberGroups: []
		}
	}

	componentWillMount() {
		groupServices.getGroupsByCreator(this.props.user)
			.then((resp) => {
				if(resp.success) {
					this.setState( { creatorGroups: resp.content.foundGroups });
				}
			});
		groupServices.getGroupsWithMember(this.props.user)
			.then((resp) => {
				if(resp.success) {
					this.setState( { memberGroups: resp.content.foundGroups });
				}
			});
	};



	render() {
	  	return ( 
	  		<div>
	  		<div>
	  			<h1>Groups I Own</h1>
	  			<div>
	  				{this.state.creatorGroups}
	  			</div>
		  	</div>
		  	<div>
	  			<h1>My Groups</h1>
	  			<div>
	  				{this.state.memberGroups}
	  			</div>
		  	</div>
		  	</div>
	  	)
	}
}

export default withRouter(MyGroups);