'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class HandleListItemController {
  constructor($element) {
    'ngInject';
    this._element = $element[0];
    this._$element = $element;

    this.selectedTopic = null;

    this.onAddTopicButtonClickBind = this.onAddTopicButtonClick.bind(this);
    this.onAddTopicCloseButtonClickBind = this.onAddTopicCloseButtonClick.bind(this);
  }

  $onInit() {
    let $addTopicButton = this._$element.find(config.selectors.ADD_TOPIC_BUTTON);
    $addTopicButton.on('click', this.onAddTopicButtonClickBind);

    let $addTopicCloseButton = this._$element.find(config.selectors.ADD_TOPIC_CLOSE);
    $addTopicCloseButton.on('click', this.onAddTopicCloseButtonClickBind);
  }

  $onDestroy() {
    let $addTopicButton = this._$element.find(config.selectors.ADD_TOPIC_BUTTON);
    $addTopicButton.off('click', this.onAddTopicButtonClickBind);

    let $addTopicCloseButton = this._$element.find(config.selectors.ADD_TOPIC_CLOSE);
    $addTopicCloseButton.off('click', this.onAddTopicCloseButtonClickBind);
  }

  deleteHandle() {
    this.onDelete($ctrl.handle);
  }

  addTopic() {
    if (!angular.isArray(this.handle.topics)) {
      this.handle.topics = [];
    };

    let topic;
    angular.forEach(this.topics, (existingTopic) => {
      if (existingTopic.id === this.selectedTopicId) {
        topic = angular.copy(existingTopic);
      }
    });

    if (topic) {
      let topicExists = false;
      angular.forEach(this.handle.topics, (existingTopic) => {
        if (topic.id === existingTopic.id) {
          topicExists = true;
        }
      });

      if (!topicExists) {
        this.handle.topics.push(topic);
        this.selectedTopicId = null;
        this._$element.removeClass(config.cssClasses.IS_ADDING_TOPIC);
      }
    }
  }

  deleteTopic(topic) {
    angular.forEach(this.handle.topics, (existingTopic, index) => {
      if (existingTopic.id === topic.id) {
        this.handle.topics.splice(index, 1);
      }
    })
  }

  onAddTopicButtonClick() {
    this._$element.addClass(config.cssClasses.IS_ADDING_TOPIC);
  }

  onAddTopicCloseButtonClick() {
    this._$element.removeClass(config.cssClasses.IS_ADDING_TOPIC);
  }
};


module.exports = {
  templateUrl: 'views/handles/handle-list-item.html',
  controller: HandleListItemController,
  bindings: {
    topics: '=',
    handle: '=',
    onDelete: '&'
  }
};
