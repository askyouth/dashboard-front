'use strict';
const config = require('./config.json');

/**
 * SearchController
 */
class SearchController {
  constructor($rootScope, $element, $state, SearchService) {
    'ngInject';
    this._$rootScope = $rootScope;
    this._$element = $element;
    this._$state = $state;
    this._SearchService = SearchService;
  }

  $onInit() {
    this.searchForm = {
      query: null,
      hasResults: false
    };

    this.searchResults = {
      handles:  [],
      topics:   [],
      tweets:   []
    };
  }

  $onDestroy() {

  }

  onSearchChange($event) {
    console.log(this.searchForm);

    this._SearchService.search(this.searchForm.query).then((results) => {
      console.log(results);

      this.searchResults.handles = results.handles;
      this.searchResults.topics = results.topics;
      this.searchResults.tweets = results.tweets;
      this.hasResults();

    }).catch((err) => {
      console.log(err);
    })
  }

  hasResults() {
    let hasResults = false;

    if (this.searchResults.handles.length > 0) {
      hasResults = true;
    }

    if (this.searchResults.topics.length > 0) {
      hasResults = true;
    }

    if (this.searchResults.tweets.length > 0) {
      hasResults = true;
    }

    this.searchForm.hasResults = hasResults;
    return hasResults;
  }

  resetSearch() {
    this.searchResults.handles.length = 0
    this.searchResults.topics.length = 0;
    this.searchResults.tweets.length = 0;
    this.searchForm.query = null;
    this.hasResults();
  }

  goToHandle(handle) {
    this._$state.go('handle', { id: handle.id });
    this.resetSearch();
  }

  goToTopic(topic) {
    this._$state.go('topic', { id: topic.id });
    this.resetSearch();
  }

  showTweetDetails(tweet) {
    this.resetSearch();
    this._$rootScope.$emit('tweet:details', tweet);
  }
};


module.exports = {
  replace: true,
  transclude: true,

  template:
    `<div class="main-search">
      <input class="form-control main-search__input" 
        ng-model="$ctrl.searchForm.query" 
        ng-model-options="{ 'debounce': 1000 }" 
        ng-change="$ctrl.onSearchChange()" 
        placeholder="Search anything" 
        type="text" />

      <div class="main-search__results main-search-results" ng-if="$ctrl.searchForm.hasResults">
        <div class="main-search-results__group" ng-if="$ctrl.searchResults.handles.length">
          <div class="main-search-results__title">Handles</div>
          <ul class="main-search-results__list">
            <li class="main-search-results__item" ng-repeat="handle in $ctrl.searchResults.handles" ng-click="$ctrl.goToHandle(handle)">
              <div class="handle handle--inline">
                <span class="tweet__user">
                  <img ng-src="{{handle.profile.image}}" alt="" class="tweet__avatar">
                  <span class="tweet__user__name">{{handle.name}}</span>
                  <span class="tweet__user__username">@{{handle.username}}</span>
                </span><!-- /.tweet__user -->
              </div>
            </li>
          </ul>
        </div>

        <div class="main-search-results__group" ng-if="$ctrl.searchResults.topics.length">
          <div class="main-search-results__title">Topics</div>
          <ul class="main-search-results__list">
            <li class="main-search-results__item" ng-repeat="topic in $ctrl.searchResults.topics" ng-click="$ctrl.goToTopic(topic)">
              {{topic.name}}
            </li>
          </ul>
        </div>

        <div class="main-search-results__group" ng-if="$ctrl.searchResults.tweets.length">
          <div class="main-search-results__title">Tweets</div>
          <ul class="main-search-results__list">
            <li class="main-search-results__item" ng-repeat="tweet in $ctrl.searchResults.tweets" ng-click="$ctrl.showTweetDetails(tweet)">
              {{tweet.text}}
            </li>
          </ul>
        </div>
      </div>
    </div>`,
  controller: SearchController
};
