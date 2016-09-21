module.exports = function ($stateProvider) {
  'ngInject';

  /**
   * Component routes
   */

  $stateProvider.state('index', {
    url: '/',
    template: '<index-component></index-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } }
  })

  $stateProvider.state('handles', {
    url: '/handles',
    template: '<handles-component></handles-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } }
  })

  $stateProvider.state('topics', {
    url: '/topics',
    template: '<topics-component></topics-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } }
  })

  $stateProvider.state('conversations', {
    url: '/conversations',
    template: '<conversations-component></conversations-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } }
  })

  $stateProvider.state('infographics', {
    url: '/infographics',
    template: '<infographics-component></infographics-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } }
  })

  /**
   * Auth routes
   */

   $stateProvider.state('profile', {
     url: '/profile',
     template: '<profile-component></profile-component>',
     data: { permissions: { only: ['user'] } }
   })

   $stateProvider.state('login', {
     url: '/login',
     template: '<login-component></login-component>',
     data: { permissions: { only: ['guest'], redirectTo: 'index' } }
   })

   $stateProvider.state('logout', {
     url: '/logout',
     template: '<div></div>',
     controller: function ($state) {
       'ngInject';
       $state.go('login');
     },
     data: { permissions: { only: ['user'], redirectTo: 'login' } }
   })
};
