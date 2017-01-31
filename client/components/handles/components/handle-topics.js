'use strict';
const config = require('../config.json');

/**
 * IndexController
 */
class HandleTopicsController {
  constructor($element, HandleService, TopicService, Notifications) {
    'ngInject';
    this._$element = $element;
    this.HandleService = HandleService;
    this.Notifications = Notifications;

    this.onAddTopicButtonClickBind = this.onAddTopicButtonClick.bind(this);
    this.onAddTopicCloseButtonClickBind = this.onAddTopicCloseButtonClick.bind(this);

    this.selectedTopic = null;
    this.availableTopics = [];
    this.checkAvailableTopics();

    TopicService.list(true).then((topics) => {
      this.topics = topics;
      this.checkAvailableTopics();
    });
  }

  $onInit() {
    this.selectedTopicId = null;

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

    if (this.availableTopics.length === 0) {
      this._$element.addClass(config.cssClasses.NO_AVAILABLE_TOPICS);
    } else {
      this._$element.removeClass(config.cssClasses.NO_AVAILABLE_TOPICS);
    }
  }

  onAddTopicButtonClick() {
    this._$element.addClass(config.cssClasses.IS_ADDING_TOPIC);
  }

  onAddTopicCloseButtonClick() {
    this._$element.removeClass(config.cssClasses.IS_ADDING_TOPIC);
  }

};


module.exports = {
  template: `
    <div class="handle__topics">
      <span class="label handle__topic" ng-repeat="topic in $ctrl.handle.topics">
        {{topic.name}}
        <span class="handle__topic__delete" ng-click="$ctrl.deleteTopic(topic)"><i class="glyphicon glyphicon-remove"></i></span>
      </span>

      <div class="btn-group handle__add-topic-menu-group">
        <select class="handle__add-topic-menu" ng-model="$ctrl.selectedTopicId" ng-change="$ctrl.addTopic()" data-none-selected-text="Select topic" data-live-search="true" data-style="btn-default btn-sm" ng-options="topic.id as topic.name for topic in $ctrl.availableTopics">
        </select>
        <button class="btn btn-default btn-sm handle__add-topic-menu-close" type="button"><i class="glyphicon glyphicon-remove"></i></button>
      </div><!-- /.handle__add-topic-menu -->

      <a href="#" class="handle__add-topic-button"> + add topic</a>
    </div><!-- /.handle__topics -->
  `,
  controller: HandleTopicsController,
  bindings: {
    handle: '='
  }
};
