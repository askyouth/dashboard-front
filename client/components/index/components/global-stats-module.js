'use strict';

/**
 * IndexController
 */
class GlobalStatsModuleController {
  constructor($element, AnalyticsService) {
    'ngInject';
    this._$element = $element;
    this._AnalyticsService = AnalyticsService;
  }

  $onInit() {
    this._AnalyticsService.globalStats().then((globalStats) => {
      this.globalStats = globalStats;
    })
  }
};


module.exports = {
  template: `
    <div class="module global-stats">
      <div class="logo global-stats__logo"></div>

      <div class="row global-stats__list">
        <div class="col-sm-4 global-stats__item">
          <div class="global-stats__stat-value">{{$ctrl.globalStats.youthHandles}}</div>
          <div class="global-stats__stat-title">Young people</div>
        </div>
        <div class="col-sm-4 global-stats__item">
          <div class="global-stats__stat-value">{{$ctrl.globalStats.policyMakerHandles}}</div>
          <div class="global-stats__stat-title">Policy makers</div>
        </div>
        <div class="col-sm-4 global-stats__item">
          <div class="global-stats__stat-value">{{$ctrl.globalStats.contributions}}</div>
          <div class="global-stats__stat-title">Contributions</div>
        </div>
      </div>
    </div>
  `,
  controller: GlobalStatsModuleController
};
