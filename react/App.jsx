/* Lead author: Elysa */

import Services from '../services';
import React from 'react';
import NavBar from './Elements/Navbar.jsx';
import { Component } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router';
import { render } from 'react-dom';

class App extends Component {
    constructor(props){ 
        super(props);
        this.state = {
            user : undefined,
        };
        this.loginUser = this.loginUser.bind(this);
        this.logout = this.logout.bind(this);
        this.registerUser = this.registerUser.bind(this);
        this.verifyAccount = this.verifyAccount.bind(this);

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
        Services.user.login(email, password)
            .then((res) => {
                if (res.success){
                    this.setState({user: res.content.user});
                    this.props.router.push('/');
                }
            }).catch((err) => {
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
                this.props.router.push('/login'); // what about /logout??
            }
        });
    }

    registerUser(fullname, email, password){
        console.log("appjsx fullname: ", fullname);
        console.log("appjsx email: ", email);
        console.log("appjsx password: ", password);
        Services.user.register(fullname, email, password).then((res) => {
            console.log("INSIDE THE REGISTRATION SERVICE CALL...");
            console.log(fullname);
            console.log(email);
            console.log(password);
            console.log(res);
            if (res.success){
                this.loginUser(email, password);
            } else {
                console.log("Error on register user: ",res.err);
            }
        });
    }

    verifyAccount(URL){
        Services.user.verifyAccount(URL).then((res) => {
            console.log(res.success);
            if (res.success) {
                console.log("what does this response object look like???");
                console.log(res);
                console.log(res.info.accepted[0]);
                // console.log(res.content.user);
                // this.setState({user: res.content.user});
                console.log("successful verification of account!!!", res.success);
                this.setState({ user : res.info.accepted[0] });
                this.props.router.push('/');
            } else {
                console.log("Error on verification of user: ", res.err);
            }
        });
    }

    render(){
        return (
            <div id="reactRoot">
                <div id='page-content'>
                    {React.cloneElement(this.props.children, {
                        services : Services,
                        user : this.state.user,
                        events : this.state.tweets,
                        loginUser : this.loginUser,
                        registerUser : this.registerUser,
                        logout : this.logout,
                        verifyAccount : this.verifyAccount
                    })}
                </div>
            </div>
        );
    }
}

export default withRouter(App);
