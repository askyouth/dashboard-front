'use strict';

/**
 * TweetsController
 */
class TweetsController {
  constructor($scope, $element, TweetService) {
    'ngInject';
    this._element = $element[0];
    this._$element = $element;
    this.TweetService = TweetService;
  }

  $onInit() {
    this.tweets = [];
    this.pendingTweets = [];

    this.$onTweetCreated = this.TweetService.subscribe('tweet:created', this.onContentCreated.bind(this));
    this.$onTweetInteraction = this.TweetService.subscribe('tweet:interaction', this.onContentCreated.bind(this));

    if (angular.isUndefined(this.composeContent)) {
      this.composeContent = true;
    }
  }

  $onDestroy() {
    this.$onTweetCreated();
    this.$onTweetInteraction();
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

  onContentCreated(event, tweet) {
    this.pendingTweets.unshift(tweet);
  }
};


module.exports = {
  templateUrl: 'views/timeline/timeline.html',
  controller: TweetsController,
  bindings: {
    composeContent: '<'
  }
};
