'use strict';
const config = require('./config.json');

/**
 * TweetsController
 */
class TweetsController {
  constructor($scope, $element, TweetTimelineService, PageService) {
    'ngInject';
    this._element = $element[0];
    this._$element = $element;
    this.PageService = PageService;
    this.TweetTimelineService = new TweetTimelineService(this.config);
  }

  $onInit() {
    this.tweets = [];
    this.pendingTweets = [];

    this.$onTweetFetch = this.TweetTimelineService.subscribe(config.events.TWEETS_FETCH, this.onContentFetched.bind(this));
    this.$onTweetNew = this.TweetTimelineService.subscribe(config.events.TWEETS_NEW, this.onContentCreated.bind(this));

    if (angular.isUndefined(this.composeContent)) {
      this.composeContent = true;
    }
  }

  $onDestroy() {
    this.$onTweetFetch();
    this.$onTweetNew();
  }

  selectTweet(tweet) {
    this.selectedTweet = tweet;
  }

  renderPendingTweets() {
    let renderLastTweet = () => {
      let tweet = this.pendingTweets.pop();

      if (tweet) {
        this.tweets.unshift(tweet);
      }

      if (this.pendingTweets.length) {
        renderLastTweet()
      }
    };

    if (this.pendingTweets.length) {
      renderLastTweet()
    }

    this.PageService.updateTweetCount(0);
  }

  loadMoreTweets() {
    let lastTweet = this.tweets[this.tweets.length - 1];

    if (lastTweet) {
      this.TweetTimelineService.loadMoreTweets({ maxId: lastTweet.id }).then((tweets) => {
        tweets.map((tweet) => {
          this.tweets.push(tweet);
        });
      })
    }
  }

  onContentFetched(event, tweets) {
    console.log(tweets)
    tweets.map((tweet) => {
      this.tweets.push(tweet);
    });
  }

  onContentCreated(event, tweet) {
    this.pendingTweets.unshift(tweet);
    this.PageService.updateTweetCount(this.pendingTweets.length);
  }
};


module.exports = {
  templateUrl: 'views/timeline/timeline.html',
  controller: TweetsController,
  bindings: {
    config: '<',
    composeContent: '<'
  }
};
