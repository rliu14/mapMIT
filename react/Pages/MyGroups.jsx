/* Lead author: Elysa */

import React, { Component } from 'react';
import { withRouter, browserHistory } from 'react-router';
import groupServices from '../../services/groupServices';
import NavBar from '../Elements/Navbar.jsx';
import { Accordion, Panel } from 'react-bootstrap';

class MyGroups extends Component {
	constructor(props) {
		super(props);
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
			newMemberInputs: {},
			addMemberErrorMsg: '',
			newMemberErrorMsgs: {}
		}
	}

	componentWillMount() {
		this.getCreatorGroups();
		this.getMemberGroups();
		this.setBlankNewMemberInputs();
        document.body.classList.remove('blue-background');
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
		groupServices.getGroupsWithMemberNotCreator(this.props.user)
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
		var input = event.target.value;
		this.setState((prevState) => {
            prevState.newMemberInputs[groupId] = input;
            return prevState;
        });
	}

	addMemberToGroup(groupId, event) {
		var username = this.state.newMemberInputs[groupId];
		groupServices.addMemberToGroup(groupId, username)
			.then((resp) => {
				console.log('resp');
				console.log(resp);
				this.getCreatorGroups();
				this.setState((prevState) => {
                    prevState.newMemberInputs[groupId] = '';
                    prevState.addMemberErrorMsg[groupId] = '';
                    return prevState;
                });
			}, (err) => {
				// console.log('err.error: ');
				// console.log(err.error.err);
				this.setState((prevState) => {
                    prevState.newMemberErrorMsgs[groupId] = err.error.err;
                    return prevState;
                });
				// this.setState({
				// 	addMemberErrorMsg: err.error.err
				// });
			});
	}

	removeSelfFromGroup(groupId, event) {
		var username = this.props.user;
		groupServices.removeMemberFromGroup(groupId, username)
			.then((resp) => {
				this.getMemberGroups();
			});
	}

	render() {
	  	return ( 
	  		<div>
	  			<NavBar currentUser = {this.props.fullname}
	                    logout = {this.props.logout} />
		  		<div id="my-groups-column-container">
			  		<div className="my-groups-column" id="my-groups-column-left">
			  			<div className="panel panel-default">
		            		<div className="panel-body groups-panel-body">
					  			<h2>Groups I Own</h2>
					  			<div>
					  				<Accordion>
					  				{this.state.creatorGroups.map(function(group) {
					  					const groupId = group._id;
				  						return (
										    <Panel header={group.name} eventKey={groupId}>
										    	<div className="group-members-section">
													<h5 className="members-header">Members</h5>
				  									<div className="group-members-list">
					  								{group.members.map(function(member) {
					  									return (
					  										<div className="group-member">
					  											<span key={member._id}>{member.fullname}</span>
					  										</div>
					  									)
					  								})}
					  								</div>	
					  							</div>
					  							<div className="add-group-member-section">
					  								<h5>Add a Member</h5>
										  			<input key={groupId} type="text" className="add-member-input form-control" value={this.state.newMemberInputs[groupId]} onChange={this.updateNewMemberInput.bind(this, groupId)} placeholder="email address"></input>
								                    <button type='button' className='btn btn-blue add-member-btn vertical-align-top' onClick={this.addMemberToGroup.bind(this, groupId)}>
								                        Add
								                    </button>
								                    {groupId in this.state.newMemberErrorMsgs &&
								                    	<span className="group-add-member-error-msg">{this.state.newMemberErrorMsgs[groupId]}</span>
								                    }
								                </div>								    
				  							</Panel>
						  				)
						  			}, this)}
									</Accordion>
					  			</div>
					  		</div>
					  	</div>
					  	<div className="panel panel-default">
		            		<div className="panel-body groups-panel-body">
					  			<h2>Create a Group</h2>
					  			<div>
						  			<input type="text" className="form-control create-group-name-input" value={this.state.groupName} onChange={this.updateGroupName} placeholder="group name"></input>
				                    <button type='button' className='btn btn-blue create-group-btn vertical-align-top' onClick={this.createGroup}>
				                        Create
				                    </button>
					  			</div>
					  		</div>
					  	</div>
				  	</div>
				  	<div className="my-groups-column" id="my-groups-column-right">
				  		<div className="panel panel-default">
		            		<div className="panel-body groups-panel-body">
					  			<h2>Groups I'm In</h2>
					  			<div>
					  				{this.state.memberGroups.map(function(group) {
				  						return (
				  							<div key={group._id} className="group-im-in">
				  								<div className="group-im-in-container">
				  									<h4 className="group-im-in-name">{group.name}</h4>
				  								</div>
				  								<button type='button' className='btn btn-default remove-from-group-btn' onClick={this.removeSelfFromGroup.bind(this, group._id)}>
								                    Remove Myself
								                </button>
			  								</div>
				  						)
				  					}, this)}
					  			</div>
					  		</div>
					  	</div>
				  	</div>
			  	</div>
		  	</div>
	  	)
	}
}

export default withRouter(MyGroups);