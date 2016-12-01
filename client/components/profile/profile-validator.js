class ProfileValidator {
  constructor(profile) {
    this._profile = profile;
    this._messages = [];
  }

  isValid() {
    let isValid = true;
    let profile = this._profile;

    if (!profile.name) {
      isValid = false;
      this._messages.push('Invalid name');
    }

    if (profile.password) {
      if (!profile.currentPassword) {
        isValid = false;
        this._messages.push('Missing current password');
      }

      if (profile.password !== profile.confirmPassword) {
        isValid = false;
        this._messages.push('Invalid password confirmation');
      }
    }

    return isValid;
  }

  getMessages() {
    return angular.copy(this._messages);
  }

  static factory() {
    return ProfileValidator;
  }
}

module.exports = ProfileValidator;