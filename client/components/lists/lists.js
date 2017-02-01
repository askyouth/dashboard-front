class ListsController {
  constructor(SettingsService, Notifications) {
    'ngInject';
    this.Notifications = Notifications;
    this.SettingsService = SettingsService;
    this.lists = this.settings.lists;

    this.youthListId = this.settings.settings['twitter.list.youth'];
    this.policyListId = this.settings.settings['twitter.list.policymakers'];
  }

  updateLists() {
    this.settings.settings['twitter.list.policymakers'] = this.policyListId;
    this.settings.settings['twitter.list.youth'] = this.youthListId;

    this.SettingsService.updateSettings(this.settings.settings).then(() => {
      this.Notifications.success('Lists updated');
    }).catch((err) => {
      this.Notifications.error(err.data.message);
    })
  }
}

module.exports = {
  templateUrl: 'views/lists/lists.html',
  controller: ListsController,
  bindings: {
    settings: '='
  }
};