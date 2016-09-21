'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class InfographicsController {
  constructor($element) {
    'ngInject';
    this._$element = $element;
    this.title = config.title;
  }

  $onInit() {

  }

  $onDestroy() {

  }
};


module.exports = {
  templateUrl: 'views/infographics/infographics.html',
  controller: InfographicsController
};
