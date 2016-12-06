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

    loginUser(username, password){
        Services.user.login(username, password)
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

    registerUser(username, password){
        Services.user.register(username, password).then((res) => {
            if (res.success){
                this.loginUser(username, password);
            } else {
                console.log("Error on register user: ",res.err)
            }
        });
    }

    render(){
        return (
            <div id="reactRoot">
                <NavBar
                    currentUser = {this.state.user}
                    logout = {this.logout}
                    services = {Services}
                />
                <div id='page-content'>
                    {React.cloneElement(this.props.children, {
                        services : Services,
                        user : this.state.user,
                        events : this.state.tweets,
                        loginUser : this.loginUser,
                        registerUser : this.registerUser,
                        logout : this.logout
                    })}
                </div>
            </div>
        );
    }
}

export default withRouter(App);
