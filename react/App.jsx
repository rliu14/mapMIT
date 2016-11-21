import Services from '../services';
// TODO import navbar???
import { Component } from 'react';
import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

// TODO import any services?

class App extends Component {
    constructor(props){ 
        super(props);
        this.state = {
            user : undefined
        };
        this.loginUser = this.loginUser.bind(this);
        this.logout = this.logout.bind(this);
        this.signupUser = this.signupUser.bind(this);
    }

    loginUser(username, password) {
        Services.user.login(username, password).then((res) => {
            if (res.success) {
                this.setState((prevState) => {
                    prevState.user = res.content.user;
                    return prevState;
                });

                this.props.router.push('/');
            }
        }).catch((err) => {
            console.log('Login err: ', err.error.err);
        });
    }

    logout() {
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

    signupUser(username, password) {
        Services.user.register(username, password).then((res) => {
            if (res.success){
                this.loginUser(username, password);
            } else {
                console.log("Error on signing up user: ", res.err)
            }
        });
    }

    render() {
        return (
            <div>
                <div id='reactRoot'>
                    Test
                </div>
                <div id='page-content'>
                    {React.cloneElement(this.props.children, {
                        services : Services,
                        user : this.state.user,
                        loginUser : this.loginUser,
                        signupUser : this.signupUser
                    })}
                </div>
            </div>
        );
    }
}

export default withRouter(App);
