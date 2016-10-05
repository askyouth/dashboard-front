'use strict';

/**
 * IndexController
 */
class TopicStatsController {
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
    <div class="module panel panel-default topic-stats">
      <div class="panel-heading">Topic stats</div>
      <div class="module__content panel-body">
        <div class="topic-stats__no-stats">No stats found</div>
      </div>
    </div>
  `,
  controller: TopicStatsController,
  bindings: {
    topic: '='
  }
};
