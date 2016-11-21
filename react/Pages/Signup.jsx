import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Signup extends Component {
	constructor(props) {
		super(props);
		// this.defaultProps = {
		// }
		this.state = {
			signupUser : '',
			signupPass : ''
		};
		this.updateFormVal = this.updateFormVal.bind(this);
		this.signupUser = this.signupUser.bind(this);
	}

	updateFormVal(event) {
		var updatedField = event.target.name;
		var updatedValue = event.target.value;
		this.setState((prevState) => {
			prevState[updatedField] = updatedValue;
			return prevState;
		})
	}

	signupUser() {
		this.props.signupUser(this.state.signupUser, this.state.signupPass);
	}

	render() {
	  	return ( 
	  		// <div>Signup!</div>
	  		<div className = 'container'>
                <div className = 'signup-title'>
                    Sign Up
                </div>
                <div className = 'form-group'>
                    <input className = 'form-control'
                        name = 'signupUser'
                        placeholder = 'Username'
                        value = {this.state.signupUser}
                        onChange = {this.updateFormVal}
                    />
                </div>
                <div className = 'form-group'>
                    <input className = 'form-control'
                        type = 'password'
                        name = 'signupPass'
                        placeholder = 'Password'
                        value = {this.state.signupPass}
                        onChange = {this.updateFormVal}
                    />
                </div>

                <button className = 'btn' onClick = {this.signupUser}> Sign Up </button>
            </div>
	  	)
	}
}

export default withRouter(Signup);