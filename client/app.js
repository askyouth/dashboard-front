'use strict';

// Load only used application components
const indexComponent = require('./components/index');

// Initialize application
const app = angular.module('ask-youth', [
  // resources
  'ngSanitize',
  'ui.router',
  'permission', 'permission.ui'
]);

// Configuration and router
app.config(require('./config.js'))
    .config(require('./router.js'))

// Route components
app.component('application', require('./components/application/application.js'))
app.component('indexComponent', require('./components/index/index.js'))
app.component('handlesComponent', require('./components/handles/handles.js'))
app.component('handleComponent', require('./components/handle/handle.js'))
app.component('topicsComponent', require('./components/topics/topics.js'))
app.component('conversationsComponent', require('./components/conversations/conversations.js'))
app.component('infographicsComponent', require('./components/infographics/infographics.js'))
app.component('profileComponent', require('./components/profile/profile.js'))
app.component('loginComponent', require('./components/login/login.js'))

// Inline components
app.component('composeContentModal', require('./components/compose-content-modal/compose-content.js'));
app.component('composeContent', require('./components/compose-content/compose-content.js'));
app.component('timeline', require('./components/timeline/timeline.js'));
app.component('tweet', require('./components/tweet/tweet.js'));
app.component('tweetModal', require('./components/tweet-modal/tweet-modal.js'));

// Directives
app.directive('contenteditable', require('./components/shared/contenteditable.js'));
app.directive('contentInput', require('./components/shared/content-input.js'));

// Services
app.service('TweetService', require('./components/tweet/tweet-service.js'));

// Filters
app.filter('dateFilter', require('./components/shared/date-filter.js'));

// Run application
app.run(require('./roles.js')).run(function ($rootScope) {
  'ngInject';
  $rootScope.$on('$stateChangeStart', function () {
    angular.element('.modal-backdrop').remove();
  });
});
