const user = {
  handle: {
    camp: {id: 2, name: "Youth"},
    camp_id: 2,
    created_at: "2016-10-12T12:31:51.338Z",
    id: 38,
    klout_id: "228276222572400983",
    klout_score: null,
    name: "Jane Doe",
    profile: {
      description: "I think therefore I am",
      image: "https://pbs.twimg.com/profile_images/378800000712065659/2ae7e12957dfdb54f3ff75d117bfe602_normal.jpeg"
    },
    topics: [],
    uid: "1746146112",
    updated_at: "2016-10-12T12:31:51.338Z",
    username: "JaneDoeUXP"
  }
};

class AuthService {
  constructor($q, $auth, ApiService, AppStore, ResetPasswordValidator) {
    'ngInject';
    this._twitterUser = null;
    this._profile = null;
    this._$q = $q;
    this._$auth = $auth;
    this._ApiService = ApiService;
    this._AppStore = AppStore;
    this._ResetPasswordValidator = ResetPasswordValidator;

    this.loadTwitterUser()
  }

  getUser() {
    return this._twitterUser;
  }

  currentProfile(profile) {
    if (profile) {
      this._AppStore.set('profile', profile);
      this._profile = profile;
    } else {
      profile = this._AppStore.get('profile');
      if (profile) {
        this._profile = profile;
      }
    }
    return this._profile;
  }

  isAuthenticated() {
    return this._$auth.isAuthenticated();
  }

  getToken() {
    let token = this._$auth.getToken();
    return token.split(' ')[1];
  }

  login(data) {
    return this._$auth.login(data).then((response) => {
      var profile = response.data.user;
      
      return this.loadTwitterUser().then(() => {
        return this.currentProfile(profile);
      });
    });
  }

  signup(data) {
    return this._ApiService.post('/signup', data);
  }

  logout() {
    return this._ApiService.delete('/logout').then(() => {
      return this._$auth.logout().then(() => {
        this._AppStore.remove('profile');
      });
    });
  }

  forgotPassword(email) {
    return this._ApiService.post('/login/forgot', { email });
  }

  resetPassword(data) {
    let validator = new this._ResetPasswordValidator(data);

    if (validator.isValid()) {
      return this._ApiService.post('/login/reset', data).catch((res) => {
        return this._$q.reject(res.data.message);
      });
    } else {
      let deferred = this._$q.defer();
      deferred.reject(validator.getMessages());
      return deferred.promise;
    }
  }

  loadTwitterUser() {
    if (!this.isAuthenticated()) return this._$q.resolve();

    return this._ApiService.get('/account').then((response) => {
      this._twitterUser = response.data;
      this._twitterUser.handle = this._twitterUser.handle[0];
      return this._twitterUser;
    })
  }

}

module.exports = AuthService;