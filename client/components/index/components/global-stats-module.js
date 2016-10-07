'use strict';

/**
 * IndexController
 */
class GlobalStatsModuleController {
  constructor($element) {
    'ngInject';
    this._$element = $element;
  }
};


module.exports = {
  template: `
    <div class="module global-stats">
      <div class="logo global-stats__logo"></div>

      <div class="row global-stats__list">
        <div class="col-sm-4 global-stats__item">
          <div class="global-stats__stat-value">37</div>
          <div class="global-stats__stat-title">Young people</div>
        </div>
        <div class="col-sm-4 global-stats__item">
          <div class="global-stats__stat-value">12</div>
          <div class="global-stats__stat-title">Policy makers</div>
        </div>
        <div class="col-sm-4 global-stats__item">
          <div class="global-stats__stat-value">771</div>
          <div class="global-stats__stat-title">Conversations</div>
        </div>
      </div>
    </div>
  `,
  controller: GlobalStatsModuleController
};
