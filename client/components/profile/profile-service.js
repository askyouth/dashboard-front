class ProfileService {
  constructor($q, ApiService, ProfileValidator, AuthService) {
    'ngInject';
    this._$q = $q;
    this.ApiService = ApiService;
    this.AuthService = AuthService;
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

      return this.ApiService.post('/profile', data).then((res) => {
        let profile = this.AuthService.currentProfile();
        profile.name = data.name;
        this.AuthService.currentProfile(profile);
        return res;
      });
    } else {
      let deferred = this._$q.defer();
      deferred.reject(validator.getMessages());
      return deferred.promise;
    }
  }
}

module.exports = ProfileService;