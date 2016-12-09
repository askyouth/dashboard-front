'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class IndexController {
  constructor($element) {
    'ngInject';
    this._$element = $element;
  }

  $onInit() {
    
  }

  $onDestroy() {

  }

  selectTweet() {

  }
};


module.exports = {
  templateUrl: 'views/index/index.html',
  controller: IndexController
};
