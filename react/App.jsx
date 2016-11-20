import Services from '../services';
// TODO import navbar???
import { Component } from 'react';
import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class App extends Component {
    constructor(props){ 
        super(props);
        this.state = {
            user : undefined,
            events : []
        };
        this.loginUser = this.loginUser.bind(this);
        this.logout = this.logout.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    loginUser(username, password){
        Services.user.login(username, password)
            .then((res) => {
                if (res.success){
                    this.setState((prevState) => {
                        prevState.user = res.content.user;
                        return prevState;
                    });
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
                this.props.router.push('/signin');
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
                <div id='page-content'>
                    {React.cloneElement(this.props.children, {
                        services : Services,
                        user : this.state.user,
                        events : this.state.tweets,
                        loginUser : this.loginUser,
                        registerUser : this.registerUser,
                    })}
                </div>
            </div>
        );
    }
}

export default withRouter(App);
