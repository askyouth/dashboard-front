'use strict';
const config = require('./config.json');

/**
 * TweetController
 */
class TweetController {
  constructor($rootScope, $element, TweetService, Notifications) {
    'ngInject';
    this.TweetService = TweetService;
    this.Notifications = Notifications;
    this._$rootScope = $rootScope;
    this._element = $element[0];
    this._$element = $element;
    this._isMenuClick = false;

    this.onToolbarClickBind = this.onToolbarClick.bind(this);
    this.onTweetLinkClickBind = this.onTweetLinkClick.bind(this);
  }

  $onInit() {
    let $tweetToolbar = this._element.querySelector(config.selectors.TWEET_TOOLBAR);
    $tweetToolbar.addEventListener('click', this.onToolbarClickBind);

    this._$element.find(config.selectors.TWEET_CONTENT).on('click', 'a', this.onTweetLinkClickBind);
    this._$element.find(config.selectors.TWEET_MENU).on('click', 'a', this.onTweetMenuClick);

    if (this.tweetDetails) {
      this._$element.addClass(config.cssClasses.IS_DETAILS);
    }

    if (this.tweetReply) {
      this._$element.addClass(config.cssClasses.IS_REPLY);
    }
  }

  $onDestroy() {
    let $tweetToolbar = this._element.querySelector(config.selectors.TWEET_TOOLBAR);
    $tweetToolbar.removeEventListener('click', this.onToolbarClickBind);

    this._$element.find(config.selectors.TWEET_CONTENT).off('click', 'a', this.onTweetLinkClickBind);
    this._$element.find(config.selectors.TWEET_MENU).off('click', 'a', this.onTweetMenuClick);

    if (this.tweetDetails) {
      this._$element.removeClass(config.cssClasses.IS_DETAILS);
    }

    if (this.tweetReply) {
      this._$element.removeClass(config.cssClasses.IS_REPLY);
    }
  }

  onToolbarClick(e) {
    e.stopPropagation();
  }

  onTweetLinkClick(e) {
    e.stopPropagation();
  }

  onTweetMenuClick(e) {
    $(this).dropdown('toggle');
  }

  replyToTweet($event) {
    if ($event) {
      $event.preventDefault();
    }
    
    console.log('reply')
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
