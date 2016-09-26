module.exports = function ($urlRouterProvider, $locationProvider, $compileProvider) {
  'ngInject';
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $compileProvider.debugInfoEnabled(false);
};
