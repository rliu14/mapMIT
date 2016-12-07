import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Signup extends Component {
	constructor(props) {
		super(props);
		// this.defaultProps = {
		// }
		this.state = {
			registerUser : '',
			registerEmail : '',
			registerPass : ''
		};
		this.updateFormVal = this.updateFormVal.bind(this);
		this.registerUser = this.registerUser.bind(this);
	}

	updateFormVal(event) {
		var updatedField = event.target.name;
		var updatedValue = event.target.value;
		this.setState((prevState) => {
			prevState[updatedField] = updatedValue;
			return prevState;
		})
	}

	registerUser() {
		this.props.registerUser(this.state.registerUser, this.state.registerEmail, this.state.registerPass);
	}

	render() {
	  	return ( 
	  		// <div>Signup!</div>
	  		<div className = 'container'>
                <div className = 'signup-title'>
                    Register
                </div>
                <div className = 'form-group'>
                    <input className = 'form-control'
                        name = 'registerUser'
                        placeholder = 'Please enter your username'
                        value = {this.state.registerUser}
                        onChange = {this.updateFormVal}
                    />
                </div>
                <div className = 'form-group'>
                    <input className = 'form-control'
                        name = 'registerEmail'
                        placeholder = 'Please enter your MIT email address'
                        value = {this.state.registerEmail}
                        onChange = {this.updateFormVal}
                    />
                </div>
                <div className = 'form-group'>
                    <input className = 'form-control'
                        type = 'password'
                        name = 'registerPass'
                        placeholder = 'Please enter your password'
                        value = {this.state.registerPass}
                        onChange = {this.updateFormVal}
                    />
                </div>

                <button className = 'btn' onClick = {this.registerUser}> Sign Up </button>
            </div>
	  	)
	}
}

export default withRouter(Signup);