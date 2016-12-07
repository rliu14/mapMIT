import React, { Component } from 'react';
import { withRouter } from 'react-router';

class Login extends Component {
	constructor(props) {
		super(props);
		// this.defaultProps = {
		// }
		this.state = {
			loginEmail : '',
			loginPass : ''
		};
		this.updateFormVal = this.updateFormVal.bind(this);
		this.loginUser = this.loginUser.bind(this);
	}

	updateFormVal(event) {
		var updatedField = event.target.name;
		var updatedValue = event.target.value;
		this.setState((prevState) => {
			prevState[updatedField] = updatedValue;
			return prevState;
		})
	}

	loginUser() {
		this.props.loginUser(this.state.loginEmail, this.state.loginPass);
	}

	render() {
	  	return ( 
	  		// <div>Login!</div>
            <div className = 'container'>
                <div className = 'login-title'>
                    Login
                </div>
                <div className = 'form-group'>
                    <input className = 'form-control'
                        name = 'loginEmail'
                        placeholder = 'Email'
                        value = {this.state.loginEmail}
                        onChange = {this.updateFormVal}
                    />
                </div>
                <div className = 'form-group'>
                    <input className = 'form-control'
                        type = 'password'
                        name = 'loginPass'
                        placeholder = 'Password'
                        value = {this.state.loginPass}
                        onChange = {this.updateFormVal}
                    />
                </div>

                <button className = 'btn btn-default' onClick = {this.loginUser}> Login </button>
            </div>
	  	)
	}
}

export default withRouter(Login);