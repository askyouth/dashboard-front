module.exports = function ($stateProvider) {
  'ngInject';

  /**
   * Component routes
   */

  $stateProvider.state('index', {
    url: '/',
    template: '<index-component></index-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    onEnter: function ($document) {
      'ngInject';
      $document[0].title = 'Home • Ask Youth';
    }
  })

  $stateProvider.state('handles', {
    url: '/handles',
    template: '<handles-component topics="$resolve.topics"></handles-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    resolve: {
      topics: function (TopicService) {
        'ngInject';
        return TopicService.list(true);
      }
    },
    onEnter: function ($document) {
      'ngInject';
      $document[0].title = 'Handles • Ask Youth';
    }
  })

  $stateProvider.state('handle', {
    url: '/handle/:id',
    template: '<handle-component></handle-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    resolve: {
      handleModel: function ($stateParams) {
        'ngInject';
        return {
          id: $stateParams.id
        };
      }
    },
    onEnter: function ($document, handleModel) {
      'ngInject';
      $document[0].title = handleModel.id + ' • Ask Youth';
    }
  })

  $stateProvider.state('topics', {
    url: '/topics',
    template: '<div></div>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    onEnter: function ($state, TopicService) {
      'ngInject';
      TopicService.findFirst().then(function (topic) {
        return $state.go('topic', { id: topic.id });
      });
    }
  })

  $stateProvider.state('manage_topics', {
    url: '/topics/manage',
    template: '<manage-topics-component topics="$resolve.topics"></manage-topics-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    resolve: {
      topics: function (TopicService) {
        'ngInject';
        return TopicService.list(true);
      }
    },
    onEnter: function ($document) {
      'ngInject';
      $document[0].title = 'Manage topics • Ask Youth';
    }
  })

  $stateProvider.state('topic', {
    url: '/topic/:id',
    template: '<topic-component topics="$resolve.topics" topic-cursors="$resolve.topicCursors"></topic-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    resolve: {
      topics: function (TopicService) {
        'ngInject';
        return TopicService.list(true);
      },
      topicCursors: function ($stateParams, TopicService) {
        'ngInject';
        return TopicService.find($stateParams.id).then(function (topicModel) {
          return TopicService.getCursors(topicModel);
        });
      }
    },
    onEnter: function ($document, topicCursors) {
      'ngInject';
      $document[0].title = topicCursors.currentTopic.id + ' • Ask Youth';
    }
  })

  $stateProvider.state('conversations', {
    url: '/conversations',
    template: '<conversations-component></conversations-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    onEnter: function ($document) {
      'ngInject';
      $document[0].title = 'Conversations • Ask Youth';
    }
  })

  $stateProvider.state('infographics', {
    url: '/infographics',
    template: '<infographics-component></infographics-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    onEnter: function ($document) {
      'ngInject';
      $document[0].title = 'Infographics • Ask Youth';
    }
  })

  /**
   * Auth routes
   */

   $stateProvider.state('profile', {
     url: '/profile',
     template: '<profile-component></profile-component>',
     data: { permissions: { only: ['user'] } },
     onEnter: function ($document) {
       'ngInject';
       $document[0].title = 'Profile • Ask Youth';
     }
   })

   $stateProvider.state('login', {
     url: '/login',
     template: '<login-component></login-component>',
     data: { permissions: { only: ['guest'], redirectTo: 'index' } },
     onEnter: function ($document) {
       'ngInject';
       $document[0].title = 'Login • Ask Youth';
     }
   })

   $stateProvider.state('logout', {
     url: '/logout',
     template: '<div></div>',
     controller: function ($state) {
       'ngInject';
       $state.go('login');
     },
     data: { permissions: { only: ['user'], redirectTo: 'login' } }
   })
};
