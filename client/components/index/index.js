'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class IndexController {
  constructor($element, AnalyticsService) {
    'ngInject';
    this._$element = $element;
    this._AnalyticsService = AnalyticsService;
  }

  $onInit() {

    this._AnalyticsService.topTweeters().then((tweeters) => {
      console.log('tt', tweeters);
    });
    
  }

  $onDestroy() {

  }

  selectTweet() {
    console.log('tweet selected');
  }
};


module.exports = {
  templateUrl: 'views/index/index.html',
  controller: IndexController
};
