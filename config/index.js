var config;
switch (process.env.NODE_ENV) {
  case 'production':
    config = require('./production.json');
    break;
  case 'staging.json':
    config = require('./staging.json');
    break;
  case 'test':
    config = require('./test.json');
    break;
  case 'development':
    config = require('./development.json');
    break;
  default:
    config = require('./development.json');
    break;
}

exports.get = function (path) {
  var segmentList = path.split('.'),
      dest = config,
      configValue;

  for (var i = 0; i < segmentList.length; i++) {
    var segment = segmentList[i];

    if (!segment) break;
    if (!dest[segment]) break;
    if (Object.prototype.toString.call(dest[segment]) === '[object Object]') {
      dest = dest[segment];
    } else {
      configValue = dest[segment];
    }
  }

  return configValue;
};
