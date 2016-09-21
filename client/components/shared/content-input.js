var defaultUsers = [
  { username: 'dgrubelic', name: 'Davor Grubelić', avatar: 'https://pbs.twimg.com/profile_images/745553396015505408/E7b52fGn_normal.jpg' },
  { username: 'viborc', name: 'Vibor Cipan', avatar: 'https://pbs.twimg.com/profile_images/378800000692640528/c74e221eec719bc38d2a131765f8efaf_normal.jpeg' },
  { username: 'darkoche', name: 'Darko Čengija', avatar: 'https://pbs.twimg.com/profile_images/2245549123/UXPassion_AmbPortraitsCOL-6b_normal.png' },
  { username: 'djelich', name: 'David Jelić', avatar: 'https://pbs.twimg.com/profile_images/1247583358/profile_normal.jpg' }
];

module.exports = function ContentInput() {
  'ngInject';

  return {
    restrict: "A",
    link: function(scope, element, attrs) {
      var users = angular.copy(defaultUsers);

      $(element).atwho({
        at: '@', data: users,

        insertTpl: '<span class="tweet__handle">${atwho-at}${username}</span>',
        displayTpl: [
          '<li class="handle">',
            '<span class="handle__avatar">',
              '<img src="${avatar}" alt="${name}" />',
            '</span>',
            '<span class="handle__name">${name}</span> ',
            '<span class="handle__username">@${username}</span>',
          '</li>'
        ].join(''),
        displayTimeout: 50,
        highlightFirst: true,
        searchKey: 'name'
      });

      scope.$on('$destroy', function () {
        $(element).atwho('destroy');
      })
    }
  };
};
