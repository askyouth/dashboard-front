'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ConversationsController {
  constructor($rootScope, $element, $state, $stateParams, TopicService, ConversationsService, ConversationsTimeline, Notifications) {
    'ngInject';
    this._$rootScope = $rootScope;
    this._$state = $state;
    this._$stateParams = $stateParams;
    this._$element = $element;
    this.TopicService = TopicService;
    this.ConversationsService = ConversationsService;
    this.ConversationsTimeline = new ConversationsTimeline();
    this.Notifications = Notifications;

    this.queryParams = {
      filter: {
        search: undefined,
        topicId: undefined,
        campId: undefined,
        conversationsOnly: false,
        contributors: undefined,
        contributorsCondition: 'min',
        tweets: undefined,
        tweetsCondition: 'min'
      },

      page: 1,
      pageSize: 25,
      sort: 'created_at',
      sortOrder: 'asc'
    };

    this.selectedTopicId = null;
    this.topicCursors = {};
    this.viewModel = {
      showLoadMoreButton: true
    };
  }

  $onInit() {
    this.changeTopic();
  }

  listTopics() {
    this.TopicService.list().then((topics) => {
      topics = angular.copy(topics);
      topics.unshift({ id: null, name: 'All topics' });
      this.topics = topics;
    });
  }

  listConversations() {
    let params = angular.copy(this.queryParams);
    if (this.selectedTopicId) {
      params.filter.topicId = this.selectedTopicId;
    }

    if (params.filter.campId === 'both') {
      params.filter.campId = undefined;
    }

    return this.ConversationsTimeline.listConversations(params).then((conversations) => {
      this.viewModel.showLoadMoreButton = true;
    });
  }

  changeTopic(topicId) {
    let $topicPromise;

    if (topicId) {
      $topicPromise = this.TopicService.find(topicId).then((topicModel) => {
        return this.TopicService.getCursors(topicModel).then((topicCursors) => {
          this.topicCursors = topicCursors;
          this.selectedTopicId = topicId.toString();
        });
      });
    } else {
      $topicPromise = this.TopicService.findFirst().then((topicModel) => {
        return this.TopicService.getCursors(topicModel).then((topicCursors) => {
          this.topicCursors = topicCursors;
        });
      });
    }

    return $topicPromise.then(() => {
      return this.listConversations();
    });
  }

  selectConversation(conversation) {
    this._$rootScope.$emit('tweet:details', conversation.tweet);
  }

  updateConversation(conversation) {
    this.ConversationsService.update(conversation, { topic_id: conversation.topic_id }).then(() => {
      this.Notifications.success('Contribution topic changed');
    }).catch(() => {
      this.Notifications.error('Contribution topic update failed')
    });
  }

  generateConversationTitle(conversation) {
    let maxTitleHandles = 3;
    let title = [];

    if (conversation.contributors.length <= maxTitleHandles) {
      conversation.contributors.map(function (handle) {
        title.push(`@${handle}`);
      });
    } else {
      for (var i = 0; i < maxTitleHandles; i++) {
        title.push(`@${conversation.contributors[i]}`);
      }
      title.push(`+ ${conversation.contributors.length - maxTitleHandles} more`);
    }

    return title.join(', ');
  }

  loadMoreConversations($event) {
    if ($event) {
      $event.preventDefault();
    }

    // Increase page counter to load next page
    this.queryParams.page++;

    let params = angular.copy(this.queryParams);
    if (this.selectedTopicId) {
      params.filter.topicId = this.selectedTopicId;
    }

    if (params.filter.campId === 'both') {
      params.filter.campId = undefined;
    }

    return this.ConversationsTimeline.loadMoreConversations(params).then((conversations) => {
      if (conversations.length === 0) {
        this.viewModel.showLoadMoreButton = false;
      } else {
        if (conversations.length !== this.queryParams.pageSize) {
          this.viewModel.showLoadMoreButton = false;
        }
      }
    });
  }
};


module.exports = {
  templateUrl: 'views/conversations/conversations.html',
  controller: ConversationsController,
  bindings: {
    topics: '='
  }
};
