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

  profileImage(image) {
    return image.replace('_normal', '');
  }
};


module.exports = {
  templateUrl: 'views/handle/handle.html',
  controller: HandleController,
  bindings: {
    handle: '='
  }
};
