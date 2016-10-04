'use strict';

/**
 * IndexController
 */
class MostTweetsStatsModuleController {
  constructor($element, HandleService) {
    'ngInject';
    this._$element = $element;

    HandleService.list().then((handles) => {
      this.handles = handles;
    });
  }
};


module.exports = {
  template: `
    <div class="module most-tweets-stats">
      <div class="module__title">Most tweets</div>

      <div class="most-tweets-stats__list">
        <div class="most-tweets-stats__item" ng-repeat="handle in $ctrl.handles">
          <div class="handle">
            <a ui-sref="handle({ id: handle.id })" class="tweet__user">
              <img class="tweet__avatar" ng-src="{{handle.profile.image}}">
              <span class="tweet__user__name">{{handle.name}}</span>
              <span class="tweet__user__username">@{{handle.username}}</span>
            </a>

            <div class="most-tweets-stats__group handle-group handle-group--policy">PM</div>
            <div class="most-tweets-stats__tweets-count">62</div>
          </div>
        </div>
      </div>
    </div>
  `,
  controller: MostTweetsStatsModuleController
};
