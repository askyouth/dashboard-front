'use strict';

/**
 * TweetController
 */
class TweetMediaController {
  constructor($element) {
    'ngInject';
    this._$element = $element;
  }

  $onInit() {

  }

  $onDestroy() {

  }
};


module.exports = {
  template: `
    <div class="tweet-media">
      <div class="tweet-media__item" ng-repeat="media in $ctrl.tweet.entities.media">
        <img class="tweet-media__image" ng-src="{{media.media_url_https}}">
      </div>
    </div>
  `,
  controller: TweetMediaController,
  bindings: {
    tweet: '='
  }
};
