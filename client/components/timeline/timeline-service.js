const config = require('./config.json');
const TweetsStack = require('./tweets-stack.js');
const transformContent = require('../tweet/tweet-transform.js');

module.exports = function TweetTimelineServiceFactory($q, $rootScope, $timeout, TweetService, SocketConnection) {
  'ngInject';

  return function TweetTimelineService(options) {
    const $serviceScope = $rootScope.$new(true);
    let service = this;

    this.contentStorage = new TweetsStack();
    this.pendingContentStorage = new TweetsStack();

    this.fetchTweets = function (opts) {
      opts = angular.extend(opts, options);
      return fetchTweets(opts);
    };

    this.loadMoreTweets = (params) => {
      return TweetService.list(params).then((tweets) => {
        return tweets.map((tweet) => {
          this.contentStorage.push(tweet);
          return tweet;
        });
      });
    };

    this.createTweet = (tweet) => {
      let deferred = $q.defer();
      let createdTweet = transformContent();

      $serviceScope.$broadcast('tweet:created', createdTweet);
      deferred.resolve(createdTweet);

      return deferred.promise;
    };

    this.getTweet = (tweetId) => {
      return getTweet(tweetId);
    };

    this.subscribe = function (eventName, handler) {
      return $serviceScope.$on(eventName, handler);
    };

    function initialize() {
      if (SocketConnection.connected) {
        SocketConnection.on('connect', function () {
          SocketConnection.on(config.events.TWEETS_NEW, onNewTweetEvent);

          // Load initial tweet set
          fetchTweets();
        });
      } else {
        SocketConnection.on(config.events.TWEETS_NEW, onNewTweetEvent);

        // Load initial tweet set
        fetchTweets();
      }
    }

    /**
     * Fetch initial bulk of tweets
     * @param  {Object} config Stream configuration
     * @return {Promise}
     */
    function fetchTweets(opts) {
      opts = opts || options;

      var deferred = $q.defer();
      SocketConnection.emit(config.events.TWEETS_FETCH, opts, (tweets) => {
        tweets.map((tweet) => {
          service.contentStorage.push(tweet);
        })
        $serviceScope.$emit(config.events.TWEETS_FETCH, tweets);
        deferred.resolve(filterTweets(tweets));
      });
      return deferred.promise;
    }

    /**
     * Get single tweet object and it's parent and replies
     * @param  {Number} tweetId Selected tweet id
     * @return {Promise}
     */
    function getTweet(tweetId) {
      var deferred = $q.defer();
      SocketConnection.emit(config.events.TWEETS_GET, { id: tweetId }, function (tweet) {
        if (tweet) {
          deferred.resolve(tweet);
        } else {
          deferred.reject({
            code: 404, message: 'Tweet not found'
          })
        }
      })
      return deferred.promise;
    }

    /**
     * Handle new tweet event
     * @param  {Object} tweet Incomming tweet object
     * @return {void}
     */
    function onNewTweetEvent(tweet) {
      let tweets = filterTweets(tweet);

      if (tweets && tweets[0]) {
        let tweet = tweets[0];

        service.pendingContentStorage.push(tweet);
        $serviceScope.$emit(config.events.TWEETS_NEW, tweet);
      }
    }

    /**
     * Filter tweets for current configuration
     * @param  {Array|Object} tweets Incomming tweets
     * @return {Array}        List of filtered tweets
     */
    function filterTweets(tweets) {
      tweets = angular.isArray(tweets) ? tweets : [tweets];

      return tweets.filter(function (tweet) {
        return transformContent(tweet);
      });
    }

    // Subscribe to socket connection
    initialize();
  }

}


