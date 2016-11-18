import Services from '../services';
// TODO import navbar???
import { Component } from 'react';
import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router';
// TODO import any services?

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            // TODO state
        };
        // TODO props
    }

    componentWillMount(){
        // TODO 
    }

    render(){
        return (
            // TODO 
        );
    }
};

App.propTypes = {
    children : React.PropTypes.any.isRequired
};

export default withRouter(App);
