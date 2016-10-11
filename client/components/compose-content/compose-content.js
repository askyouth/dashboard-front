'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ComposeContentController {
  constructor($element, TweetService) {
    'ngInject';
    this._element = $element[0];
    this._$element = $element;
    this.TweetService = TweetService;

    this.tweetForm = {
      content: null
    };

    if (this.replyTo) {
      this.tweetForm.content = '@' + this.replyTo.user.screen_name + '&nbsp;';
    }

    this.onElementClickBind = this.onElementClick.bind(this);
    this.onElementKeydownBind = this.onElementKeydown.bind(this);
    this.onContentClickBind = this.onContentClick.bind(this);
    this.onToolbarClickBind = this.onToolbarClick.bind(this);
    this.onDocumentClickBind = this.onDocumentClick.bind(this);
  }

  $onInit() {
    let $contentInput = this._$element.find(config.selectors.CONTENT_INPUT);
    let $contentToolbar = this._$element.find(config.selectors.CONTENT_TOOLBAR);

    this._$element.on('click', this.onElementClickBind);
    this._$element.on('keydown', this.onElementKeydownBind);
    $contentInput.on('click', this.onContentClickBind)
    $contentToolbar.on('click', this.onToolbarClickBind);
  }

  $onDestroy() {
    let $contentInput = this._$element
      .find(config.selectors.CONTENT_INPUT)
    let $contentToolbar = this._$element.find(config.selectors.CONTENT_TOOLBAR);

    this._$element.off('click', this.onElementClickBind);
    this._$element.off('keydown', this.onElementKeydownBind);
    $contentInput.off('click', this.onContentClickBind)
    $contentToolbar.off('click', this.onToolbarClickBind);
  }

  onElementClick(e) {
    if (this._$element.hasClass(config.cssClasses.IS_FOCUSED)) {
      e.stopPropagation();
    }
  }

  onElementKeydown(e) {
    if (e.keyCode === 27 && this._$element.hasClass(config.cssClasses.IS_FOCUSED)) {
      e.stopPropagation();
    }
  }

  onContentClick(e) {
    e.stopPropagation();
    this._$element.addClass(config.cssClasses.IS_FOCUSED);

    setTimeout(() => {
      document.addEventListener('click', this.onDocumentClickBind);
    });
  }

  onToolbarClick(e) {
    e.stopPropagation();
  }

  onDocumentClick(e) {
    this._$element.removeClass(config.cssClasses.IS_FOCUSED);
    if (this.tweetForm.content) {
      this._$element.addClass(config.cssClasses.IS_DIRTY);
    } else {
      this._$element.removeClass(config.cssClasses.IS_DIRTY);
    }
    document.removeEventListener('click', this.onDocumentClickBind);
  }

  submitContent() {
    this.tweetForm.content = null;
    this._$element.removeClass(config.cssClasses.IS_FOCUSED);
    this._$element.removeClass(config.cssClasses.IS_DIRTY);

    let $createdTweet = { text: this.tweetForm.content };
    this.TweetService.createTweet($createdTweet);
    this.onCreate($createdTweet);
  }

};


module.exports = {
  templateUrl: 'views/compose-content/compose-content.html',
  controller: ComposeContentController,
  bindings: {
    replyTo: '=',
    onCreate: '&'
  }
};
