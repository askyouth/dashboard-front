class ResetPasswordValidator {
  constructor(data) {
    this._data = data;
    this._messages = [];
  }

  isValid() {
    let isValid = true;

    if (!this._data.user) {
      isValid = false;
      this._messages.push('Invalid user');
    }

    if (!this._data.token) {
      isValid = false;
      this._messages.push('Invalid token');
    }

    if (this._data.password) {
      if (this._data.password !== this._data.confirmPassword) {
        isValid = false;
        this._messages.push('Invalid password confirmation');
      }
    } else {
      isValid = false;
      this._messages.push('Invalid new password');
    }

    return isValid;
  }

  getMessages() {
    return angular.copy(this._messages);
  }

  static factory() {
    return ResetPasswordValidator;
  }
}

module.exports = ResetPasswordValidator;