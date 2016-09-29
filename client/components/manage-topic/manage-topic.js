'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ManageTopicController {
  constructor($element) {
    'ngInject';
    this._$element = $element;
    this.topicKeywords = [];

    this.keywordsToTags();
  }

  $onInit() {

  }

  $onDestroy() {

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
      this.topicKeywords.push(tag.text);
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
