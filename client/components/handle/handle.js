'use strict';
const config = require('./config.json');

/**
 * HandleController
 */
class HandleController {
  constructor($element, UserGroups, HandleService, Notifications) {
    'ngInject';
    this._$element = $element;
    this.UserGroups = UserGroups;
    this.HandleService = HandleService;
    this.Notifications = Notifications;
  }

  $onInit() {

  }

  $onDestroy() {

  }

  updateHandle() {
    this.HandleService.update(this.handle, {
      camp_id: this.handle.camp_id
    }).then((handle) => {
      this.Notifications.success('Handle updated');
    }).catch(() => {
      this.Notifications.error('Handle update failed');
    });
  }

  profileImage(image) {
    return image.replace('_normal', '');
  }
};


module.exports = {
  templateUrl: 'views/handle/handle.html',
  controller: HandleController,
  bindings: {
    handle: '='
  }
};
