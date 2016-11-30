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
  constructor($auth, ApiService, AppStore) {
    'ngInject';
    this._profile = null;
    this._$auth = $auth;
    this._ApiService = ApiService;
    this._AppStore = AppStore;
  }

  getUser() {
    return user;
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

  login(data) {
    return this._$auth.login(data).then((response) => {
      var profile = response.data.user;
      return this.currentProfile(profile);
    });
  }

  signup(data) {
    return this._ApiService.post('/signup', data);
  }

  logout() {
    return this._$auth.logout().then(() => {
      this._AppStore.remove('profile');
    });
  }

}

module.exports = AuthService;