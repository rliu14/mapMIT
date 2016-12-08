import React, { Component } from 'react';
import { IndexLink, Link, withRouter } from 'react-router';

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

	registerUser() {
		this.props.registerUser(this.state.registerUser, this.state.registerEmail, this.state.registerPass);
	}

	render() {
	  	return ( 
            <div className = 'container login-signup-container'>
                <div className="panel panel-default login-register-panel">
                    <div className="panel-body">
                        <img className="logo-img" src={require('../../public/img/logo.png')}/>

                        <div className = 'username-password-container form-group'>
                            <input className = 'form-control username-password-input'
                                name = 'registerUser'
                                placeholder = 'Username'
                                value = {this.state.registerUser}
                                onChange = {this.updateFormVal}
                            />
                        </div>
                        <div className = 'username-password-container form-group'>
                            <input className = 'form-control username-password-input'
                                name = 'registerEmail'
                                placeholder = 'MIT Email Address'
                                value = {this.state.registerEmail}
                                onChange = {this.updateFormVal}
                            />
                        </div>
                        <div className = 'username-password-container form-group'>
                            <input className = 'form-control username-password-input'
                                type = 'password'
                                name = 'registerPass'
                                placeholder = 'Password'
                                value = {this.state.registerPass}
                                onChange = {this.updateFormVal}
                            />
                        </div>

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