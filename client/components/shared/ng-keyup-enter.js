module.exports = function NgKeyupEnter() {
  'ngInject';

  return {
    restrict: "A",
    scope: {
      keyupHandler: '&ngKeyupEnter'
    },

    link: function(scope, element, attrs) {
      element.on('keyup', onKeyupHandler);

      function onKeyupHandler(e) {
        var keyCode = e.keyCode;
        if (keyCode !== 13) return true;

        e.preventDefault();
        e.stopPropagation();

        scope.$apply(function () {
          scope.keyupHandler();
        });
      }

      scope.$on('$destroy', function () {
        element.off('keyup', onKeyupHandler);
      });
    }
  };
};
