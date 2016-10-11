module.exports = function DateFilter() {
  'ngInject';

  return function (input) {
    if (!input) return input;
    
    let names = input.split(' ');
    let initials = [names[0][0]];

    if (names[1]) {
      initials.push(names[1][0]);
    }

    return initials.join('').toUpperCase();
  }
}
