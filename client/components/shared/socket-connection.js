module.exports = function SocketConnectionFactory(socketFactory) {
  'ngInject';
  var myIoSocket = io.connect('/some/path');

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
}
