'use strict';
const config = require('../config');

module.exports = function ($urlRouterProvider, $locationProvider, $compileProvider, $httpProvider, toastrConfig) {
  'ngInject';
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $compileProvider.debugInfoEnabled(config.get('app.debug'));

  $httpProvider.defaults.withCredentials = false;
  delete $httpProvider.defaults.headers.common["X-Requested-With"];

  angular.extend(toastrConfig, {
    
  });
};
