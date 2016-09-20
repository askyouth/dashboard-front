'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ApplicationController {
  constructor($scope, $element) {
    'ngInject';
    this._$scope = $scope;
    this._$element = $element[0];

    this.view = {
      showComposeModal: false
    };
  }

  $onInit() {

  }

  $onDestroy() {

  }

  isAuthenticated() {
    return true;
  }
  
};


module.exports = {
  templateUrl: 'views/application/application.html',
  controller: ApplicationController
};
