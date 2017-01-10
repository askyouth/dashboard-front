'use strict';

/**
 * IndexController
 */
class MostTweetsStatsModuleController {
  constructor($element, AnalyticsService) {
    'ngInject';
    this._$element = $element;
    this._AnalyticsService = AnalyticsService;

    this._AnalyticsService.topTweeters().then((tweeters) => {
      this.handles = tweeters;
    });
  }
};


module.exports = {
  template: `
    <div class="module most-tweets-stats" ng-if="$ctrl.handles.length">
      <div class="module__title">Most tweets</div>

      <div class="most-tweets-stats__list">
        <div class="most-tweets-stats__item" ng-repeat="handle in $ctrl.handles">
          <div class="handle">
            <a ui-sref="handle({ id: handle.id })" class="tweet__user">
              <img class="tweet__avatar" ng-src="{{handle.profile.image}}">
              <span class="tweet__user__name">{{handle.name}}</span>
              <span class="tweet__user__username">@{{handle.username}}</span>
            </a>

            <user-group group-id="handle.camp_id" class="most-tweets-stats__group" short-name></user-group>
            <div class="most-tweets-stats__tweets-count">{{handle.tweets}}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  controller: MostTweetsStatsModuleController
};
