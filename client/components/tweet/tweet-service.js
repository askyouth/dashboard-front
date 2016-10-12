const transformContent = require('./tweet-transform.js');

class TweetService {
  constructor(ApiService, SocketConnection) {
    'ngInject';
    
    this.ApiService = ApiService;
    this.SocketConnection = SocketConnection;
  }

  list(params) {
    return this.ApiService.get(`tweets`, { params: params }).then((response) => {
      let tweets = response.data;
      return tweets.map(transformContent);
    });
  }

  find(tweetId) {
    return this.ApiService.get(`tweets/${tweetId}`).then((response) => {
      let tweet = response.data;
      transformContent(tweet);

      if (tweet.parent) {
        transformContent(tweet.parent);
      }

      if (tweet.replies) {
        tweet.replies.map(function (replyTweet) {
          transformContent(replyTweet);
        })
      }

      return tweet;
    });
  }

  create(data) {

  }

}

module.exports = TweetService;