'use strict';
const config = require('./config.json');

/**
 * TweetsController
 */
class TweetsController {
  constructor($scope, $element, TweetTimelineService) {
    'ngInject';
    this._element = $element[0];
    this._$element = $element;
    this.TweetService = new TweetTimelineService();
  }

  $onInit() {
    this.tweets = [];
    this.pendingTweets = [];

    this.$onTweetFetch = this.TweetService.subscribe(config.events.TWEETS_FETCH, this.onContentFetched.bind(this));
    this.$onTweetNew = this.TweetService.subscribe(config.events.TWEETS_NEW, this.onContentCreated.bind(this));

    if (angular.isUndefined(this.composeContent)) {
      this.composeContent = true;
    }
  }

  $onDestroy() {
    this.$onTweetFetch();
    this.$onTweetNew();
  }

  selectTweet(tweet) {
    console.log('select tweet');
    this.selectedTweet = tweet;
  }

  onTweetModalClose() {
    console.log('modal close');
    this.selectedTweet = null;
  }

  renderPendingTweets() {
    let renderLastTweet = () => {
      let tweet = this.pendingTweets.pop();
      if (tweet) {
        this.tweets.push(tweet);
      }

      if (this.pendingTweets.length) {
        renderLastTweet()
      }
    };

    if (this.pendingTweets.length) {
      renderLastTweet()
    }
  }

  onContentFetched(event, tweets) {
    console.log(tweets)
    tweets.map((tweet) => {
      this.tweets.push(tweet);
    });
  }

  onContentCreated(event, tweet) {
    this.pendingTweets.push(tweet);
  }
};


module.exports = {
  templateUrl: 'views/timeline/timeline.html',
  controller: TweetsController,
  bindings: {
    composeContent: '<'
  }
};
