class ConversationsService {
  constructor(ApiService) {
    'ngInject';
    this._ApiService = ApiService;
  }

  list(params) {
    return this._ApiService.get('/contributions', { params }).then((response) => {
      return response.data;
    });
  }

  find(id, params) {
    return this._ApiService.get(`/contributions/${id}`, { params }).then((response) => {
      return response.data;
    });
  }

  update(contribution, data) {
    return this._ApiService.put(`/contributions/${contribution.id}`, data).then((response) => {
      return response.data;
    });
  }
}

module.exports = ConversationsService;