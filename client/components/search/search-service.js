class SearchService {
  constructor(ApiService) {
    this._ApiService = ApiService;
  }

  search(query) {
    console.log(query);
    return this._ApiService.get('/search', { params: { q: query } }).then((response) => {
      return response.data;
    });
  }
}

module.exports = SearchService;
