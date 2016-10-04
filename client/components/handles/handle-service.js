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

  find(id) {
    return this.ApiService.get(`handles/${id}`);
  }

  create(username) {
    return this.ApiService.post('handles', { username });
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
