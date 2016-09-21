'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class TopicsController {
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
  templateUrl: 'views/topics/topics.html',
  controller: TopicsController
};
