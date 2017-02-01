'use strict';
const config = require('./config.json');

/**
 * ProfileController
 */
class ProfileController {
  constructor($element, AuthService, ProfileService, SettingsService, Notifications) {
    'ngInject';
    this._$element = $element;
    this._AuthService = AuthService;
    this._ProfileService = ProfileService;
    this._SettingsService = SettingsService;
    this._Notifications = Notifications;

    this.enableSignup = this.settings.settings['signup.enabled'];
  }

  $onInit() {
    this.currentProfile = this._AuthService.currentProfile();
    this.profileForm = {
      name: (this.currentProfile) ? this.currentProfile.name : null,
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

  updateSettings() {
    this.settings.settings['signup.enabled'] = this.enableSignup;

    this._SettingsService.updateSettings(this.settings.settings).then(() => {
      if (this.enableSignup) {
        this._Notifications.success('Signup enabled');
      } else {
        this._Notifications.success('Signup disabled');
      }
    }).catch((err) => {
      this._Notifications.error(err.data.message);
    })
  }

  _resetProfileForm() {
    this.profileForm.currentPassword = null;
    this.profileForm.password = null;
    this.profileForm.confirmPassword = null;
  }
};


module.exports = {
  templateUrl: 'views/profile/profile.html',
  controller: ProfileController,
  bindings: {
    settings: '='
  }
};
