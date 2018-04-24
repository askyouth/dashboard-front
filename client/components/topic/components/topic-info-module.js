'use strict';

/**
 * IndexController
 */
class TopicInfoController {
  constructor($element) {
    'ngInject';
    this._element = $element[0];
    this._$element = $element;

    this.topicTweetsFilter = 'handles';
  }

  $onInit() {

  }

  $onDestroy() {

  }
};


module.exports = {
  template: `
    <div class="module panel panel-default topic-info">
      <div class="panel-heading">Keywords</div>

      <div class="module__content panel-body topic-info__keywords">
        <span class="label label-default topic-info__keyword" ng-repeat="keyword in $ctrl.topic.keywords">{{keyword}}</span>
      </div>
    </div>
  `,
  controller: TopicInfoController,
  bindings: {
    topic: '='
  }
};
