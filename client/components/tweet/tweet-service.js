const transformContent = require('./tweet-transform.js');

class TweetService {
  constructor(Upload, ApiService, SocketConnection) {
    'ngInject';
    
    this.Upload = Upload;
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
    return this.Upload.upload({
      url: this.ApiService.$url('tweets'),
      data: data
    }).then(function (response) {
      let tweet = response.data;
      return transformContent(tweet);
    });
  }

  retweet(tweet) {
    return this.ApiService.post(`tweets/${tweet.id}/retweet`);
  }

  like(tweet) {
    return this.ApiService.post(`tweets/${tweet.id}/favorite`);
  }

  unlike(tweet) {
    return this.ApiService.post(`tweets/${tweet.id}/unfavorite`);
  }

}

module.exports = TweetService;