'use strict';

/**
 * IndexController
 */
class SetPasswordController {
  constructor($element, $state, $stateParams, AuthService, Notifications) {
    'ngInject';
    this._$state = $state;
    this._$stateParams = $stateParams;
    this._AuthService = AuthService;
    this._Notifications = Notifications;

    this.setPasswordForm = {
      password: null,
      confirmPassword: null
    };
  }

  submitSetPassword() {
    let data = {
      user: this._$stateParams.user_id,
      token: this._$stateParams.token,
      password: this.setPasswordForm.password,
      confirmPassword: this.setPasswordForm.confirmPassword
    };

    return this._AuthService.resetPassword(data).then(() => {
      this.setPasswordForm.password = null;
      this.setPasswordForm.confirmPassword = null;

      this._Notifications.success('Password successfully set');
      this._$state.go('index');
    }).catch((err) => {
      this._Notifications.showList('error', err);
    })
  }
};


module.exports = {
  templateUrl: 'views/set-password/set-password.html',
  controller: SetPasswordController
};
