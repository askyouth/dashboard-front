'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class HandlesController {
  constructor($element, HandleService, Notifications) {
    'ngInject';
    this._$element = $element;
    this.HandleService = HandleService;
    this.Notifications = Notifications;

    this.handles = this.handles || [];

    this.filters = {
      arrangeBy: 'asc',
      showGroups: 'both',
      topicFilter: 'all'
    };

    this.handleForm = {
      type: 'youth',
      handle: null
    };
  }

  $onInit() {

  }

  $onDestroy() {

  }

  createHandle($event) {
    if ($event.keyCode === 13) {
      this.HandleService.create(this.handleForm.handle).then((handle) => {
        this.handleForm.handle = null;
        this.handles.push(handle);
      }).catch(() => {
        this.Notifications.error('Handle create failed');
      });
    }
  }

  onHandleRemove(handle) {
    if (!handle) return;

    angular.forEach(this.handles, (existingHandle, index) => {
      if (existingHandle.id === handle.id) {
        this.handles.splice(index, 1);
      }
    });
  }
};


module.exports = {
  templateUrl: 'views/handles/handles.html',
  controller: HandlesController,
  bindings: {
    handles: '=',
    topics: '='
  }
};
