import { Component } from 'react';
import React from 'react';
import TweetFeed from '../Elements/TweetFeed.jsx'
export default class Profile extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        // Call the "fetchTweetsByUser" service to update this.props.tweets with fresh data,
        // use the parameter from the URL to determine what username we should call with
        var request = this.props.services.tweet.getTweetsByUser(this.props.params.username);
        this.props.updateTweets(request);
    }

    render(){
        return (
            <div className='container'>
                <div className='col-md-3' id='namebox'>
                    <h1>{ '@' + this.props.params.username }</h1>
                </div>
                <div className='col-md-6'>
                    <TweetFeed tweets={this.props.tweets} />
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    tweets : React.PropTypes.arrayOf(React.PropTypes.shape({
        creator : React.PropTypes.string.isRequired,
        content : React.PropTypes.string.isRequired,
        date : React.PropTypes.any.isRequired
    }))
};