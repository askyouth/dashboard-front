class UserService {
  constructor($q, ApiService) {
    'ngInject';
    this._$q = $q;
    this.ApiService = ApiService;
  }

  users(params) {
    return this.ApiService.get('users', { params }).then(function (response) {
      return response.data;
    });
  }

  find(id, params) {
    return this.ApiService.get(`users/${id}`, { params }).then(function (response) {
      return response.data;
    });
  }

  inviteUser(user) {
    return this.ApiService.post(`users`, user);
  }

  deleteUser(user) {
    return this.ApiService.delete(`users/${user.id}`);
  }
}

module.exports = UserService;