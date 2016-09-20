module.exports = function (PermRoleStore) {
  'ngInject';

  PermRoleStore.defineRole('guest', () => {
    // return !AuthService.isAuthenticated();
    return false;
  });

  PermRoleStore.defineRole('user', () => {
    // return AuthService.isAuthenticated();
    return true;
  });
}
