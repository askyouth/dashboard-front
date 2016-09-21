module.exports = function ($urlRouterProvider, $locationProvider) {
  'ngInject';
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
};
