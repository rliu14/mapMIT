/* Lead author: Casey */

import React, { Component } from 'react';
import { IndexLink, Link, withRouter } from 'react-router';

/**
* This page allows the user to login.
*/
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginEmail : '',
			loginPass : '',
			errorMsg : ''
		};
		this.updateFormVal = this.updateFormVal.bind(this);
		this.loginUser = this.loginUser.bind(this);
	}

	componentWillMount() {
		document.body.classList.add('blue-background');
	}

	updateFormVal(event) {
		var updatedField = event.target.name;
		var updatedValue = event.target.value;
		this.setState((prevState) => {
			prevState[updatedField] = updatedValue;
			return prevState;
		})
	}

	// Check that the email and password fields are not empty and
	// that the email is an @mit.edu address
    checkValidInput() {
        if (this.state.loginEmail === '') {
            return 'Please enter a login email.'
        } else if (!(this.state.loginEmail.match('@mit.edu'))) {
            return 'Please enter your MIT email.';
        } else if (this.state.loginPass === '') {
            return 'Please enter your password.';
        } else {
        	return '';
        }
    }

	loginUser() {
        var result = this.checkValidInput();
        if (result.length === 0) {
            var that = this;
			// Call the service to login user and display the resulting
            // error if an error occurs		
            this.props.loginUser(this.state.loginEmail, this.state.loginPass, function(errMsg) {
				that.setState({
					errorMsg: errMsg
				});
			});
        } else {
        	// Inputs not valid, display error
            this.setState({ 
                errorMsg : result
            });
        }
	}

	render() {
	  	return ( 
            <div className = 'container login-signup-container'>
	            <div className="panel panel-default login-register-panel">
		            <div className="panel-body">
		            	<img className="logo-img" src='https://s3.amazonaws.com/mapmit/logo.png'/>
		                <div className = 'username-password-container form-group'>
		                    <input className = 'form-control username-password-input'
		                        name = 'loginEmail'
		                        placeholder = 'Email'
		                        value = {this.state.loginEmail}
		                        onChange = {this.updateFormVal} />
		                </div>
		                <div className = 'username-password-container form-group'>
		                    <input className = 'form-control username-password-input'
		                        type = 'password'
		                        name = 'loginPass'
		                        placeholder = 'Password'
		                        value = {this.state.loginPass}
		                        onChange = {this.updateFormVal} />
		                </div>
		                {this.state.errorMsg.length > 0 &&
			                <div>
			                	<span className="red">{this.state.errorMsg}</span>
			                </div>
			            }
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