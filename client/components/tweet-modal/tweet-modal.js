'use strict';
const config = require('./config.json');

/**
 * TweetModalController
 */
class TweetModalController {
  constructor($scope, $element, $timeout, TweetService) {
    'ngInject';

    this._$scope = $scope;
    this._$element = $element;
    this._element = $element[0];
    this._$timeout = $timeout;
    this.TweetService = TweetService;

    this.tweetReplies = [];

    // this.TweetService.createTweet().then((tweet) => {
    //   this.tweetReplies.push(tweet);
    // });

    let fetchReply = () => {
      this.TweetService.createTweet().then((tweet) => {
        this.tweetReplies.push(tweet);

        if (this.tweetReplies.length < 5) {
          $timeout(fetchReply, 1000);
        }
      });
    };

    $timeout(fetchReply, 1000);
  }

  $onInit() {
    let $modal = $(this._element).find('.modal');

    // Bind modal events
    $modal.on('hidden.bs.modal', () => {
      this._$scope.$apply(() => {
        this.onClose();
      });
    });

    console.log(this.tweetReplies.length);
  }

  $postLink() {
    let $modal = $(this._element).find('.modal');

    // Open modal
    this._$timeout(() => {
      // $modal.modal({
      //   keyboard: false
      // });
      $modal.modal('show');
    }, 10);
  }

  $onDestroy() {
    let $modal = $(this._element).find('.modal');

    // Bind modal events
    $modal.off('hidden.bs.modal');
  }

  onTweetReply(tweet) {
    console.log(tweet);
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
