'use strict';

/**
 * IndexController
 */
class KeywordStatsModuleController {
  constructor($element, HandleService) {
    'ngInject';
    this._$element = $element;

    this.keywords = [
      { keyword: "Lorem ipsum", tweetCount: 503 },
      { keyword: "Dolor sit", tweetCount: 294 },
      { keyword: "Amet Consectetur", tweetCount: 221 },
      { keyword: "Adipsing elit", tweetCount: 189 }
    ];

    this.calculateKeywordsWidth(this.keywords);
  }

  calculateKeywordsWidth(keywords) {
    let topKeyword;

    angular.forEach(keywords, function (keyword) {
      if (topKeyword) {
        if (topKeyword.tweetCount < keyword.tweetCount) {
          topKeyword = keyword
        }
      } else {
        topKeyword = keyword;
      }
    });

    angular.forEach(keywords, function (keyword) {
      keyword.percentage = ((keyword.tweetCount / topKeyword.tweetCount) * 100).toFixed(2);
    });

    this.topKeyword = topKeyword;
    return keywords;
  }
};


module.exports = {
  template: `
    <div class="module keyword-stats">
      <div class="module__title">Popular keywords</div>

      <div class="keyword-stats__list">
        <div class="keyword-stats__item" ng-repeat="keyword in $ctrl.keywords">
          <div class="keyword-stats__meta">
            <div class="keyword-stats__title">{{keyword.keyword}}</div>
            <div class="keyword-stats__tweet-count">{{keyword.tweetCount}}</div>
          </div>
          <div class="keyword-stats__progress-bar" style="width: {{keyword.percentage}}%;"></div>
        </div>
      </div>
    </div>
  `,
  controller: KeywordStatsModuleController
};
