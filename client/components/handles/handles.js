'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class HandlesController {
  constructor($element) {
    'ngInject';
    this._$element = $element;
    this.title = config.title;
  }

  $onInit() {

  }

  $onDestroy() {

  }
};


module.exports = {
  templateUrl: 'views/handles/handles.html',
  controller: HandlesController
};
