'use strict';
const config = require('./config.json');

/**
 * TweetModalController
 */
class TweetReplyModalController {
  constructor($scope, $element, $timeout) {
    'ngInject';

    this._$scope = $scope;
    this._$timeout = $timeout;
    this._$element = $element;
  }

  $onInit() {
    let $modal = this._$element.find('.modal');

    // Bind modal events
    $modal.on('hidden.bs.modal', () => {
      this._$scope.$apply(() => {
        this.onClose();
      });
    });
  }

  $postLink() {
    let $modal = this._$element.find('.modal');

    // Open modal
    this._$timeout(() => {
      $modal.modal('show');
    }, 10);
  }

  $onDestroy() {
    let $modal = this._$element.find('.modal');

    // Bind modal events
    (function () {
      $modal.modal('hide');
    }())
    $modal.off('hidden.bs.modal');
  }

};


module.exports = {
  templateUrl: 'views/tweet-reply-modal/tweet-reply-modal.html',
  controller: TweetReplyModalController,
  bindings: {
    tweet: '<',
    onClose: '&'
  }
};
