'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ComposeContentModalController {
  constructor($rootScope, $scope, $element, AuthService, TweetService, HandleService, Notifications, USER_GROUPS) {
    'ngInject';
    this._$scope = $scope;
    this._$rootScope = $rootScope;
    this._$element = $element;
    this.TweetService = TweetService;
    this.HandleService = HandleService;
    this.Notifications = Notifications;
    this.USER_GROUPS = USER_GROUPS;

    this.tweetForm = {
      content: null,
      image: null,
      hasImage: false
    };

    this.replyTweet = null;

    this.currentUser = AuthService.getUser();
  }

  $onInit() {
    this._$element.find(config.selectors.composeContentModal)
      .on('hidden.bs.modal', this.onModalHide.bind(this));

    this._$rootScope.$on('tweet:reply', (e, tweet) => {
      this.replyTweet = tweet;
      this.isHandle();

      let mentions = [`@${tweet.user.screen_name}`];
      angular.forEach(tweet.entities.user_mentions, (userMention) => {
        let username = `@${userMention.screen_name}`;
        if (mentions.indexOf(username) < 0) {
          mentions.push(username);
        }
      });
      this.tweetForm.content = mentions.join(' ') + '&nbsp;';
      this.showModal()
    });
  }

  $onDestroy() {
    this._$element.find(config.selectors.composeContentModal)
      .on('hidden.bs.modal');
  }

  selectImage($file) {
    if ($file) {
      this.tweetForm.image = $file;
      this.tweetForm.hasImage = true;
    }
  }

  removeImage() {
    this.tweetForm.image = null;
    this.tweetForm.hasImage = false;
  }

  submitContent($event) {
    if ($event) {
      $event.preventDefault();
    }

    let tweetData = {
      text: this.tweetForm.content
    };

    if (this.replyTweet) {
      tweetData.replyStatusId = this.replyTweet.id;
    }

    if (this.tweetForm.image) {
      tweetData.file = this.tweetForm.image; 
    }

    this.TweetService.create(tweetData).then((createdTweet) => {
      this.Notifications.success('Tweet successfully posted');

      this.tweetForm.content = null;
      this.tweetForm.image = null;
      this.tweetForm.hasImage = false;
      this.hideModal();
      this.onCreate({ $createdTweet: createdTweet });
    }).catch(() => {
      this.Notifications.error('Tweet post failed');
    });
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

  isHandle() {
    if (this.replyTweet) {
      let user = this.replyTweet.user;

      this.HandleService.checkHandleUser(user).then(() => {
        this._$element.removeClass(config.cssClasses.MISSING_HANDLE);
      }).catch(() => {
        this._$element.addClass(config.cssClasses.MISSING_HANDLE);
      });
    }
  }

  addHandleAsYouth() {
    if (this.replyTweet) {
      this.HandleService.create(this.replyTweet.user.screen_name, this.USER_GROUPS.YOUTH).then(() => {
        this.Notifications.success(`User ${this.replyTweet.user.name} added to "Youth".`);
        this.discardHandleControls();
      }).catch(() => {
        this.Notifications.error(`Adding user ${this.replyTweet.user.name} to "Youth" failed.`);
      });
    }
  }

  addHandleAsPolicyMaker() {
    if (this.replyTweet) {
      this.HandleService.create(this.replyTweet.user.screen_name, this.USER_GROUPS.POLICY).then(() => {
        this.Notifications.success(`User ${this.replyTweet.user.name} added to "Policy makers".`);
        this.discardHandleControls();
      }).catch(() => {
        this.Notifications.error(`Adding user ${this.replyTweet.user.name} to "Policy makers" failed.`);
      });
    }
  }

  discardHandleControls() {
    this._$element.removeClass(config.cssClasses.MISSING_HANDLE);
  }
};


module.exports = {
  templateUrl: 'views/compose-content-modal/compose-content.html',
  controller: ComposeContentModalController,
  bindings: {
    onCreate: '&'
  }
};
