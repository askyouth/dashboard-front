module.exports = function Capitalize() {
  'ngInject';
  return function (input) {
    if (!angular.isString(input)) return input;
    return input[0].toUpperCase() + input.substr(1);
  }
}
