'use strict';
const config = require('./config.json');

/**
 * ProfileController
 */
class ProfileController {
  constructor($element, AuthService, ProfileService, Notifications) {
    'ngInject';
    this._$element = $element;
    this._AuthService = AuthService;
    this._ProfileService = ProfileService;
    this._Notifications = Notifications;
  }

  $onInit() {
    this.currentProfile = this._AuthService.currentProfile();
    this.profileForm = {
      name: this.currentProfile.name,
      currentPassword: null,
      password: null,
      confirmPassword: null
    };
  }

  $onDestroy() {

  }

  updateProfile() {
    this._ProfileService.update(this.profileForm).then(() => {
      this._resetProfileForm();
      this._Notifications.success('Profile updated');
    }).catch((err) => {
      if (angular.isArray(err)) {
        angular.forEach(err, (errMessage) => {
          this._Notifications.error(errMessage);
        });
      } else {
        this._Notifications.error('Profile update failed.');
      }
    });
  }

  _resetProfileForm() {
    this.profileForm.currentPassword = null;
    this.profileForm.password = null;
    this.profileForm.confirmPassword = null;
  }
};


module.exports = {
  templateUrl: 'views/profile/profile.html',
  controller: ProfileController
};
