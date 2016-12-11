/* Lead author: Elysa */

import App from './App.jsx';
import CreateEvent from './Pages/CreateEvent.jsx';
import EditEvent from './Pages/EditEvent.jsx';
import Homepage from './Pages/Homepage.jsx';
import Login from './Pages/Login.jsx';
import MyEvents from './Pages/MyEvents.jsx';
import MyGroups from './Pages/MyGroups.jsx';
import NotFound from './Pages/NotFound.jsx';
import SignUp from './Pages/Signup.jsx';
import VerifyAccount from './Pages/VerifyAccount.jsx';

import services from '../services';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// authCheck will automatically redirect to the signup route
// if there's no current user.  Example implementation online:
// https://github.com/ReactTraining/react-router/blob/master/examples/auth-flow/auth.js

// const authCheck = (nextState, replace, callback) => {
//     services.user.getCurrentUser().then((response) => {
//         if (!response.content.loggedIn){
//             replace('/login');
//         }
//         callback();
//     }).catch((err) => {
//         console.log("Err on getCurrentUser() : ", err);
//         callback();
//     });
// };
// const authCheck = (nextState, replaceState, callback) => {
//   services.user.getCurrentUser().then((response) => {
//     if (!response.content.loggedIn) {
//       // console.log('next state pathname : ', nextState.location.pathname);
//       // this.replaceState({ nextPathname: nextState.location.pathname }, '/login');
//       replace('/login');
//       // callback();
//     }
//     callback();
//   }).catch(err) => {
//     console.log('Err on getCurrentUser() : ', err);
//     callback();
// });
const authCheck = (nextState, replace, callback) => {
  services.user.getCurrentUser().then((response) => {
    if (!response.content.loggedIn) {
      replace('/login');
    }
    callback();
  }).catch((err) => {
    console.log('Err on getCurrentUser() : ', err);
    callback();
  });
};

export default (
    <Router history={browserHistory} >
        <Route path='/' component={App}  >
            <IndexRoute component={Homepage} onEnter={authCheck} />
            <Route path="/signup"
                   component={SignUp} />
            <Route path="/login"
                   component={Login} />
            <Route path="/email-verification/:URL"
                   component={VerifyAccount} />
            <Route path="/myEvents"
                   component={MyEvents} />
            <Route path="/myEvents/edit/:eventId"
                   component={EditEvent} />
            <Route path="/myEvents/create"
                   component={CreateEvent} />
            <Route path="/myGroups"
                   component={MyGroups} />
            <Route path="*"
                   component={NotFound} />
        </Route>
    </Router>
); 
