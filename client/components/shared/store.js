const config = require('../../../config');

class AuthStorage {
  constructor(store) {
    'ngInject';
    return store.getNamespacedStore(config.get('store.key'));
  }
}

module.exports = AuthStorage;