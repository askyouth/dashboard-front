'use strict';

/**
 * IndexController
 */
class GlobalStatsModuleController {
  constructor($element, AnalyticsService, ApiService) {
    'ngInject';
    this._$element = $element;
    this._AnalyticsService = AnalyticsService;
    this._ApiService = ApiService
  }

  $onInit() {
    this._AnalyticsService.globalStats().then((globalStats) => {
      this.globalStats = globalStats;
    })
    this._ApiService.get('/account').then((response) => {
      this.account = response.data;
      this.account.handle = this.account.handle[0]
    })
  }
};


module.exports = {
  template: `
    <div class="module global-stats">
      <div class="logo global-stats__logo">
        <a class="global-stats__logo-link" ui-sref="handle({ id: $ctrl.account.handle.id })"></a>
      </div>

      <div class="row global-stats__list">
        <a ui-sref="handles({ group: 2})" class="col-sm-4 global-stats__item">
          <div class="global-stats__stat-value">{{$ctrl.globalStats.youthHandles}}</div>
          <div class="global-stats__stat-title">Young people</div>
        </a>
        <a ui-sref="handles({ group: 1})" class="col-sm-4 global-stats__item">
          <div class="global-stats__stat-value">{{$ctrl.globalStats.policyMakerHandles}}</div>
          <div class="global-stats__stat-title">Policy makers</div>
        </a>
        <a ui-sref="conversations" class="col-sm-4 global-stats__item">
          <div class="global-stats__stat-value">{{$ctrl.globalStats.contributions}}</div>
          <div class="global-stats__stat-title">Contributions</div>
        </a>
      </div>
    </div>
  `,
  controller: GlobalStatsModuleController
};
