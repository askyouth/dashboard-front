'use strict';
const config = require('./config.json');

/**
 * IndexController
 */
class ComposeContentController {
  constructor($element) {
    'ngInject';
    this._element = $element[0];
    this._$element = $element;

    this.tweetForm = {
      content: null
    };
    this.onContentKeyupBind = this.onContentKeyup.bind(this);
    this.onContentFocusBind = this.onContentFocus.bind(this);
    this.onContentBlurBind = this.onContentBlur.bind(this);
  }

  $onInit() {
    let $contentInput = this._element
      .querySelector(config.selectors.CONTENT_INPUT)

    $contentInput.addEventListener('keyup', this.onContentKeyupBind)
    $contentInput.addEventListener('focus', this.onContentFocusBind)
    $contentInput.addEventListener('blur', this.onContentBlurBind)
  }

  $onDestroy() {
    let $contentInput = this._element
      .querySelector(config.selectors.CONTENT_INPUT)

    $contentInput.removeEventListener('keyup', this.onContentKeyupBind)
    $contentInput.removeEventListener('focus', this.onContentFocusBind)
    $contentInput.removeEventListener('blur', this.onContentBlurBind)
  }

  onContentFocus() {
    this._$element.addClass(config.cssClasses.IS_FOCUSED);
  }

  onContentBlur() {
    this._$element.removeClass(config.cssClasses.IS_FOCUSED);
    if (this.tweetForm.content) {
      this._$element.addClass(config.cssClasses.IS_DIRTY);
    } else {
      this._$element.removeClass(config.cssClasses.IS_DIRTY);
    }
  }

  onContentKeyup() {

  }

  submitContent() {
    this.tweetForm.content = null;
    this._$element.removeClass(config.cssClasses.IS_FOCUSED);
    this._$element.removeClass(config.cssClasses.IS_DIRTY);
  }

};


module.exports = {
  templateUrl: 'views/compose-content/compose-content.html',
  controller: ComposeContentController
};
