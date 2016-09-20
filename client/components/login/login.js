'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class LoginController {
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
  templateUrl: 'views/login/login.html',
  controller: LoginController
};
