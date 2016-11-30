module.exports = function (PermRoleStore, AuthService) {
  'ngInject';

  PermRoleStore.defineRole('guest', () => {
    return !AuthService.isAuthenticated();
  });

  PermRoleStore.defineRole('user', () => {
    return AuthService.isAuthenticated();
  });
}
