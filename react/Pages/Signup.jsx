/* Lead author: Casey */

import React, { Component } from 'react';
import { IndexLink, Link, withRouter } from 'react-router';

/**
* This page allows the user to signup for mapMIT.
*/
class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			registerName : '',
			registerEmail : '',
			registerPass : '',
            inputErrorMsg : '',
            registerErrorMsg : '',
            registerStatusMsg : ''
		};
		this.updateFormVal = this.updateFormVal.bind(this);
		this.registerUser = this.registerUser.bind(this);
	}

    componentWillMount() {
        // this.props.resetErrorMessage();
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

    checkValidInput() {
        var result = []
        if (this.state.registerName == '') {
            result.push('Please enter your full name. ');
        };
        if (!(this.state.registerEmail.match('@mit.edu'))) {
            result.push('Please enter your MIT email. ')
        };
        if (!(this.state.registerPass.match('^[a-zA-z0-9]{5,16}$'))) {
            result.push('Your password must consist of 5-16 alphanumeric characters.');
        };
        return result;
    }

	registerUser() {
        var result = this.checkValidInput();
        if (result.length == 0) {
            var that = this;
            this.props.registerUser(this.state.registerName, this.state.registerEmail, this.state.registerPass, function(errMsg, statusMsg) {
                console.log('that');
                console.log(that);
                that.setState({ 
                    registerErrorMsg : errMsg,
                    registerStatusMsg : statusMsg,
                    inputErrorMsg : '' 
                });
            });
        } else {
            this.setState({ 
                inputErrorMsg : result,
                registerErrorMsg : '',
                registerStatusMsg : ''
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
                                name = 'registerName'
                                placeholder = 'Your Full Name'
                                value = {this.state.registerName}
                                onChange = {this.updateFormVal} />
                        </div>
                        <div className = 'username-password-container form-group'>
                            <input className = 'form-control username-password-input'
                                name = 'registerEmail'
                                placeholder = 'MIT Email Address'
                                value = {this.state.registerEmail}
                                onChange = {this.updateFormVal} />
                        </div>
                        <div className = 'username-password-container form-group'>
                            <input className = 'form-control username-password-input'
                                type = 'password'
                                name = 'registerPass'
                                placeholder = 'Password'
                                value = {this.state.registerPass}
                                onChange = {this.updateFormVal} />
                        </div>
                        {this.state.inputErrorMsg.length > 0 &&
                            <div>
                                <span className="red">{this.state.inputErrorMsg}</span>
                            </div>
                        }
                        {this.state.registerErrorMsg.length > 0 &&
                            <div>
                                <span className="red">{this.state.registerErrorMsg}</span>
                            </div>
                        }
                        {this.state.registerStatusMsg.length > 0 &&
                            <div>
                                <span>{this.state.registerStatusMsg}</span>
                            </div>
                        }
                        <button className = 'btn login-signup-btn' onClick = {this.registerUser}> Sign Up </button>
                        <div>
                            <span className='switch-login-register'>Already have an account? Login <IndexLink to = '/login' className = 'login-link'>here</IndexLink>.</span>
                        </div>
                    </div>
                </div>
            </div>
	  	)
	}
}

export default withRouter(Signup);