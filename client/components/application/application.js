'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ApplicationController {
  constructor($rootScope, $scope, $element, HandleService, AuthService) {
    'ngInject';
    this._$rootScope = $rootScope;
    this._$scope = $scope;
    this._$element = $element[0];
    this._AuthService = AuthService;

    this.view = {
      showComposeModal: false
    };
  }

  $onInit() {
    this.$tweetDetailsWatch = this._$rootScope.$on('tweet:details', (e, tweet) => {
      this.tweetDetails = tweet;
    });
  }

  $onDestroy() {
    this.$tweetDetailsWatch();
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
