import App from './App.jsx';
import SignUp from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import Homepage from './Pages/Homepage.jsx';
import CreateEvent from './Pages/CreateEvent.jsx';
import EditEvent from './Pages/EditEvent.jsx';
import MyEvents from './Pages/MyEvents.jsx';
import services from '../services';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// authCheck will automatically redirect to the signup route
// if there's no current user.  Example implementation online:
// https://github.com/ReactTraining/react-router/blob/master/examples/auth-flow/auth.js
const authCheck = (nextState, replace, callback) => {
    services.user.getCurrentUser().then((response) => {
        if (!response.content.loggedIn){
            replace('/signup');
        }
        callback();
    }).catch((err) => {
        console.log("Err on getCurrentUser() : ", err);
        callback();
    });
};

export default (
    <Router history={browserHistory} >
        <Route path='/' component={App}  >
            <IndexRoute component={Homepage}
                        onEnter={authCheck} />
            <Route path="signup"
                   component={SignUp} />
            <Route path="login"
                   component={Login} />
            <Route path="events"
                   component={MyEvents}
                   onEnter={authCheck} />
            <Route path="events/edit"
                   component={EditEvent}
                   onEnter={authCheck} />
            <Route path="events/create"
                   component={CreateEvent}
                   onEnter={authCheck} />
            <Route path="*"
                   component={NotFound} />
        </Route>
    </Router>
);
