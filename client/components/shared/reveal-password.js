module.exports = function RevealPasswordDirective() {
  'ngInject';

  return {
    restrict: 'A',
    scope: {
      revealPassword: '='
    },

    link: function (scope, element) {
      var $revealWatcher = scope.$watch('revealPassword', function (newVal) {
        if (newVal) {
          element.attr('type', 'text');
        } else {
          element.attr('type', 'password');
        }
      });

      scope.$on('$destroy', function () {
        $revealWatcher();
      })
    }
  };
}