'use strict';

// Load only used application components
const indexComponent = require('./components/index');

// Initialize application
const app = angular.module('ask-youth', [
  // resources
  'ngSanitize', 'ngAnimate',
  'ui.router',
  'permission', 'permission.ui',
  'ngTagsInput',
  'toastr',
  'wu.masonry'
]);

// Configuration and router
app.config(require('./config.js'))
    .config(require('./router.js'))

// Route components
app.component('application', require('./components/application/application.js'))
app.component('indexComponent', require('./components/index/index.js'))
app.component('handlesComponent', require('./components/handles/handles.js'))
app.component('handleComponent', require('./components/handle/handle.js'))
app.component('topicComponent', require('./components/topic/topic.js'))
app.component('manageTopicsComponent', require('./components/manage-topics/manage-topics.js'))
app.component('manageTopicComponent', require('./components/manage-topic/manage-topic.js'))
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
app.component('handleListItem', require('./components/handles/handle-list-item.js'))
app.component('topicInfoModule', require('./components/topic/components/topic-info-module.js'));
app.component('topicStatsModule', require('./components/topic/components/topic-stats-module.js'));
app.component('infographicsWall', require('./components/infographics/infographics-wall.js'));

// Directives
app.directive('contenteditable', require('./components/shared/contenteditable.js'));
app.directive('contentInput', require('./components/shared/content-input.js'));
app.directive('select', require('./components/shared/select.js'));

// Services
app.service('TweetTimelineService', require('./components/tweet/tweet-timeline-service.js'));
app.service('TweetService', require('./components/tweet/tweet-service.js'));
app.service('TopicService', require('./components/topic/topic-service.js'));
app.service('HandleService', require('./components/handles/handle-service.js'));
app.service('PageService', require('./components/shared/page-service.js'));
app.service('ApiService', require('./components/shared/api-service.js'));
app.service('Notifications', require('./components/shared/notifications.js'));
app.factory('SocketConnection', require('./components/shared/socket-connection.js'));


// Filters
app.filter('dateFilter', require('./components/shared/date-filter.js'));
app.filter('capitalize', require('./components/shared/capitalize.js'));

// Run application
app.run(require('./roles.js')).run(function ($rootScope) {
  'ngInject';
  $rootScope.$on('$stateChangeStart', function () {
    angular.element('.modal-backdrop').remove();
  });
});
