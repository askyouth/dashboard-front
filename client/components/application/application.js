'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ApplicationController {
  constructor($scope, $element, HandleService, AuthService) {
    'ngInject';
    this._$scope = $scope;
    this._$element = $element[0];
    this._AuthService = AuthService;

    this.view = {
      showComposeModal: false
    };
  }

  $onInit() {

  }

  $onDestroy() {

  }

  isAuthenticated() {
    return this._AuthService.isAuthenticated();
  }

  currentProfile() {
    if (this.isAuthenticated()) {
      return this._AuthService.currentProfile();
    }
    return null;
  }
  
};


module.exports = {
  templateUrl: 'views/application/application.html',
  controller: ApplicationController
};
