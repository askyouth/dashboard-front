'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ForgotPasswordController {
  constructor($element, $state, AuthService, Notifications) {
    'ngInject';
    this._$state = $state;
    this._AuthService = AuthService;
    this._Notifications = Notifications;

    this.forgotPasswordForm = {
      email: null
    };
  }

  submitForgotPassword() {
    return this._AuthService.forgotPassword(this.forgotPasswordForm.email).then(() => {
      this.forgotPasswordForm.email = null;
      this._Notifications.success('Reset password email sent');
    }).catch(() => {
      this._Notifications.error('Reset password failed');
    })
  }
};


module.exports = {
  templateUrl: 'views/forgot-password/forgot-password.html',
  controller: ForgotPasswordController
};
