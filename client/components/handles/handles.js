'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class HandlesController {
  constructor($element, $stateParams, HandleService, Notifications) {
    'ngInject';
    this._$element = $element;
    this.HandleService = HandleService;
    this.Notifications = Notifications;

    this.handlesCount = this.handles.count;
    this.handles = this.handles.handles || [];

    this.filters = {
      arrangeBy: 'created_at-desc',
      showGroups: $stateParams.group ? $stateParams.group : 'both',
      topicFilter: 'all',
      page: parseInt($stateParams.page, 10) || 1,
      pageSize: parseInt($stateParams.pageSize) || 10
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
      }).catch((err) => {
        this.Notifications.error(err.data.message);
      });
    }
  }

  filterHandles(page, pageSize) {
    console.log('filter handles')

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
    params.page = page || this.filters.page;
    params.pageSize = pageSize || this.filters.pageSize;

    return this.HandleService.list(params, true).then((response) => {
      this.handlesCount = response.count;
      this.handles = response.handles;
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
