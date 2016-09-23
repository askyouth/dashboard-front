'use strict';
const config = require('./config.json');

/**
 * HandleController
 */
class HandleController {
  constructor($element) {
    'ngInject';
    this._element = $element[0];
    this._$element = $element;
  }

  $onInit() {

  }

  $onDestroy() {

  }
};


module.exports = {
  templateUrl: 'views/handle/handle.html',
  controller: HandleController
};
