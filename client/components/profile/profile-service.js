class ProfileService {
  constructor($q, ApiService, ProfileValidator) {
    this._$q = $q;
    this.ApiService = ApiService;
    this.ProfileValidator = ProfileValidator;
  }

  update(data) {
    let validator = new this.ProfileValidator(data);
    
    if (validator.isValid()) {
      if (!data.password) {
        data.password = undefined;
        data.currentPassword = undefined;
        data.confirmPassword = undefined;
      }

      return this.ApiService.post('/profile', data);
    } else {
      let deferred = this._$q.defer();
      deferred.reject(validator.getMessages());
      return deferred.promise;
    }
  }
}

module.exports = ProfileService;