'use strict';

/**
 * IndexController
 */
class HandleStatsModuleController {
  constructor($element) {
    'ngInject';
    this._element = $element[0];
    this._$element = $element;
  }

  $onInit() {

  }

  $onDestroy() {

  }
};


module.exports = {
  template: `
    <div class="handle-stats module">
      <div class="handle-stats__item">
        <div class="handle-stats__value">7</div>
        <div class="handle-stats__label">Both groups conversations</div>
      </div>

      <div class="handle-stats__item">
        <div class="handle-stats__value">11</div>
        <div class="handle-stats__label">Single group conversations</div>
      </div>

      <div class="handle-stats__item">
        <div class="handle-stats__value">2,10</div>
        <div class="handle-stats__label">Tweets per day</div>
      </div>

      <div class="handle-stats__item">
        <div class="handle-stats__value">10,2</div>
        <div class="handle-stats__label">Retweets per day</div>
      </div>
    </div>
  `,
  controller: HandleStatsModuleController,
  bindings: {
    handle: '=',
  }
};
