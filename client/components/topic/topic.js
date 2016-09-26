'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class TopicController {
  constructor($element, $state) {
    'ngInject';
    this._element = $element[0];
    this._$element = $element;
    this._$state = $state;

    /**
     * @TODO This should actually be first topic from the list by default
     * @type {String}
     */
    this.selectedTopicId = this.topicCursors.currentTopic.id;
  }

  $onInit() {

  }

  $onDestroy() {

  }

  changeTopic() {
    if (!this.selectedTopicId) return;
    this._$state.go('topic', { id: this.selectedTopicId });
  }
};


module.exports = {
  templateUrl: 'views/topic/topic.html',
  controller: TopicController,
  bindings: {
    topics: '=',
    topicCursors: '='
  }
};
