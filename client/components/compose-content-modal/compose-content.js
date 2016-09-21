'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ComposeContentModalController {
  constructor($element) {
    'ngInject';
    this._$element = $element[0];
    this.tweetForm = {
      content: null
    };
  }

  $onInit() {
    angular.element(this._$element.querySelector(config.selectors.composeContentModal))
      .on('hidden.bs.modal', this.onModalHide);
  }

  $onDestroy() {
    angular.element(this._$element.querySelector(config.selectors.composeContentModal))
      .off('hidden.bs.modal', this.onModalHide);
  }

  onModalHide() {
    console.log('modal hide');
  }
};


module.exports = {
  templateUrl: 'views/compose-content-modal/compose-content.html',
  controller: ComposeContentModalController
};
