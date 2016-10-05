'use strict';

/**
 * IndexController
 */
class ConversationStatsModuleController {
  constructor($element) {
    'ngInject';
    this._$element = $element;
  }
};

module.exports = {
  template: `
    <div class="conversation-stats module">
      <div class="conversation-stats__item">
        <div class="conversation-stats__value">1</div>
        <div class="conversation-stats__label">Total participants</div>
      </div>

      <div class="conversation-stats__item">
        <div class="conversation-stats__value">25,50</div>
        <div class="conversation-stats__label">mean Klout score</div>
      </div>

      <div class="conversation-stats__item">
        <div class="conversation-stats__value">2</div>
        <div class="conversation-stats__label">Retweets</div>
      </div>

      <div class="conversation-stats__item">
        <div class="conversation-stats__value">1</div>
        <div class="conversation-stats__label">Likes</div>
      </div>
    </div>
  `,
  controller: ConversationStatsModuleController
};
