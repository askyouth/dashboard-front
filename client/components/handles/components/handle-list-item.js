'use strict';
const config = require('../config.json');

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

  followOnTwitter($event) {
    if ($event) $event.preventDefault();

    this.HandleService.followHandle(this.handle).then((response) => {
      this.Notifications.success('Handle successfully followed');
      this.handle.following = true;
    }).catch((err) => {
      this.Notifications.error((err && err.data) ? err.data.message : 'Error occurred');
    })
  }

  unfollowOnTwitter($event) {
    if ($event) $event.preventDefault();

    this.HandleService.unfollowHandle(this.handle).then((response) => {
      this.Notifications.success('Handle successfully unfollowed');
      this.handle.following = false;
    }).catch((err) => {
      this.Notifications.error((err && err.data) ? err.data.message : 'Error occurred');
    })
  }

  deleteHandle() {
    this._$element.addClass(config.cssClasses.IS_REMOVING_HANDLE);
    this._$element.find(config.selectors.REMOVE_HANDLE_BUTTON).attr('disabled', true);

    this.HandleService.remove(this.handle).then(() => {
      this._$element.find(config.selectors.REMOVE_HANDLE_BUTTON).attr('disabled', false);
      this.Notifications.success('Handle removed');
      this.onDelete(this.handle);
    }).catch((err) => {
      this.Notifications.error(err.message);
    });
  }
};


module.exports = {
  templateUrl: 'views/handles/components/handle-list-item.html',
  controller: HandleListItemController,
  bindings: {
    topics: '=',
    handle: '=',
    onDelete: '&'
  }
};
