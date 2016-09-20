module.exports = function ($stateProvider) {
  'ngInject';

  /**
   * Component routes
   */

  $stateProvider.state('index', {
    url: '/',
    template: '<index-component></index-component>'
  })

  $stateProvider.state('handles', {
    url: '/handles',
    template: '<handles-component></handles-component>'
  })

  $stateProvider.state('topics', {
    url: '/topics',
    template: '<topics-component></topics-component>'
  })

  $stateProvider.state('conversations', {
    url: '/conversations',
    template: '<conversations-component></conversations-component>'
  })

  $stateProvider.state('infographics', {
    url: '/infographics',
    template: '<infographics-component></infographics-component>'
  })

  /**
   * Auth routes
   */

   $stateProvider.state('profile', {
     url: '/profile',
     template: '<profile-component></profile-component>'
   })

   $stateProvider.state('login', {
     url: '/login',
     template: '<login-component></login-component>'
   })

   $stateProvider.state('logout', {
     url: '/logout',
     template: '<div></div>',
     controller: function ($state) {
       'ngInject';
       $state.go('login');
     }
   })
};
