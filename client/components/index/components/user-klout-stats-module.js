'use strict';

/**
 * IndexController
 */
class UserKloutStatsModuleController {
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
    <div class="module user-klout-stats">
      <div class="module__title">Klout score change</div>

      <div class="user-klout-stats__list">
        <div class="user-klout-stats__item" ng-repeat="handle in $ctrl.handles">
          <div class="handle">
            <a ui-sref="handle({ id: handle.id })" class="tweet__user">
              <img class="tweet__avatar" ng-src="{{handle.profile.image}}">
              <span class="tweet__user__name">{{handle.name}}</span>
              <span class="tweet__user__username">@{{handle.username}}</span>
            </a>

            <div class="user-klout-stats__group handle-group handle-group--policy">PM</div>
            <div class="user-klout-stats__score">
              <div class="user-klout-stats__score-value">50.00</div>
              <div class="user-klout-stats__score-diff user-klout-stats__score-diff--positive">+ 5,2%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  controller: UserKloutStatsModuleController
};
