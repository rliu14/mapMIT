/* Lead author: Elysa */

import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import groupServices from '../../services/groupServices';
import update from 'react-addons-update';

class MyGroups extends Component {
	constructor(props) {
		super(props);
		this.defaultProps = {
		}
		this.createGroup = this.createGroup.bind(this);
		this.updateGroupName = this.updateGroupName.bind(this);
		this.getCreatorGroups = this.getCreatorGroups.bind(this);
		this.getMemberGroups = this.getMemberGroups.bind(this);

		this.addMemberToGroup = this.addMemberToGroup.bind(this);
		this.setBlankNewMemberInputs = this.setBlankNewMemberInputs.bind(this);
		this.updateNewMemberInput = this.updateNewMemberInput.bind(this);
		this.removeSelfFromGroup = this.removeSelfFromGroup.bind(this);
		this.state = {
			creatorGroups: [],
			memberGroups: [],
			groupName: '',
			newMemberInputs: {}
		}
	}

	componentWillMount() {
		this.getCreatorGroups();
		this.getMemberGroups();
		this.setBlankNewMemberInputs();
	};

	getCreatorGroups() {
		groupServices.getGroupsByCreator(this.props.user)
			.then((resp) => {
				if(resp.success) {
					this.setState( { creatorGroups: resp.content.foundGroups });
				}
			});
	}

	setBlankNewMemberInputs() {
		groupServices.getGroupsByCreator(this.props.user)
			.then((resp) => {
				if(resp.success) {
					var newMemberDict = resp.content.foundGroups.reduce(function(dict, group) {
						dict[group._id] = '';
						return dict;
					}, {});
					this.setState( { newMemberInputs: newMemberDict });
				}
			});
	}

	getMemberGroups() {
		groupServices.getGroupsWithMember(this.props.user)
			.then((resp) => {
				if(resp.success) {
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
				console.log('created group');
				console.log(this.state.groupName);
				console.log(this);
				this.setState( { groupName: '' } );
				this.getMemberGroups();
				this.getCreatorGroups();
			})
	}

	updateGroupName(event) {
		this.setState({
			groupName: event.target.value
		});
	}

	updateNewMemberInput(groupId, event) {
		var newDict = update(this.state.newMemberInputs, {$merge: {[groupId]: event.target.value}});
		this.setState({
			newMemberInputs: newDict
		});
	}

	addMemberToGroup(groupId, event) {
		var username = this.state.newMemberInputs[groupId];
		groupServices.addMemberToGroup(groupId, username)
			.then((resp) => {
				this.getCreatorGroups();
				var newDict = update(this.state.newMemberInputs, {$merge: {[groupId]: ''}});
				this.setState({
					newMemberInputs: newDict
				});
			});
	}

	removeSelfFromGroup(groupId, event) {
		var username = this.props.user;
		console.log('remoe');
		console.log(username);
		groupServices.removeMemberFromGroup(groupId, username)
			.then((resp) => {
				console.log('removed from group');
				this.getMemberGroups();
			});
	}

	render() {
	  	return ( 
	  		<div>
	  		<div>
	  			<h1>Groups I Own</h1>
	  			<div>
	  				{this.state.creatorGroups.map(function(group) {
	  					const groupId = group._id;
  						return (
  							<li key={group._id}>
  								{group.name}
  								{group.members.map(function(member) {
  									return (
  										<p key={member._id}>{member.username}</p>
  									)
  								})}
					  			<input key={groupId} type="text" className="form-control" value={this.state.newMemberInputs[groupId]} onChange={this.updateNewMemberInput.bind(this, groupId)}></input>
				  				<span className='input-group-btn'>
				                    <button type='button' className='btn btn-default' onClick={this.addMemberToGroup.bind(this, groupId)}>
				                        Create
				                    </button>
				                </span>
  							</li>
		  				)
		  			}, this)}
	  			</div>
	  			<h1>Create a Group</h1>
	  			<div>
		  			<input type="text" className="form-control" value={this.state.groupName} onChange={this.updateGroupName}></input>
	  				<span className='input-group-btn'>
	                    <button type='button' className='btn btn-default' onClick={this.createGroup}>
	                        Add
	                    </button>
	                </span>
	  			</div>
		  	</div>
		  	<div>
	  			<h1>My Groups</h1>
	  			<div>
	  				{this.state.memberGroups.map(function(group) {
  						return (
  							<li key={group._id}>
  								{group.name}
  								<span className='input-group-btn'>
				                    <button type='button' className='btn btn-default' onClick={this.removeSelfFromGroup.bind(this, group._id)}>
				                        Remove
				                    </button>
				                </span>
  							</li>
  						)
  					}, this)}
	  			</div>
		  	</div>
		  	</div>
	  	)
	}
}

export default withRouter(MyGroups);