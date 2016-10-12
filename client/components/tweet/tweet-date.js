module.exports = function DateFilter($filter) {
  'ngInject';

  return function (input, format, timezone) {
    let dateObject = new Date(input);

    if (isToday(dateObject)) {
      return $filter('date')(dateObject, 'hh:mm a');
    } else {
      return $filter('date')(dateObject, 'MMM d');
    }    
  }
}

function isToday(dateObject) {
  let today = new Date();

  return (today.getDate() === dateObject.getDate()    &&
          today.getMonth() === dateObject.getMonth()  &&
          today.getFullYear() === dateObject.getFullYear());
}