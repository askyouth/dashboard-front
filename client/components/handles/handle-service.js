'use strict';

class HandleService {
  constructor($q, ApiService) {
    'ngInject';
    this._$q = $q;
    this.ApiService = ApiService;
  }

  handles(params, force) {
    if (force || !this._handles) {
      return this.ApiService.get('handles', { params }).then((response) => {
        if (params && params.page) {
          return response.data;
        } else {
          this._handles = response.data.handles;
          return response.data.handles;
        }
      });
    } else {
      let deferred = this._$q.defer();
      deferred.resolve(this._handles);
      return deferred.promise;
    }
  }

  list(params, force) {
    return this.handles(params, force);
  }

  find(id, params) {
    return this.ApiService.get(`handles/${id}`, { params }).then(function (response) {
      return response.data;
    });
  }

  create(username, campId) {
    return this.ApiService.post('handles', { username: username, camp_id: parseInt(campId, 10) }).then((response) => {
      let handle = response.data;

      if (this._handles) {
        this._handles.push(handle);
      } else {
        this._handles = [handle];
      }

      return handle;
    });
  }

  update(handle, data) {
    return this.ApiService.put(`handles/${handle.id}`, data).then(function (response) {
      return response.data;
    });
  }

  remove(handle) {
    return this.ApiService.delete(`handles/${handle.id}`);
  }

  followHandle(handle) {
    return this.ApiService.post(`handles/${handle.id}/follow`);
  }

  unfollowHandle(handle) {
    return this.ApiService.post(`handles/${handle.id}/unfollow`);
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

  checkHandleUser(user) {
    let deferred = this._$q.defer();
    this.handles().then((handles) => {
      let isHandleUser = false;
      let handleUser = null;

      angular.forEach(handles, (handle) => {
        if (handle.id === user.id) {
          isHandleUser = true;
          handleUser = handle;
        }
      });

      if (isHandleUser) {
        deferred.resolve(handleUser);
      } else {
        deferred.reject();
      }
    }).catch(() => {
      deferred.reject();
    })
    return deferred.promise;
  }
}

module.exports = HandleService;
  