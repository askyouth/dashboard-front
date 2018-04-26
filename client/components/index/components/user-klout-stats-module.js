'use strict';

/**
 * IndexController
 */
class UserKloutStatsModuleController {
  constructor($element, AnalyticsService) {
    'ngInject';
    this._$element = $element;
    this._AnalyticsService = AnalyticsService;

    this._AnalyticsService.kloutChange().then((handles) => {
      this.handles = handles;
    });
  }
};


module.exports = {
  template: `
    <div class="module user-klout-stats" ng-if="$ctrl.handles.length">
      <div class="module__title">Klout score change</div>

      <div class="user-klout-stats__list">
        <div class="user-klout-stats__item" ng-repeat="handle in $ctrl.handles">
          <div class="handle">
            <a ui-sref="handle({ id: handle.id })" class="tweet__user">
              <img class="tweet__avatar" ng-src="{{'https://avatars.io/twitter/'+handle.username}}">
              <span class="tweet__user__name">{{handle.name}}</span>
              <span class="tweet__user__username">@{{handle.username}}</span>
            </a>

            <user-group group-id="handle.camp_id" class="user-klout-stats__group" short-name></user-group>
            <div class="user-klout-stats__score">
              <div class="user-klout-stats__score-value">{{handle.klout_score || 'N/A' | number:2}}</div>
              <div class="user-klout-stats__score-diff" 
                ng-class="{'user-klout-stats__score-diff--positive': handle.klout_delta >= 0, 'user-klout-stats__score-diff--negative': handle.klout_delta < 0}">{{handle.klout_delta | number:2}}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  controller: UserKloutStatsModuleController
};
