class InfographicsService {
  constructor(ApiService, Upload) {
    'ngInject';
    this._ApiService = ApiService;
    this._Upload = Upload;
  }

  list(params) {
    return this._ApiService.get('/infographics', { params }).then((response) => {
      return response.data;
    });
  }

  upload(file) {
    return this._Upload.upload({
      url: this._ApiService.$url('/infographics'),
      method: 'POST',
      data: {
        file: file
      }
    }).then(function (response) {
      return response.data;
    });
  }

  remove(infographics) {
    return this._ApiService.delete(`/infographics/${infographics.id}`);
  }

  archive() {
    return this._ApiService.get('/infographics/archive').then(function (response) {
      return response.data;
    })
  }
}

module.exports = InfographicsService;