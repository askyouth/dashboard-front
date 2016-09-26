'use strict';
var data = require('./data.json');

class TopicService {
  constructor($q, $http) {
    'ngInject';
    this._$q = $q;
    this._$http = $http;
    this.topics = angular.copy(data);
  }

  list(force) {
    let deferred = this._$q.defer();
    if (force) this.topics = angular.copy(data);

    deferred.resolve(this.topics);
    return deferred.promise;
  }

  find(topicId) {
    let deferred = this._$q.defer();
    let topicObject;

    angular.forEach(this.topics, (topic) => {
      if (topic.id == topicId) {
        topicObject = topic;
      }
    });

    if (topicObject) {
      deferred.resolve(topicObject);
    } else {
      deferred.reject(new Error('Topic not found'));
    }
    return deferred.promise;
  }

  findFirst() {
    return this.list().then((topics) => {
      if (topics[0]) {
        return topics[0];
      } else {
        throw new Error('No topics found');
      }
    });
  }

  getCursors(currentTopic) {
    let currentTopicIndex = -1;
    let previousTopicIndex;
    let nextTopicIndex;

    return this.list().then((topics) => {
      // First we find current topic index
      angular.forEach(topics, (topic, index) => {
        if (topic.id == currentTopic.id) {
          currentTopicIndex = index;
        }
      });

      if (currentTopicIndex >= 0) {
        previousTopicIndex = currentTopicIndex - 1;
        nextTopicIndex = currentTopicIndex + 1;

        if (previousTopicIndex < 0) {
          previousTopicIndex = topics.length - 1;
        }

        if (nextTopicIndex >= topics.length) {
          nextTopicIndex = 0;
        }

        let cursors = {
          previousTopic: topics[previousTopicIndex] || null,
          currentTopic: currentTopic,
          nextTopic: topics[nextTopicIndex] || null
        };

        return cursors;
      } else {
        throw new Error('No topics found');
      }
    });
  }
}

module.exports = TopicService;
