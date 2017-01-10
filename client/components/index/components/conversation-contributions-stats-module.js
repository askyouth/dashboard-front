'use strict';

/**
 * IndexController
 */
class ConversationContributionsStatsModuleController {
  constructor($element, AnalyticsService) {
    'ngInject';
    this._$element = $element;
    this._AnalyticsService = AnalyticsService;

    this._AnalyticsService.topContributors().then((contributors) => {
      this.handles = contributors;
    });
  }
};


module.exports = {
  template: `
    <div class="module conversation-contributions-stats" ng-if="$ctrl.handles.length">
      <div class="module__title">Conversation contributions</div>

      <div class="conversation-contributions-stats__list">
        <div class="conversation-contributions-stats__item" ng-repeat="handle in $ctrl.handles">
          <div class="handle">
            <a ui-sref="handle({ id: handle.id })" class="tweet__user">
              <img class="tweet__avatar" ng-src="{{handle.profile.image}}">
              <span class="tweet__user__name">{{handle.name}}</span>
              <span class="tweet__user__username">@{{handle.username}}</span>
            </a>

            <user-group group-id="handle.camp_id" class="conversation-contributions-stats__group" short-name></user-group>
            <div class="conversation-contributions-stats__score">
              <div class="conversation-contributions-stats__contributions">{{handle.tweets}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  controller: ConversationContributionsStatsModuleController
};
