import { Component } from 'react';
import React from 'react';
import TweetFeed from '../Elements/TweetFeed.jsx';
import TweetForm from '../Elements/TweetForm.jsx';
import tweetServices from '../../services/tweetServices';

export default class YourFeed extends Component {
    constructor(props){
        super(props);
        this.deleteTweetFeed = this.deleteTweetFeed.bind(this);
    }

    componentWillMount(){
        // Call the "fetchFollowingTweets" service to update this.props.tweets with fresh data,
        // use the parameter from the URL to determine what username we should call with
        var request = this.props.services.tweet.getHomepage();
        this.props.updateTweets(request);

    }

    deleteTweetFeed(tweet_id){
      tweetServices.deleteTweet(tweet_id).then((resp) => {
          this.props.fetchAllTweets(true);
      });
    }

    render(){
        return (
            <div className='container'>
                <div className='col-md-3' id='namebox'>
                    <h1>Your Feed</h1>
                </div>
                <div className='col-md-6'>
                    <TweetForm onSubmit={this.props.addTweet}/>
                    <TweetFeed tweets={this.props.tweets} currentUser={this.props.user} deleteTweet={this.deleteTweetFeed} />
                </div>
            </div>
        )
    }
}

YourFeed.propTypes = {
    tweets : React.PropTypes.arrayOf(React.PropTypes.shape({
        creator : React.PropTypes.string.isRequired,
        content : React.PropTypes.string.isRequired,
        date : React.PropTypes.any.isRequired
    }))
};
