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
      arrangeBy: 'created_at-desc',
      showGroups: 'both',
      topicFilter: 'all'
    };

    this.handleForm = {
      type: "1",
      handle: null
    };
  }

  $onInit() {

  }

  $onDestroy() {

  }

  createHandle($event) {
    if ($event.keyCode === 13) {
      return this.HandleService.create(this.handleForm.handle, this.handleForm.type).then((handle) => {
        this.handleForm.handle = null;
        this.filterHandles()

        this.Notifications.success('Handle created successfully');
      }).catch(() => {
        this.Notifications.error('Handle create failed');
      });
    }
  }

  filterHandles() {
    let [sort, sortOrder] = this.filters.arrangeBy.split('-');
    let params = { sort, sortOrder, filter: {} };

    if (this.filters.search) {
      params.filter.search = this.filters.search;
    }

    if (this.filters.showGroups !== 'both') {
      params.filter.camp = parseInt(this.filters.showGroups, 10);
    }

    if (this.filters.topicFilter !== 'all') {
      params.filter.topic = parseInt(this.filters.topicFilter, 10);
    }

    params.related = '["topics"]';

    return this.HandleService.list(params, true).then((handles) => {
      this.handles = handles;
    }).catch((err) => {
      this.Notifications.error('Something bad happened');
    });
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
