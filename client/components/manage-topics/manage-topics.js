'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ManageTopicsController {
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
  templateUrl: 'views/manage-topics/manage-topics.html',
  controller: ManageTopicsController,
  bindings: {
    topics: '='
  }
};
