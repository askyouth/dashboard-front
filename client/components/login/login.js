'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class LoginController {
  constructor($element, $state, AuthService, Notifications) {
    'ngInject';
    this._$state = $state;
    this._$element = $element;
    this._AuthService = AuthService;
    this._Notifications = Notifications;

    this.loginForm = {
      email: null,
      password: null
    };
  }

  auth() {
    this._AuthService.login(this.loginForm).then(() => {
      this._Notifications.success('Login successfully done!');
      this._$state.go('index');
    }).catch(() => {
      this._Notifications.error('Login failed');
    });
  }

  authTwitter() {

  }
};


module.exports = {
  templateUrl: 'views/login/login.html',
  controller: LoginController
};
