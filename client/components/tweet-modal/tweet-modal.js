'use strict';
const config = require('./config.json');

/**
 * TweetModalController
 */
class TweetModalController {
  constructor($scope, $element, $timeout, TweetTimelineService) {
    'ngInject';

    this._$scope = $scope;
    this._$timeout = $timeout;
    this._$element = $element;
    this._element = $element[0];
    this.TweetService = new TweetTimelineService();

    this.tweetReplies = [];
    this.fetchTweetReplies();
  }

  $onInit() {
    let $modal = $(this._element).find('.modal');

    // Bind modal events
    $modal.on('hidden.bs.modal', () => {
      this._$scope.$apply(() => {
        this.onClose();
      });
    });
  }

  $postLink() {
    let $modal = $(this._element).find('.modal');

    // Open modal
    this._$timeout(() => {
      $modal.modal('show');
    }, 10);
  }

  $onDestroy() {
    console.log('destroy tweet-modal');
    let $modal = $(this._element).find('.modal');

    // Bind modal events
    (function () {
      $modal.modal('hide');
    }())
    $modal.off('hidden.bs.modal');
  }

  onTweetReply(tweet) {
    console.log(tweet);
  }

  onReplySelect(tweet) {
    this.tweet = null;
    this.tweetReplies.length = 0;

    // For now, we simulate load from API
    this._$timeout(() => {
      this.tweet = tweet;
      this.fetchTweetReplies();
    }, 2000);
  }

  onReplyToSelect(tweet) {
    this.onReplySelect(tweet);
  }

  fetchTweetReplies() {
    let fetchReply = () => {
      this.TweetService.createTweet().then((tweet) => {
        this.tweetReplies.push(tweet);

        if (this.tweetReplies.length < 5) {
          this._$timeout(fetchReply, 100);
        }
      });
    };

    this._$timeout(fetchReply, 100);
  }

};


module.exports = {
  templateUrl: 'views/tweet-modal/tweet-modal.html',
  controller: TweetModalController,
  bindings: {
    tweet: '<',
    onClose: '&'
  }
};
