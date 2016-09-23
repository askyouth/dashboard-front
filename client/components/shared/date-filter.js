module.exports = function DateFilter($filter) {
  'ngInject';

  return function (input, format, timezone) {
    let dateObject = new Date(input);
    return $filter('date')(dateObject, format, timezone);
  }
}
