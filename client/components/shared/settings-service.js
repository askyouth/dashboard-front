class SettingsService {
  constructor(ApiService) {
    'ngInject';
    this.ApiService = ApiService;
  }

  getConfig() {
    return this.ApiService.get('config').then((response) => {
      return response.data;
    });
  }

  getSettings() {
    return this.ApiService.get('settings').then((response) => {
      return response.data;
    });
  }

  updateSettings(settings) {
    return this.ApiService.post('settings', settings);
  }
}

module.exports = SettingsService;