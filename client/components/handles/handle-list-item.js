'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class HandleListItemController {
  constructor($element, HandleService, Notifications) {
    'ngInject';
    this._element = $element[0];
    this._$element = $element;
    this.HandleService = HandleService;
    this.Notifications = Notifications;
  }

  $onInit() {

  }

  $onDestroy() {

  }

  deleteHandle() {
    this._$element.addClass(config.cssClasses.IS_REMOVING_HANDLE);
    this._$element.find(config.selectors.REMOVE_HANDLE_BUTTON).attr('disabled', true);

    this.HandleService.remove(this.handle).then(() => {
      this.Notifications.success('Handle removed');
      this.onDelete(this.handle);
    });
  }
};


module.exports = {
  templateUrl: 'views/handles/handle-list-item.html',
  controller: HandleListItemController,
  bindings: {
    topics: '=',
    handle: '=',
    onDelete: '&'
  }
};
