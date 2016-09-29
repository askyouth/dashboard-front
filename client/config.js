'use strict';
const config = require('../config');

module.exports = function ($urlRouterProvider, $locationProvider, $compileProvider, toastrConfig) {
  'ngInject';
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $compileProvider.debugInfoEnabled(config.get('app.debug'));

  angular.extend(toastrConfig, {

  });
};
