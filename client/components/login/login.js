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

  auth() {
    console.log('auth local');
  }

  authTwitter() {
    console.log('auth twitter');
  }
};


module.exports = {
  templateUrl: 'views/login/login.html',
  controller: LoginController
};
