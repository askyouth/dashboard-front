'use strict';
const config = require('./config.json');

/**
 * SearchController
 */
class SearchController {
  constructor($element) {
    'ngInject';
    this._$element = $element;
  }

  $onInit() {

  }

  $onDestroy() {

  }
};


module.exports = {
  template:
    `<div class="search">
      <input type="text" class="form-control header-search__input" placeholder="Search anything" />
    </div>`,
  controller: SearchController
};
