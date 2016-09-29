'use strict';

/**
 * IndexController
 */
class TopicInfoController {
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
    <div class="module panel panel-default topic-info">
      <div class="module__title panel-heading">Show tweets</div>
      <div class="module__content panel-body">
        <label>
          <input type="radio" name="topic__filter" ng-model="$ctrl.topic.meta.tweetsFilter" value="handles"> Only from handles added to this topic
        </label>

        <label>
          <input type="radio" name="topic__filter" ng-model="$ctrl.topic.meta.tweetsFilter" value="all"> From all Twitter users
        </label>
      </div>

      <div class="module__title panel-heading">Keywords</div>

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
