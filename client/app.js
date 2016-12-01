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
  'wu.masonry',
  'ngFileUpload',
  'btford.socket-io',
  'satellizer',
  'angular-storage'
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
app.component('conversationComponent', require('./components/conversation/conversation.js'))
app.component('infographicsComponent', require('./components/infographics/infographics.js'))
app.component('profileComponent', require('./components/profile/profile.js'))
app.component('loginComponent', require('./components/login/login.js'))

// Inline components
app.component('composeContentModal', require('./components/compose-content-modal/compose-content.js'));
app.component('composeContent', require('./components/compose-content/compose-content.js'));
app.component('timeline', require('./components/timeline/timeline.js'));
app.component('tweet', require('./components/tweet/tweet.js'));
app.component('tweetModal', require('./components/tweet-modal/tweet-modal.js'));
app.component('tweetMedia', require('./components/tweet/components/tweet-media.js'));
app.component('handleListItem', require('./components/handles/components/handle-list-item.js'))
app.component('handleTopics', require('./components/handles/components/handle-topics.js'))
app.component('handleStatsModule', require('./components/handle/components/handle-stats-module.js'))
app.component('topicInfoModule', require('./components/topic/components/topic-info-module.js'));
app.component('topicStatsModule', require('./components/topic/components/topic-stats-module.js'));
app.component('globalStatsModule', require('./components/index/components/global-stats-module.js'));
app.component('userKloutStatsModule', require('./components/index/components/user-klout-stats-module.js'));
app.component('conversationContributionsStatsModule', require('./components/index/components/conversation-contributions-stats-module.js'));
app.component('keywordStatsModule', require('./components/index/components/keyword-stats-module.js'));
app.component('mostTweetsStatsModule', require('./components/index/components/most-tweets-stats-module.js'));
app.component('conversationStatsModule', require('./components/conversations/components/conversation-stats-module.js'));
app.component('infographicsWall', require('./components/infographics/infographics-wall.js'));

// Directives
app.directive('contenteditable', require('./components/shared/contenteditable.js'));
app.directive('contentInput', require('./components/shared/content-input.js'));
app.directive('select', require('./components/shared/select.js'));
app.directive('ngKeyupEnter', require('./components/shared/ng-keyup-enter.js'));
app.directive('userGroup', require('./components/shared/user-groups.js').directive);

// Services
app.service('AuthService', require('./components/login/auth-service.js'));
app.service('TweetTimelineService', require('./components/timeline/timeline-service.js'));
app.service('TweetService', require('./components/tweet/tweet-service.js'));
app.service('TopicService', require('./components/topic/topic-service.js'));
app.service('HandleService', require('./components/handles/handle-service.js'));
app.service('ProfileService', require('./components/profile/profile-service.js'));
app.service('ProfileValidator', require('./components/profile/profile-validator.js').factory);
app.service('PageService', require('./components/shared/page-service.js'));
app.service('ApiService', require('./components/shared/api-service.js'));
app.service('Notifications', require('./components/shared/notifications.js'));
app.service('AppStore', require('./components/shared/store.js'));
app.factory('SocketConnection', require('./components/shared/socket-connection.js'));

// Filters
app.filter('dateFilter', require('./components/shared/date-filter.js'));
app.filter('capitalize', require('./components/shared/capitalize.js'));
app.filter('userInitials', require('./components/shared/user-initials.js'));
app.filter('tweetDate', require('./components/tweet/tweet-date.js'));

app.value('UserGroups', require('./components/shared/user-groups.js').groups);
app.constant('USER_GROUPS', require('./components/shared/user-groups.js').constants);

// Run application
app.run(require('./roles.js')).run(function ($rootScope, $state) {
  'ngInject';

  $rootScope.$on('$stateChangeStart', function () {
    angular.element('.modal-backdrop').remove();
  });

  $rootScope.$on('$stateChangeError', function () {
    $state.go('error-500');
  });

  $rootScope.$on('$stateNotFound', function () {
    $state.go('error-404');
  });
});
