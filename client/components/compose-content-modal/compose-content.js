'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ComposeContentModalController {
  constructor($rootScope, $scope, $element, AuthService, TweetService) {
    'ngInject';
    this._$scope = $scope;
    this._$rootScope = $rootScope;
    this._$element = $element;
    this.TweetService = TweetService;

    this.tweetForm = {
      content: null
    };
    this.replyTweet = null;
  }

  $onInit() {
    this._$element.find(config.selectors.composeContentModal)
      .on('hidden.bs.modal', this.onModalHide.bind(this));

    this._$rootScope.$on('tweet:reply', (e, tweet) => {
      this.replyTweet = tweet;

      let mentions = [`@${tweet.user.screen_name}`];
      angular.forEach(tweet.entities.user_mentions, (userMention) => {
        mentions.push(`@${userMention.screen_name}`);
      });
      this.tweetForm.content = mentions.join(' ') + '&nbsp;';
      this.showModal()
    });
  }

  $onDestroy() {
    this._$element.find(config.selectors.composeContentModal)
      .on('hidden.bs.modal');
  }

  submitContent() {
    this.tweetForm.content = null;

    let $createdTweet = { id: new Date().getTime() };
    // this.TweetService.createTweet($createdTweet);
    this.onCreate($createdTweet);

    // Close modal
    this._$element.find(config.selectors.composeContentModal).modal('hide');
  }

  showModal() {
    this._$element.find(config.selectors.composeContentModal).modal('show');
  }

  hideModal() {
    this._$element.find(config.selectors.composeContentModal).modal('hide');
  }

  onModalHide() {
    this._$scope.$apply(() => {
      this.replyTweet = null;
      this.tweetForm.content = null;
    });
  }
};


module.exports = {
  templateUrl: 'views/compose-content-modal/compose-content.html',
  controller: ComposeContentModalController,
  bindings: {
    onCreate: '&'
  }
};
