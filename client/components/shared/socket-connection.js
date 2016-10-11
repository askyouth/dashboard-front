module.exports = function SocketConnectionFactory(socketFactory, ApiService) {
  'ngInject';
  let apiSocket = io.connect(ApiService.$url('/'));

  return socketFactory({
    ioSocket: apiSocket
  });
}
