import React, { Component } from 'react';
import { IndexLink, Link, withRouter } from 'react-router';

class Login extends Component {
	constructor(props) {
		super(props);
		// this.defaultProps = {
		// }
		this.state = {
			loginUser : '',
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
		this.props.loginUser(this.state.loginUser, this.state.loginPass);
	}

	render() {
	  	return ( 
            <div className = 'container login-signup-container'>
	            <div className="panel panel-default login-register-panel">
		            <div className="panel-body">
		            	<img className="logo-img" src={require('../../public/img/logo.png')}/>

		                <div className = 'username-password-container form-group'>
		                    <input className = 'form-control username-password-input'
		                        name = 'loginUser'
		                        placeholder = 'Username'
		                        value = {this.state.loginUser}
		                        onChange = {this.updateFormVal}
		                    />
		                </div>
		                <div className = 'username-password-container form-group'>
		                    <input className = 'form-control username-password-input'
		                        type = 'password'
		                        name = 'loginPass'
		                        placeholder = 'Password'
		                        value = {this.state.loginPass}
		                        onChange = {this.updateFormVal}
		                    />
		                </div>

		                <button className = 'btn btn-default login-signup-btn' onClick = {this.loginUser}> Login </button>
		                <div>
		                	<span className='switch-login-register'>Don't have an account yet? Sign up <IndexLink to = '/signup' className = 'signup-link'>here</IndexLink>.</span>
		                </div>
		            </div>
	            </div>
            </div>
	  	)
	}
}

export default withRouter(Login);