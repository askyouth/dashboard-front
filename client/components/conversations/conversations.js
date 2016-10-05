'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ConversationsController {
  constructor($element) {
    'ngInject';
    this._$element = $element;

    this.filters = {
      topicFilter: 'all',
      groupFilter: 'both',
      participantsNumberType: 'at_least',
      participantsNumber: 2,
      tweetCountType: 'at_least',
      tweetCount: 2
    }
  }

  $onInit() {
    this.conversations = [
      { handles: [ { username: 'dgrubelic' }, { username: 'djelich' } ] },
      { handles: [ { username: 'viborc' }, { username: 'djelich' } ] },
      { handles: [ { username: 'viborc' }, { username: 'darkoche' }, { username: 'djelich' }, { username: 'dgrubelic' } ] }
    ];
  }

  generateConversationTitle(conversation) {
    let maxTitleHandles = 3;
    let title = [];

    if (conversation.handles.length <= maxTitleHandles) {
      conversation.handles.map(function (handle) {
        title.push(`@${handle.username}`);
      });
    } else {
      for (var i = 0; i < maxTitleHandles; i++) {
        title.push(`@${conversation.handles[i].username}`);
      }
      title.push(`+ ${conversation.handles.length - maxTitleHandles} more`);
    }

    return title.join(', ');
  }
};


module.exports = {
  templateUrl: 'views/conversations/conversations.html',
  controller: ConversationsController,
  bindings: {
    topics: '='
  }
};
