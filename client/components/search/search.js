'use strict';
const config = require('./config.json');

/**
 * SearchController
 */
class SearchController {
  constructor($rootScope, $scope, $timeout, $document, $element, $state, SearchService) {
    'ngInject';
    this._$rootScope = $rootScope;
    this._$scope = $scope;
    this._$timeout = $timeout;
    this._$document = $document;
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

    this.onSearchInputClickBind = this.onSearchInputClick.bind(this);
    this.onSearchResultsWindowClickBind = this.onSearchResultsWindowClick.bind(this);
    this.onDocumentClickBind = this.onDocumentClick.bind(this);
  }

  $onDestroy() {
    this._$element[0].querySelector('.main-search__input').removeEventListener('click', this.onSearchInputClickBind);
  }

  onSearchChange($event) {
    if (!this.searchForm.query) return false;

    return this._SearchService.search(this.searchForm.query).then((results) => {
      this.searchResults.handles = results.handles;
      this.searchResults.topics = results.topics;
      this.searchResults.tweets = results.tweets;
      this.hasResults();

      if (this.searchForm.hasResults) {
        document.addEventListener('click', this.onDocumentClickBind);

        this._$element[0].querySelector('.main-search__input').addEventListener('click', this.onSearchInputClickBind);

        this._$timeout(() => {
          this._$element[0].querySelector('.main-search__results').addEventListener('click', this.onSearchResultsWindowClickBind);
        }, 10);
      }

    }).catch((err) => {
      
    })
  }

  onDocumentClick(e) {
    e.stopPropagation()
    document.removeEventListener('click', this.onDocumentClickBind);
    this._$scope.$apply(() => {
      this.resetSearch()
    })
  }

  onSearchInputClick(e) {
    e.stopPropagation();
  }

  onSearchResultsWindowClick(e) {
    e.stopPropagation();
  }

  hasResults() {
    let hasResults = false;

    if (this.searchResults.handles && this.searchResults.handles.length > 0) {
      hasResults = true;
    }

    if (this.searchResults.topics && this.searchResults.topics.length > 0) {
      hasResults = true;
    }

    if (this.searchResults.tweets && this.searchResults.tweets.length > 0) {
      hasResults = true;
    }

    this.searchForm.hasResults = hasResults;
    return hasResults;
  }

  resetSearch() {
    document.removeEventListener('click', this.onDocumentClickBind);
    
    this.searchResults.handles = null;
    this.searchResults.topics = null;
    this.searchResults.tweets = null;
    this.searchForm.query = null;
    this.hasResults();
  }

  goToHandle(handle) {
    this.resetSearch();
    this._$state.go('handle', { id: handle.id });
  }

  goToTopic(topic) {
    this.resetSearch();
    this._$state.go('topic', { id: topic.id });
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
