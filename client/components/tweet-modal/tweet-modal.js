'use strict';
const config = require('./config.json');

/**
 * TweetModalController
 */
class TweetModalController {
  constructor($scope, $element, $timeout, TweetService) {
    'ngInject';

    this._$scope = $scope;
    this._$timeout = $timeout;
    this._$element = $element;
    this.TweetService = TweetService;
  }

  $onInit() {
    let $modal = this._$element.find('.modal');

    this.loadTweet(this.tweetId).then((tweet) => {
      // Open modal
      this._$timeout(() => {
        $modal.modal('show');
      }, 10);
    });

    // Bind modal events
    $modal.on('hidden.bs.modal', () => {
      this._$scope.$apply(() => {
        this.onClose();
      });
    });
  }

  $postLink() {
    let $modal = this._$element.find('.modal');
  }

  $onDestroy() {
    let $modal = this._$element.find('.modal');

    // Bind modal events
    (function () {
      $modal.modal('hide');
    }())
    $modal.off('hidden.bs.modal');
  }

  loadTweet(tweetId) {
    return this.TweetService.find(tweetId).then((tweet) => {
      console.log('tweet loaded', tweet.id);
      
      this.tweet = tweet;
      this.parentTweet = tweet.parent;
      this.tweetReplies = tweet.replies;

      return tweet;
    });
  }

  onTweetReply(tweet) {
    
  }

  onReplySelect(tweet) {
    this.tweet = null;
    this.parentTweet = null;
    this.tweetReplies.length = 0;

    this.loadTweet(tweet.id);
  }

  onReplyToSelect(tweet) {
    this.onReplySelect(tweet);
  }

};


module.exports = {
  templateUrl: 'views/tweet-modal/tweet-modal.html',
  controller: TweetModalController,
  bindings: {
    tweetId: '=',
    onClose: '&'
  }
};
