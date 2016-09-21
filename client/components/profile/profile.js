'use strict';
const config = require('./config.json');

/**
 * ProfileController
 */
class ProfileController {
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
  templateUrl: 'views/profile/profile.html',
  controller: ProfileController
};
