const pipes = require('./pipes');

/**
 * Dummy tweets list
 * @type {Array}
 */
var data = require('./data.json');

module.exports = function TweetTimelineServiceFactory($q, $rootScope, $timeout) {
  'ngInject';

  return function TweetTimelineService(config) {
    const $serviceScope = $rootScope.$new(true);
    let service = this;

    this.createTweet = (tweet) => {
      let deferred = $q.defer();
      let createdTweet = transformContent();

      $serviceScope.$broadcast('tweet:created', createdTweet);
      deferred.resolve(createdTweet);

      return deferred.promise;
    };

    this.subscribe = function (eventName, handler) {
      return $serviceScope.$on(eventName, handler);
    };

    this.broadcast = function () {
      var eventName = Array.prototype.splice.call(arguments, 0, 1),
          args = arguments;
      return $serviceScope.$broadcast.apply($serviceScope, arguments);
    };

    this.emit = function () {
      var eventName = Array.prototype.splice.call(arguments, 0, 1),
          args = arguments;
      return $serviceScope.$emit.apply($serviceScope, arguments);
    };

    /**
     * @TODO: Remove after development
     */

    let simulateTwitterStream = () => {
      $serviceScope.$broadcast('tweet:interaction', transformContent());
      // $timeout(simulateTwitterStream, 15000);
    }

    $timeout(simulateTwitterStream, 500);
  }

}

function transformContent(tweet) {
  let contentId = new Date().getTime();
  let content = angular.copy(data[0]);

  content.id = contentId;
  content.id_str = contentId.toString();

  if (tweet) {
    content.text = tweet.text;
  }

  angular.forEach(pipes, function (pipe, name) {
    if (angular.isFunction(pipe)) {
      pipe(content);
    }
  });

  return content;
}
