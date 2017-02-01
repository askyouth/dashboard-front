class UsersController {
  constructor($scope, $element, $stateParams, AuthService, UserService, Notifications) {
    'ngInject';
    this._$scope = $scope;
    this._$element = $element;
    this._AuthService = AuthService;
    this._UserService = UserService;
    this._Notifications = Notifications;

    this.usersCount = this.users.count;
    this.users = this.users.users;

    this.filters = {
      page: $stateParams.page || 1,
      pageSize: $stateParams.pageSize || 10
    }

    this.inviteForm = {
      name: null,
      email: null
    };
    this.selectedUser = null;

    this._$element.find('#invite-user-modal').on('hidden.bs.modal', () => {
      this._$scope.$apply(() => {
        this.inviteForm = {
          name: null,
          email: null
        };
      });
    });

    this._$element.find('#delete-user-modal').on('hidden.bs.modal', () => {
      this._$scope.$apply(() => {
        this.selectedUser = null;
      });
    });

    this._$scope.$on('$destroy', () => {
      this._$element.find('#invite-user-modal').off('hidden.bs.modal');
      this._$element.find('#delete-user-modal').off('hidden.bs.modal');
    });
  }

  filterUsers(page, pageSize) {
    this.filters.page = page;
    this.filters.pageSize = pageSize;

    return this._UserService.users({ 
      page: this.filters.page,
      pageSize: this.filters.pageSize
    }).then((users) => {
      this.usersCount = users.count;
      this.users = users.users;
    });
  }

  inviteUser(form, $event) {
    if ($event) $event.preventDefault();

    if (form.$valid) {
      this._UserService.inviteUser(this.inviteForm).then((response) => {
        this.inviteForm = {
          name: null,
          email: null
        };

        // this.users.push(response.data.user);
        this._Notifications.success('User invited');
        this._$element.find('#invite-user-modal').modal('hide');
      }).catch((err) => {
        this._Notifications.error(err.data.message);
      })
    }
  }

  deleteUser(user, $event) {
    if ($event) $event.preventDefault();
    if (!user) return false;

    this._UserService.deleteUser(user).then(() => {
      this._Notifications.success('User deleted');

      this.users = this.users.filter((existingUser) => {
        return existingUser.id !== user.id;
      })
      this._$element.find('#delete-user-modal').modal('hide');
    }).catch((err) => {
      this._Notifications.error(err.data.message);
    })
  }

  isCurrentUser(user) {
    if (!user) return false;
    if (!this._AuthService.isAuthenticated()) return false;

    return (this._AuthService.currentProfile().id === user.id);
  }
}

module.exports = {
  templateUrl: 'views/users/users.html',
  controller: UsersController,
  bindings: {
    users: '='
  }
};