module.exports = function RequestInterceptor($q, $injector) {
  'ngInject';

  return {
    responseError: function (rejection) {
      if (rejection.status === 401) {
        return $injector.get('AuthService').logout().then(() => {
          return $injector.get('$state').go('login').then(() => {
            return $q.reject(rejection);            
          });
        });
      }

      return $q.reject(rejection);
    }
  }
}