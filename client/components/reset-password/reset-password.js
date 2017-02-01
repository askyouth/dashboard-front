'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ResetPasswordController {
  constructor($element, $state, $stateParams, AuthService, Notifications) {
    'ngInject';
    this._$state = $state;
    this._$stateParams = $stateParams;
    this._AuthService = AuthService;
    this._Notifications = Notifications;

    this.resetPasswordForm = {
      password: null,
      confirmPassword: null
    };
  }

  submitResetPassword() {
    let data = {
      user: this._$stateParams.user_id,
      token: this._$stateParams.token,
      password: this.resetPasswordForm.password,
      confirmPassword: this.resetPasswordForm.confirmPassword
    };

    return this._AuthService.resetPassword(data).then(() => {
      this.resetPasswordForm.password = null;
      this.resetPasswordForm.confirmPassword = null;

      this._Notifications.success('Password successfully changed');
      this._$state.go('index');
    }).catch((err) => {
      this._Notifications.showList('error', err);
    })
  }
};


module.exports = {
  templateUrl: 'views/reset-password/reset-password.html',
  controller: ResetPasswordController
};
