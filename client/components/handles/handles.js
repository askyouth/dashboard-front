'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class HandlesController {
  constructor($element) {
    'ngInject';
    this._$element = $element;

    this.filters = {
      arrangeBy: 'date',
      showGroups: 'both',
      topicFilter: 'all'
    };

    this.handleForm = {
      type: 'youth',
      handle: null
    };
  }

  $onInit() {
    this.handles = require('./data.json');
  }

  $onDestroy() {

  }

  createHandle($event) {
    if ($event.keyCode === 13) {
      this.handleForm.handle = null;
    }
  }
};


module.exports = {
  templateUrl: 'views/handles/handles.html',
  controller: HandlesController,
  bindings: {
    topics: '='
  }
};
