var defaultUsers = [
  { username: 'dgrubelic', name: 'Davor Grubelić', avatar: 'https://pbs.twimg.com/profile_images/745553396015505408/E7b52fGn_normal.jpg' },
  { username: 'viborc', name: 'Vibor Cipan', avatar: 'https://pbs.twimg.com/profile_images/378800000692640528/c74e221eec719bc38d2a131765f8efaf_normal.jpeg' },
  { username: 'darkoche', name: 'Darko Čengija', avatar: 'https://pbs.twimg.com/profile_images/2245549123/UXPassion_AmbPortraitsCOL-6b_normal.png' },
  { username: 'djelich', name: 'David Jelić', avatar: 'https://pbs.twimg.com/profile_images/1247583358/profile_normal.jpg' },
  { username: 'twitterapi', name: 'David Jelić', avatar: 'https://pbs.twimg.com/profile_images/1247583358/profile_normal.jpg' },
  { username: 'Hoophall', name: 'Basketball HOF', avatar: 'https://pbs.twimg.com/profile_images/2903581807/b77cac936eefb40c416985abcc04a687_normal.png' },
  { username: 'alleniverson', name: 'Allen Iverson', avatar: 'https://pbs.twimg.com/profile_images/762467096861081600/vUcqJGLT_normal.jpg' }
];

module.exports = function ContentInput($timeout) {
  'ngInject';

  return {
    restrict: "A",
    require: '?ngModel',
    link: function(scope, element, attrs, ngModel) {
      $timeout(function () {
        // if (ngModel.$modelValue) {
        //   element.html(
        //     `<span class="atwho-inserted" data-atwho-at-query="@${ngModel.$modelValue}">
        //       <span class="tweet__handle">@${ngModel.$modelValue}</span>
        //     </span>&nbsp;`
        //   );
        // }
      })

      var users = angular.copy(defaultUsers);

      const tributeInstance = new Tribute({
        trigger: '@',

        selectTemplate: function (item) {
          // return `<span class="tweet__handle">@${item.original.username}</span>`;
          return '@' + item.original.username;
        },

        menuItemTemplate: function (item) {
          return `<div class="handle" data-username="${item.original.username}">
            <span class="handle__avatar">
              <img src="${item.original.avatar}" alt="${item.original.name}" />
            </span>
            <span class="handle__name">${item.original.name}</span>
            <span class="handle__username">@${item.original.username}</span>
          </div>`
        },

        lookup: function (user) {
          return user.name + user.username;
        },

        values: users
      });

      // Attach Tribute instance to element
      tributeInstance.attach(element[0]);

      // $(element).atwho({
      //   at: '@', data: users,
      //
      //   // insertTpl: '<span class="tweet__handle">${atwho-at}${username}</span>',
      //   insertTpl: '${atwho-at}${username}',
      //   displayTpl: [
      //     '<li class="handle" data-username="${username}">',
      //       '<span class="handle__avatar">',
      //         '<img src="${avatar}" alt="${name}" />',
      //       '</span>',
      //       '<span class="handle__name">${name}</span> ',
      //       '<span class="handle__username">@${username}</span>',
      //     '</li>'
      //   ].join(''),
      //   limit: 2147483647,
      //   displayTimeout: 50,
      //   highlightFirst: true,
      //   searchKey: 'username'
      // });
    }
  };
};
