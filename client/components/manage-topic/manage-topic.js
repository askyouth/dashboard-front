'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ManageTopicController {
  constructor($element, $state, TopicService, Notifications) {
    'ngInject';
    this._$state = $state;
    this._$element = $element;
    this.topicKeywords = [];
    this.TopicService = TopicService;
    this.Notifications = Notifications;
  }

  $onInit() {
    this.keywordsToTags();
  }

  $onDestroy() {

  }

  updateTopic() {
    this.tagsToKeywords();
    this.TopicService.update(this.topic).then((response) => {
      this.Notifications.success('Topic updated');
    }).catch((err) => {
      this.Notifications.error(err.data.message);
    });
  }

  deleteTopic() {
    this.TopicService.remove(this.topic).then((response) => {
      this.Notifications.success('Topic deleted');
      this._$state.go('manage_topics', null, { reload: true });
    }).catch((err) => {
      this.Notifications.error(err.data.message);
    });
  }

  keywordsToTags() {
    this.topicKeywords.length = 0;

    angular.forEach(this.topic.keywords, (keyword) => {
      this.topicKeywords.push({
        text: keyword
      });
    });
  }

  tagsToKeywords() {
    if (!angular.isArray(this.topic.keywords)) {
      this.topic.keywords = [];
    }
    this.topic.keywords.length = 0;

    angular.forEach(this.topicKeywords, (tag) => {
      this.topic.keywords.push(tag.text);
    });
  }
};


module.exports = {
  templateUrl: 'views/manage-topic/manage-topic.html',
  controller: ManageTopicController,
  bindings: {
    topic: '='
  }
};
