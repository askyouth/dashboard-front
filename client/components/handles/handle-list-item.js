'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class HandleListItemController {
  constructor($element, HandleService, Notifications) {
    'ngInject';
    this._element = $element[0];
    this._$element = $element;
    this.HandleService = HandleService;
    this.Notifications = Notifications;

    this.selectedTopic = null;
    this.availableTopics = [];
    this.checkAvailableTopics();

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
    this._$element.addClass(config.cssClasses.IS_REMOVING_HANDLE);
    this._$element.find(config.selectors.REMOVE_HANDLE_BUTTON).attr('disabled', true);

    this.HandleService.remove(this.handle).then(() => {
      this.Notifications.success('Handle removed');
      this.onDelete(this.handle);
    });
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
        this.HandleService.assignTopic(this.handle.id, topic.id).then((response) => {
          this.Notifications.success('Topic added');
          this.handle.topics.push(response.data);

          this.selectedTopicId = null;
          this._$element.removeClass(config.cssClasses.IS_ADDING_TOPIC);
          this.checkAvailableTopics();
        }).catch(() => {
          this.Notifications.error('Topic not added');
        });
      }
    }
  }

  deleteTopic(topic) {
    this.HandleService.removeTopic(this.handle.id, topic.id).then((response) => {
      this.Notifications.success('Topic removed');

      angular.forEach(this.handle.topics, (existingTopic, index) => {
        if (existingTopic && existingTopic.id === topic.id) {
          this.handle.topics.splice(index, 1);
        }
      })

      this.checkAvailableTopics();
    }).catch(() => {
      this.Notifications.error('Topic not removed');
    })
  }

  checkAvailableTopics() {
    this.availableTopics.length = 0;

    angular.forEach(this.topics, (topic) => {
      let topicExists = false;

      angular.forEach(this.handle.topics, (handleTopic) => {
        if (handleTopic.id === topic.id) {
          topicExists = true;
        }
      })

      if (!topicExists) {
        this.availableTopics.push(angular.copy(topic));
      }
    });
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
