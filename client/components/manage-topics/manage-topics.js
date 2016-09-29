'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ManageTopicsController {
  constructor($element, $state, TopicService, Notifications) {
    'ngInject';
    this._$element = $element;
    this._$state = $state;
    this.TopicService = TopicService;
    this.Notifications = Notifications;

    this.topicForm = {
      title: null
    };

    this.onAddTopicButtonClickBind = this.onAddTopicButtonClick.bind(this);
    this.onRemoveTopicButtonClickBind = this.onRemoveTopicButtonClick.bind(this);
  }

  $onInit() {
    let $addTopicButton = this._$element.find(config.selectors.ADD_TOPIC_BUTTON);
    $addTopicButton.on('click', this.onAddTopicButtonClickBind);

    let $removeTopicButton = this._$element.find(config.selectors.REMOVE_TOPIC_BUTTON);
    $removeTopicButton.on('click', this.onRemoveTopicButtonClickBind);

    this.TopicService.findFirst().then((firstTopic) => {
      if (firstTopic) {
        this._$state.go('manage_topics.topic', { id: firstTopic.id });
      }
    });
  }

  $onDestroy() {
    let $addTopicButton = this._$element.find(config.selectors.ADD_TOPIC_BUTTON);
    $addTopicButton.off('click', this.onAddTopicButtonClickBind);

    let $removeTopicButton = this._$element.find(config.selectors.REMOVE_TOPIC_BUTTON);
    $removeTopicButton.off('click', this.onRemoveTopicButtonClickBind);
  }

  onAddTopicButtonClick() {
    this._$element.find(config.selectors.TOPICS_SIDEBAR).addClass(config.cssClasses.IS_ADDING_TOPIC);
    this._$element.find(config.selectors.TOPIC_INPUT).focus();
  }

  onRemoveTopicButtonClick() {
    this._$element.find(config.selectors.TOPICS_SIDEBAR).removeClass(config.cssClasses.IS_ADDING_TOPIC);
  }

  createTopic($event) {
    if ($event.keyCode === 13) {
      this.TopicService.create(this.topicForm.title).then((response) => {
        this.topicForm.title = null;
        this.Notifications.success('Topic created');

        this.topics.push(response.data);
      }).catch(() => {
        this.Notifications.error('Topic create failed');
      });
    }
  }
};


module.exports = {
  templateUrl: 'views/manage-topics/manage-topics.html',
  controller: ManageTopicsController,
  bindings: {
    topics: '='
  }
};
