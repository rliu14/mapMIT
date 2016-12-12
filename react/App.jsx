/* Lead author: Elysa, Casey
 * Modeled on fritter-react by 6.170 TAs 
 */

import Services from '../services';
import React from 'react';
import { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router';
import { render } from 'react-dom';

class App extends Component {
    constructor(props){ 
        super(props);
        this.state = {
            user : undefined,
            fullname: undefined,
            loginRegisterErrorMsg: ''
        };
        this.loginUser = this.loginUser.bind(this);
        this.logout = this.logout.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.verifyAccount = this.verifyAccount.bind(this);
        this.resetErrorMessage = this.resetErrorMessage.bind(this);
    }

    componentWillMount() {
        Services.user.getCurrentUser().then((res) => {
            if (res.content.loggedIn) {
                this.setState((prevState) => {
                    prevState.user = res.content.user;
                    return prevState;
                })
            }
        });
    }

    loginUser(email, password){
        console.log('Logging in...');
        Services.user.login(email, password)
            .then((res) => {
                if (res.success){
                    this.setState({
                        user: res.content.email,
                        fullname: res.content.fullname,
                        loginRegisterErrorMsg: ''
                    });
                    this.props.router.push('/');
                }
            }, (err) => {
                console.log('err');
                console.log(err);
                this.setState({
                    loginRegisterErrorMsg: err.error.err.msg
                });
                console.log("Login err: ", err.error.err);
            });
    }

    logout(){
        Services.user.logout().then((res) => {
            if (res.success){
                this.setState((prevState) => {
                    prevState.user = 'Not Logged In';
                    return prevState;
                });
                this.props.router.push('/login');
            }
        });
    }

    registerUser(fullname, email, password){
        Services.user.register(fullname, email, password).then((res) => {
            if (res.success){
                this.loginUser(email, password);
            } else {
                console.log("Error on register user: ", res.err);
            }
        });
    }

    verifyAccount(URL){
        Services.user.verifyAccount(URL).then((res) => {
            if (res.success) {
                this.setState({ user : res.info.accepted[0] });
            } else {
                console.log("Error on verification of user: ", res.err);
            }
        });
    }

    resetErrorMessage() {
        this.setState({
            loginRegisterErrorMsg: ''
        });    
    }

    render(){
        return (
            <div id="reactRoot">
                <div id='page-content'>
                    {React.cloneElement(this.props.children, {
                        services : Services,
                        user : this.state.user,
                        fullname : this.state.fullname,
                        events : this.state.tweets,
                        loginUser : this.loginUser,
                        registerUser : this.registerUser,
                        logout : this.logout,
                        verifyAccount : this.verifyAccount,
                        loginRegisterErrorMsg : this.state.loginRegisterErrorMsg,
                        resetErrorMessage : this.resetErrorMessage
                    })}
                </div>
            </div>
        );
    }
}

export default withRouter(App);
