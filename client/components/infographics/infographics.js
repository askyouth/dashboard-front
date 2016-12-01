'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class InfographicsController {
  constructor($element, $stateParams, ApiService, Upload, Notifications, InfographicsService) {
    'ngInject';

    this._$element = $element;
    this._$stateParams = $stateParams;
    this.Notifications = Notifications;
    this.ApiService = ApiService;
    this.Upload = Upload;
    this.InfographicsService = InfographicsService;

    this.infographics = [];
    this.infographicsArchive = [];

    InfographicsService.archive().then((archive) => {
      this.infographicsArchive = archive;
    });
    this.loadInfoGraphics();
  }

  $onInit() {

  }

  $onDestroy() {

  }

  loadInfoGraphics() {
    this.InfographicsService.list({ filter: { date: this._$stateParams.month } }).then((infographics) => {
      this.infographics = infographics;
    });
  }

  uploadInfographics(file) {
    return this.InfographicsService.upload(file).then((infographics) => {
      this.infographics.push(infographics);
      this.Notifications.success('Image uploaded');
    }).catch(() => {
      this.Notifications.error('Image upload failed');
    });
  }
};


module.exports = {
  templateUrl: 'views/infographics/infographics.html',
  controller: InfographicsController
};
