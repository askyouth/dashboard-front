module.exports = function BootstrapSelect($document, $timeout) {
  'ngInject';

  var directive = {
    restrict: 'E',
    require: 'ngModel',
    scope: {
      onChange: '&onChange',
      onClose:  '&onClose',
      onOpen:   '&onOpen'
    },
    link: BootstrapSelectLink
  };

  function BootstrapSelectLink(scope, element, attrs, ngModel) {
    var $element = angular.element(element);

    $timeout(function () {
      $element.selectpicker();
      $element.on('change', onChangeEvent);
      $element.next().on('click', '.dropdown-toggle', onToggleEvent);
    });

    attrs.$observe('spTheme', function (val) {
      $timeout(function () {
        element.data('selectpicker').$button.removeClass(function (i, c) {
          return (c.match(/(^|\s)?btn-\S+/g) || []).join(' ');
        });
        element.selectpicker('setStyle', val);
      });
    });

    scope.$watch(function () {
      return ngModel.$modelValue;
    }, refresh, true);

    if (attrs.ngOptions && / in /.test(attrs.ngOptions)) {
      scope.$watch(attrs.ngOptions.replace('::', '').split(' in ')[1].split(' ')[0], refresh, true);
    }

    if (attrs.ngDisabled) {
      scope.$watch(attrs.ngDisabled, refresh, true);
    }

    scope.$on('$destroy', function (e) {
      $timeout(function () {
        $element.selectpicker('destroy');
        $element.next().off('click', '.dropdown-toggle', onToggleEvent);
      });
    });

    function refresh(newVal) {
      // update model if select is within child scope (e.g. inside ng-if)
      if (scope.$parent[attrs.ngModel] !== undefined && scope.$parent[attrs.ngModel] !== newVal) {
        scope.$parent[attrs.ngModel] = newVal;
      }

      scope.$applyAsync(function () {
        if (attrs.ngOptions && /track by/.test(attrs.ngOptions)) element.val(newVal);
        $element.selectpicker('refresh');
      });
    }

    function onChangeEvent(e) {
      scope.onChange();
    }

    function onToggleEvent(e) {
      var $bootstrapSelect = angular.element(this).parent();

      if (!$bootstrapSelect.hasClass('open')) {
        onOpenEvent(e);
      } else {
        onCloseEvent(e);
      }
    }

    function onCloseEvent(e) {
      // Unbind "on close" event
      angular.element($document).off('click', onCloseEvent);

      scope.onClose();
    }

    function onOpenEvent(e) {
      // Bind "on close" event handler for document click
      angular.element($document).on('click', onCloseEvent);

      scope.onOpen();
    }
  }

  return directive;
}
