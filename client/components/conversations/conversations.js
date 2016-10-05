'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ConversationsController {
  constructor($element, $state, $stateParams) {
    'ngInject';
    this._$state = $state;
    this._$stateParams = $stateParams;
    this._$element = $element;

    this.filters = {
      topicFilter: 'all',
      groupFilter: 'both',
      participantsNumberType: 'at_least',
      participantsNumber: 2,
      tweetCountType: 'at_least',
      tweetCount: 2
    }

    this.selectedTopicId = $stateParams.topic_id;
  }

  $onInit() {
    this.conversations = [
      { id: 1, handles: [ { username: 'dgrubelic' }, { username: 'djelich' } ] },
      { id: 2, handles: [ { username: 'viborc' }, { username: 'djelich' } ] },
      { id: 3, handles: [ { username: 'viborc' }, { username: 'darkoche' }, { username: 'djelich' }, { username: 'dgrubelic' } ] }
    ];

    let firstConversation = this.conversations[0];
    this._$state.go('topic_conversations.topic_conversation', {
      id: firstConversation.id
    });
  }

  changeTopic() {
    this._$state.go('topic_conversations', {
      topic_id: this.selectedTopicId
    }, { reload: true });
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
    topics: '=',
    topicCursors: '='
  }
};
