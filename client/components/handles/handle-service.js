'use strict';

class HandleService {
  constructor($q, ApiService) {
    'ngInject';
    this._$q = $q;
    this.ApiService = ApiService;
  }

  list(params) {
    return this.ApiService.get('handles', { params }).then(function (response) {
      return response.data;
    });
  }

  find(id, params) {
    return this.ApiService.get(`handles/${id}`, { params }).then(function (response) {
      return response.data;
    });
  }

  create(username) {
    return this.ApiService.post('handles', { username }).then(function (response) {
      return response.data;
    });
  }

  remove(handle) {
    return this.ApiService.delete(`handles/${handle.id}`);
  }

  assignTopic(handleId, topicId) {
    return this.ApiService.post(`handles/${handleId}/topics/${topicId}`);
  }

  listTopics(handleId) {
    return this.ApiService.get(`handles/${handleId}/topics`).then((response) => {
      return response.data;
    });
  }

  removeTopic(handleId, topicId) {
    return this.ApiService.delete(`handles/${handleId}/topics/${topicId}`);
  }
}

module.exports = HandleService;
