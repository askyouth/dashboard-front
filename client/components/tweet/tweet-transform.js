const pipes = require('./pipes');

module.exports = function transformContent(tweet) {
  angular.forEach(pipes, function (pipe, name) {
    if (angular.isFunction(pipe)) {
      pipe(tweet);
    }
  });

  return tweet;
}