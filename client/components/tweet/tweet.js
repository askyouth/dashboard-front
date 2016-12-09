'use strict';
const config = require('./config.json');

/**
 * TweetController
 */
class TweetController {
  constructor($rootScope, $scope, $element, TweetService, HandleService, Notifications, USER_GROUPS) {
    'ngInject';
    this.TweetService = TweetService;
    this.Notifications = Notifications;
    this._$rootScope = $rootScope;
    this._$scope = $scope;
    this._element = $element[0];
    this._$element = $element;
    this._isMenuClick = false;
    this.HandleService = HandleService;
    this.USER_GROUPS = USER_GROUPS;

    this.onToolbarClickBind = this.onToolbarClick.bind(this);
    this.onTweetLinkClickBind = this.onTweetLinkClick.bind(this);

    if (this.tweet) {
      HandleService.handles().then((handles) => {
        angular.forEach(handles, (handle) => {
          if (handle.uid === this.tweet.user.id) {
            this.handleUser = handle;
          }
        });
      });
    }
  }

  $onInit() {
    let $tweetToolbar = this._element.querySelector(config.selectors.TWEET_TOOLBAR);
    $tweetToolbar.addEventListener('click', this.onToolbarClickBind);

    this._$element.find(config.selectors.TWEET_CONTENT).on('click', 'button', this.onTweetLinkClickBind);
    // this._$element.find(config.selectors.TWEET_MENU).on('click', 'button', this.onTweetMenuClick);
    this._$element.find(config.selectors.TWEET_MENU).find('.dropdown-toggle').dropdown();

    if (this.tweetDetails) {
      this._$element.addClass(config.cssClasses.IS_DETAILS);
    }

    if (this.tweetReply) {
      this._$element.addClass(config.cssClasses.IS_REPLY);
    }

    this._$tweetWatcher = this._$scope.$watch('$ctrl.tweet', (newVal, oldVal) => {
      if (newVal) {
        if (oldVal) {
          if (newVal.id !== oldVal.id) {
            this.isHandle()
          }
        } else {
          this.isHandle()
        }
      }
    });

    this.isHandle();
  }

  $onDestroy() {
    let $tweetToolbar = this._element.querySelector(config.selectors.TWEET_TOOLBAR);
    $tweetToolbar.removeEventListener('click', this.onToolbarClickBind);

    this._$element.find(config.selectors.TWEET_CONTENT).off('click', 'button', this.onTweetLinkClickBind);
    // this._$element.find(config.selectors.TWEET_MENU).off('click', 'button', this.onTweetMenuClick);

    if (this.tweetDetails) {
      this._$element.removeClass(config.cssClasses.IS_DETAILS);
    }

    if (this.tweetReply) {
      this._$element.removeClass(config.cssClasses.IS_REPLY);
    }

    this._$tweetWatcher();
  }

  onToolbarClick(e) {
    e.stopPropagation();
  }

  onTweetLinkClick(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }

  onTweetMenuClick(e) {
    $(this).dropdown('toggle');
  }

  replyToTweet($event) {
    if ($event) {
      $event.preventDefault();
    }
    this._$rootScope.$emit('tweet:reply', this.tweet);
  }

  retweetTweet($event) {
    if ($event) {
      $event.preventDefault();
    }

    if (this.tweet.retweeted) {
      return false;
    }

    this.TweetService.retweet(this.tweet).then(() => {
      this.Notifications.success('Tweet retweeted');
      this.tweet.retweeted = true;
    }).catch(() => {
      this.Notifications.error('Retweet failed');
    });
  }

  likeTweet($event) {
    if ($event) {
      $event.preventDefault();
    }

    if (this.tweet.favorited) {
      this.TweetService.unlike(this.tweet).then(() => {
        this.Notifications.success('Tweet unliked');
        this.tweet.favorited = false;
      }).catch(() => {
        this.Notifications.error('Tweet unlike failed');
      });
    } else {
      this.TweetService.like(this.tweet).then(() => {
        this.Notifications.success('Tweet liked');
        this.tweet.favorited = true;
      }).catch(() => {
        this.Notifications.error('Tweet like failed');
      })
    }
  }

  isHandle() {
    if (this.tweet) {
      let user = this.tweet.user;

      this.HandleService.checkHandleUser(user).then(() => {
        this._$element.removeClass(config.cssClasses.MISSING_HANDLE);
      }).catch(() => {
        this._$element.addClass(config.cssClasses.MISSING_HANDLE);
      });
    }
  }

  addToPolicyMakers() {
    this.HandleService.create(this.tweet.user.screen_name, this.USER_GROUPS.POLICY).then(() => {
      this.Notifications.success(`User ${this.tweet.user.name} added to "Policy makers".`);
      this._$element.removeClass(config.cssClasses.MISSING_HANDLE);
    }).catch(() => {
      this.Notifications.error(`Adding user ${this.tweet.user.name} to "Policy makers" failed.`);
    });
  }

  addToYouth() {
    this.HandleService.create(this.tweet.user.screen_name, this.USER_GROUPS.YOUTH).then(() => {
      this.Notifications.success(`User ${this.tweet.user.name} added to "Youth".`);
      this._$element.removeClass(config.cssClasses.MISSING_HANDLE);
    }).catch(() => {
      this.Notifications.error(`Adding user ${this.tweet.user.name} to "Youth" failed.`);
    });
  }
};


module.exports = {
  templateUrl: 'views/tweet/tweet.html',
  controller: TweetController,
  bindings: {
    tweet: '=',
    onSelect: '&',
    tweetDetails: '<',
    tweetReply: '<'
  }
};
