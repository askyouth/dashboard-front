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

    this.signupForm = {
      name: null,
      email: null,
      password: null
    };
  }

  auth(form, $event) {
    if ($event) $event.preventDefault();


    if (form.$valid) {
      this._AuthService.login(this.loginForm).then(() => {
        this._Notifications.success('Login successfully done!');
        this._$state.go('index');
      }).catch(() => {
        this._Notifications.error('Login failed');
      });
    } else {
      this._Notifications.error('Login failed. Please enter all required data.');
    }
  }

  signup(form, $event) {
    if ($event) $event.preventDefault()

    if (form.$valid) {
      this.signupForm.confirmPassword = this.signupForm.password;

      this._AuthService.signup(this.signupForm).then(() => {
        this._Notifications.success('Account successfully created!');
        this._$state.go('index');
      }).catch((err) => {
        this._Notifications.error(err.data.message);
      })
    } else {
      this._Notifications.error('Sign up failed. Please enter all required data.');
    }
  }

  authTwitter() {

  }
};


module.exports = {
  templateUrl: 'views/login/login.html',
  controller: LoginController
};
