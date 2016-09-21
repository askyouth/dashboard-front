'use strict';
const config = require('./config.json');

/**
 * TweetController
 */
class TweetController {
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
  templateUrl: 'views/content/tweet.html',
  controller: TweetController
};
