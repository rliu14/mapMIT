/* Lead author: Elysa */

import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import groupServices from '../../services/groupServices';

class MyGroups extends Component {
	constructor(props) {
		super(props);
		this.defaultProps = {
		}
		this.createGroup = this.createGroup.bind(this);
		this.updateGroupName = this.updateGroupName.bind(this);
		this.getCreatorGroups = this.getCreatorGroups.bind(this);
		this.getMemberGroups = this.getMemberGroups.bind(this);

		this.state = {
			// creator: this.props.user,
			creatorGroups: [],
			memberGroups: [],
			groupName: ''
		}
	}

	componentWillMount() {
		this.getCreatorGroups();
		this.getMemberGroups();
	};

	getCreatorGroups() {
		groupServices.getGroupsByCreator(this.props.user)
			.then((resp) => {
				if(resp.success) {
					console.log('got creator groups');
					console.log(resp.content.foundGroups);
					this.setState( { creatorGroups: resp.content.foundGroups });
				}
			});
	}

	getMemberGroups() {
		groupServices.getGroupsWithMember(this.props.user)
			.then((resp) => {
				if(resp.success) {
					console.log('got member groups');
					console.log(resp.content.foundGroups);
					this.setState( { memberGroups: resp.content.foundGroups });
				}
			});		
	}

	createGroup() {
		var content =  {
			name: this.state.groupName,
			creator: this.props.user
		}
		groupServices.createGroup(content)
			.then((resp) => {
				this.setState = {
					groupName: '',
					// TODO update creator groups and member groups
				};
			})
	}

	updateGroupName(event) {
		this.setState({
			groupName: event.target.value
		});
	}



	render() {
	  	return ( 
	  		<div>
	  		<div>
	  			<h1>Groups I Own</h1>
	  			<div>
	  				{this.state.creatorGroups}
	  			</div>
	  			<h1>Create a Group</h1>
	  			<div>
		  			<input type="text" className="form-control" value={this.groupName} onChange={this.updateGroupName}></input>
	  				<span className='input-group-btn'>
	                    <button type='button' className='btn btn-default' onClick={this.createGroup}>
	                        Create
	                    </button>
	                </span>
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