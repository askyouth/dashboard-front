'use strict';

/**
 * IndexController
 */
class ConversationController {
  constructor($element) {
    'ngInject';
    this._$element = $element;
  }

  $onInit() {
    
  }
};


module.exports = {
  templateUrl: 'views/conversation/conversation.html',
  controller: ConversationController,
  bindings: {
    conversation: '='
  }
};
