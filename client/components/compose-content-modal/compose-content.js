'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ComposeContentModalController {
  constructor($element, TweetTimelineService) {
    'ngInject';
    this._element = $element[0]
    this._$element = $element;
    this.TweetService = new TweetTimelineService();

    this.tweetForm = {
      content: null
    };
  }

  $onInit() {
    this._element.querySelector(config.selectors.composeContentModal)
      .addEventListener('hidden.bs.modal', this.onModalHide.bind(this));
  }

  $onDestroy() {
    this._element.querySelector(config.selectors.composeContentModal)
      .removeEventListener('hidden.bs.modal');
  }

  onModalHide() {
    console.log('modal hide');
  }

  submitContent() {
    this.tweetForm.content = null;

    let $createdTweet = { id: new Date().getTime() };
    this.TweetService.createTweet($createdTweet);
    this.onCreate($createdTweet);

    // Close modal
    $(this._element.querySelector(config.selectors.composeContentModal)).modal('hide');
  }
};


module.exports = {
  templateUrl: 'views/compose-content-modal/compose-content.html',
  controller: ComposeContentModalController,
  bindings: {
    onCreate: '&'
  }
};
