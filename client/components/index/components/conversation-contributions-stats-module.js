'use strict';

/**
 * IndexController
 */
class ConversationContributionsStatsModuleController {
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
    <div class="module conversation-contributions-stats">
      <div class="module__title">Conversation contributions</div>

      <div class="conversation-contributions-stats__list">
        <div class="conversation-contributions-stats__item" ng-repeat="handle in $ctrl.handles">
          <div class="handle">
            <a ui-sref="handle({ id: handle.id })" class="tweet__user">
              <img class="tweet__avatar" ng-src="{{handle.profile.image}}">
              <span class="tweet__user__name">{{handle.name}}</span>
              <span class="tweet__user__username">@{{handle.username}}</span>
            </a>

            <div class="conversation-contributions-stats__group handle-group handle-group--youth">Y</div>
            <div class="conversation-contributions-stats__score">
              <div class="conversation-contributions-stats__contributions">62</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  controller: ConversationContributionsStatsModuleController
};
