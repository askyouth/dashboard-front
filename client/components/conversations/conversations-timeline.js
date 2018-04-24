'use strict';
const transformContent = require('../tweet/tweet-transform.js');

module.exports = function ConversationsTimelineFactory(SocketConnection, ConversationsService) {
  'ngInject';

  return function ConversationsTimeline(config) {
    this.conversations = [];
    let _service = {
      config: config,
      queryParams: {}
    };

    this.updateConfig = (cfg) => {
      _service.config = cfg;
    };

    this.updateQueryParams = (queryParams) => {
      _service.queryParams = queryParams;
    }

    this.subscribe = () => {

    };

    this.listConversations = (params) => {
      if (!params.filter.contributors) {
        params.filter.contributors = undefined;
      }

      if (!params.filter.tweets) {
        params.filter.tweets = undefined;
      }

      if (!params.filter.search) {
        params.filter.search = undefined;
      }

      return ConversationsService.list(params).then((conversations) => {
        const count = conversations.count || 0;
        conversations = conversations.contributions || [];
        this.updateQueryParams(params);
        conversations.map(function (conversation) {
          transformContent(conversation.tweet);
        });
        this.conversations = conversations;
        this.count = count;
        return conversations;
      });
    };

    this.loadMoreConversations = (params) => {
      if (!params.filter.contributors) {
        params.filter.contributors = undefined;
      }

      if (!params.filter.tweets) {
        params.filter.tweets = undefined;
      }

      if (!params.filter.search) {
        params.filter.search = undefined;
      }

      return ConversationsService.list(params).then((conversations) => {
        conversations = conversations.contributions || [];

        this.updateQueryParams(params);
        conversations.map((conversation) => {
          transformContent(conversation.tweet);
          this.conversations.push(conversation);
        });
        return conversations;
      });
    };
  };
}