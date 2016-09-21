'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ConversationsController {
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
  templateUrl: 'views/conversations/conversations.html',
  controller: ConversationsController
};
