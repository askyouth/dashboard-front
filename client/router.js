module.exports = function ($stateProvider) {
  'ngInject';

  /**
   * Component routes
   */

  $stateProvider.state('error-404', {
    url: '/error/page-not-found',
    templateUrl: 'error/error-404.html',
    onEnter: function (PageService) {
      'ngInject';
      PageService.setTitle('Page not found!');
    }
  });

  $stateProvider.state('error-500', {
    url: '/error/samething-bad-happened',
    templateUrl: 'error/error-500.html',
    onEnter: function (PageService) {
      'ngInject';
      PageService.setTitle('Something bad happened!');
    }
  });

  $stateProvider.state('index', {
    url: '/',
    template: '<index-component></index-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    resolve: {
      cacheHandles: function (HandleService) {
        'ngInject';
        return HandleService.handles(true);
      }
    },
    onEnter: function (PageService) {
      'ngInject';
      PageService.setTitle('Home');
    }
  })

  $stateProvider.state('handles', {
    url: '/handles?group&page&pageSize',
    template: '<handles-component handles="$resolve.handles" topics="$resolve.topics"></handles-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    resolve: {
      handles: function ($stateParams, HandleService) {
        'ngInject'
        let filter = {};
        let page = $stateParams.page ? parseInt($stateParams.page) : 1;
        let pageSize = $stateParams.pageSize ? parseInt($stateParams.pageSize) : 10;

        if ($stateParams.group) {
          filter.camp = $stateParams.group;
        }

        return HandleService.list({ page: page, pageSize: pageSize, filter: filter, sort: 'created_at', sortOrder: 'desc', related: '["topics"]' }, true);
      },
      topics: function (TopicService) {
        'ngInject';
        return TopicService.list();
      }
    },
    onEnter: function (PageService) {
      'ngInject';
      PageService.setTitle('Handles');
    }
  })

  $stateProvider.state('handle', {
    url: '/handle/:id',
    template: '<handle-component handle="$resolve.handleModel"></handle-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    resolve: {
      cacheHandles: function (HandleService) {
        'ngInject';
        return HandleService.handles(true);
      },
      handleModel: function ($stateParams, HandleService) {
        'ngInject';
        return HandleService.find($stateParams.id, { related: '["topics"]' });
      }
    },
    onEnter: function (PageService, handleModel) {
      'ngInject';
      PageService.setTitle(handleModel.name);
    }
  })

  $stateProvider.state('topics', {
    url: '/topics',
    template: '<div></div>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    onEnter: function ($state, TopicService) {
      'ngInject';
      TopicService.findFirst().then(function (topic) {
        if (topic) {
          return $state.go('topic', { id: topic.id });
        } else {
          return $state.go('manage_topics');
        }
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
    onEnter: function (PageService) {
      'ngInject';
      PageService.setTitle('Manage topics');
    }
  })

  $stateProvider.state('manage_topics.topic', {
    url: '/:id',
    template: '<manage-topic-component topic="$resolve.topicModel"></manage-topic-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    resolve: {
      topicModel: function ($stateParams, TopicService) {
        'ngInject';
        return TopicService.find($stateParams.id, { related: '["handles"]' });
      }
    },
    onEnter: function (PageService, topicModel) {
      'ngInject';
      PageService.setTitle('Manage "' + topicModel.name + '" topic');
    }
  })

  $stateProvider.state('topic', {
    url: '/topic/:id',
    template: '<topic-component topics="$resolve.topics" topic-cursors="$resolve.topicCursors"></topic-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    resolve: {
      cacheHandles: function (HandleService) {
        'ngInject';
        return HandleService.handles(true);
      },
      topics: function (TopicService) {
        'ngInject';
        return TopicService.list();
      },
      topicCursors: function ($stateParams, TopicService) {
        'ngInject';
        return TopicService.find($stateParams.id).then(function (topicModel) {
          return TopicService.getCursors(topicModel);
        });
      }
    },
    onEnter: function (PageService, topicCursors) {
      'ngInject';
      PageService.setTitle(topicCursors.currentTopic.name);
    }
  })

  $stateProvider.state('conversations', {
    url: '/conversations',
    template: '<conversations-component topics="$resolve.topics"></conversations-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    resolve: {
      topics: function (TopicService) {
        'ngInject';
        return TopicService.list().then(function (topics) {
          topics.unshift({ id: null, name: 'All topics' });
          return topics;
        });
      },
    },
    onEnter: function (PageService) {
      'ngInject';
      PageService.setTitle('Conversations');
    }
  })

  $stateProvider.state('topic_conversations.topic_conversation', {
    url: '/:id',
    template: '<conversation-component topics="$resolve.conversation"></conversation-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    resolve: {
      cacheHandles: function (HandleService) {
        'ngInject';
        return HandleService.handles(true);
      },
      conversation: function () {
        'ngInject';
        return { id: 1, handles: [] };
      }
    },
    onEnter: function (PageService) {
      'ngInject';
      PageService.setTitle('Conversations');
    }
  })

  $stateProvider.state('infographics', {
    url: '/infographics/:month',
    template: '<infographics-component></infographics-component>',
    data: { permissions: { only: ['user'], redirectTo: 'login' } },
    resolve: {
      infographicsArchive: function (InfographicsService) {
        'ngInject';
        return InfographicsService.archive();
      }
    },
    onEnter: function ($state, $stateParams, $filter, PageService) {
      'ngInject';

      if (!$stateParams.month) {
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentMonth = ('0' + (currentDate.getMonth() + 1)).substr(-2);

        $state.go('infographics', {
          month: [currentYear, currentMonth].join('-')
        }, { reload: true, location: true });

      } else {
        PageService.setTitle($filter('dateFilter')($stateParams.month, 'MMMM yyyy') + ' infographics');
      }
    }
  })

  /**
   * Auth routes
   */
  
  $stateProvider.state('account_settings', {
    abstract: true,
    // template: '<account-settings-layout></account-settings-layout>'
    templateUrl: 'views/layouts/account-settings-layout.html'
  });

  $stateProvider.state('profile', {
    parent: 'account_settings',
    url: '/profile',
    template: '<profile-component settings="$resolve.settings"></profile-component>',
    data: { permissions: { only: ['user'] } },

    resolve: {
      settings: function (SettingsService) {
        'ngInject';
        return SettingsService.getSettings();
      }
    },

    onEnter: function (PageService) {
      'ngInject';
      PageService.setTitle('Profile');
    }
  })

  $stateProvider.state('users', {
    parent: 'account_settings',
    url: '/users?page&pageSize',
    template: '<users-component users="$resolve.users"></users-component>',
    data: { permissions: { only: ['user'] } },

    resolve: {
      users: function (UserService, $stateParams) {
        'ngInject';
        var page = 1, pageSize = 10;
        if ($stateParams.page) page = $stateParams.page;
        if ($stateParams.pageSize) pageSize = $stateParams.pageSize;

        return UserService.users({ page, pageSize });
      }
    },

    onEnter: function (PageService) {
      'ngInject';
      PageService.setTitle('Users');
    }
  })

  $stateProvider.state('lists', {
    parent: 'account_settings',
    url: '/lists',
    template: '<lists-component settings="$resolve.settings"></lists-component>',
    data: { permissions: { only: ['user'] } },

    resolve: {
      settings: function (SettingsService) {
        'ngInject';
        return SettingsService.getSettings();
      }
    },

    onEnter: function (PageService) {
      'ngInject';
      PageService.setTitle('Lists');
    }
  })

  $stateProvider.state('login', {
    url: '/login',
    template: '<login-component config="$resolve.config"></login-component>',
    data: { permissions: { only: ['guest'], redirectTo: 'index' } },

    resolve: {
      config: function (SettingsService) {
        'ngInject';
        return SettingsService.getConfig();
      }
    },

    onEnter: function (PageService) {
      'ngInject';
      PageService.setTitle('Login');
    }
  })

  $stateProvider.state('logout', {
    url: '/logout',
    template: '<div></div>',
    controller: function ($state, AuthService) {
      'ngInject';
      AuthService.logout().then(() => {
        $state.go('login');
      });
    },
    data: { permissions: { only: ['user'], redirectTo: 'login' } }
  })

  $stateProvider.state('forgotPassword', {
    url: '/forgot-password',
    template: '<forgot-password-component></forgot-password-component>',
    data: { permissions: { only: ['guest'], redirectTo: 'index' } },
    onEnter: function (PageService) {
      'ngInject';
      PageService.setTitle('I forgot my password!');
    }
  })

  $stateProvider.state('resetPassword', {
    url: '/reset-password?user_id&token',
    template: '<reset-password-component></reset-password-component>',
    data: { permissions: { only: ['guest'], redirectTo: 'index' } },
    onEnter: function (PageService, $state, $stateParams) {
      'ngInject';
      if (!$stateParams.user_id || !$stateParams.token) {
      return $state.go('login');
      }

      PageService.setTitle('Reset password');
    }
  })

  $stateProvider.state('setPassword', {
    url: '/set-password?user_id&token',
    template: '<set-password-component></set-password-component>',
    data: { permissions: { only: ['guest'], redirectTo: 'index' } },
    onEnter: function (PageService, $state, $stateParams) {
      'ngInject';
      if (!$stateParams.user_id || !$stateParams.token) {
      return $state.go('login');
      }

      PageService.setTitle('Set password');
    }
  })
};
