'use strict';
var data = require('./data.json');

class TopicService {
  constructor($q, ApiService) {
    'ngInject';
    this._$q = $q;
    this.ApiService = ApiService;
    this.topics = null;
  }

  list(force) {
    if ((this.topics === null) || force) {
      return this.ApiService.get('topics').then((response) => {
        this.topics = response.data;
        return this.topics;
      });
    } else {
      let deferred = this._$q.defer();
      deferred.resolve(this.topics);
      return deferred.promise;
    }
  }

  find(topicId, params) {
    return this.ApiService.get(`topics/${topicId}`, { params }).then(function (response) {
      return response.data;
    });
  }

  findFirst() {
    return this.list().then((topics) => {
      if (topics[0]) {
        return topics[0];
      } else {
        return null;
      }
    });
  }

  create(name) {
    return this.ApiService.post('topics', { name });
  }

  update(topic) {
    return this.ApiService.put(`topics/${topic.id}`, {
      name: topic.name,
      description: 'topic description',
      keywords: topic.keywords
    });
  }

  remove(topic) {
    return this.ApiService.delete(`topics/${topic.id}`);
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
