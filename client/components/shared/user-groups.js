const CONSTANTS = exports.constants = {
  POLICY: 1,
  YOUTH: 2
}

const Groups = exports.groups = [
  { id: 1, name: 'Policy makers', short_name: 'PM', key: 'policy' },
  { id: 2, name: 'Youth', short_name: 'Y', key: 'youth' }
];

exports.directive = function ($timeout) {
  'ngInject';

  return {
    restrict: 'E',
    replace: true,
    template: `
      <span class="handle-group handle-group--{{group.key}}">
        <span class="handle-group__name">{{group.name}}</span>
        <span class="handle-group__short-name">{{group.short_name}}</span>
      </span>
    `,
    scope: {
      groupId: '='
    },

    link: function (scope, element, attrs) {
      $timeout(function () {
        if (angular.isDefined(attrs.shortName)) {
          element.addClass('handle-group--short');
        }
      });

      let $groupWatcher = scope.$watch('groupId', function (newVal) {
        angular.forEach(Groups, function (group) {
          if (scope.groupId === group.id) {
            scope.group = angular.copy(group);
          }
        });
      });

      scope.$on('$destroy', function () {
        $groupWatcher();
      })
    }
  };
}