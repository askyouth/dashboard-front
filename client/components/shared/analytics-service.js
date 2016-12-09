class AnalyticsService {
  constructor(ApiService) {
    'ngInject';
    this._ApiService = ApiService;
  }

  globalStats() {
    return this._ApiService.get('/account').then((response) => {
      return response.data;
    });
  }

  kloutChange() {
    return this._ApiService.get('/analytics/klout').then((response) => {
      return response.data;
    });
  }

  topTweeters() {
    return this._ApiService.get('/analytics/tweeters').then((response) => {
      return response.data;
    });
  }

  topContributors() {
    return this._ApiService.get('/analytics/contributors').then((response) => {
      return response.data;
    });
  }
}

module.exports = AnalyticsService;