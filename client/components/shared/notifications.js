module.exports = function (toastr) {
  'ngInject';

  this.success = function (message, title) {
    toastr.success(message, title);
  };

  this.info = function (message, title) {
    toastr.info(message, title);
  };

  this.warning = function (message, title) {
    toastr.warning(message, title);
  };

  this.error = function (message, title) {
    toastr.error(message, title);
  };

  this.showList = function (type, messages) {
    if (!angular.isArray(messages)) {
      messages = [messages];
    }

    if (angular.isFunction(this[type])) {
      angular.forEach(messages, (message) => {
        this[type](message);
      });
    }
  }
}
