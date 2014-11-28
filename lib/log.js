'use strict';
var loggly = require('loggly');
var context = require('hoist-context');
var BBPromise = require('bluebird');
var logger;
var util = require('util');

function createClient(application) {
  var loggers = [console];
  if (application && application.loggly) {
    loggers.push(loggly.createClient({
      token: application.loggly.token,
      subdomain: application.loggly.subdomain
    }));
  }
  return {
    log: function () {
      var message = util.format.apply(this, arguments);
      loggers.forEach(function (logger) {
        logger.log(message);
      });
      process.emit('log', message);
    }
  };
}

module.exports = function () {
  var logArgs = Array.prototype.slice.call(arguments, 0);
  var callback;
  //remove callback if it exists
  if (logArgs.length > 1 && ((typeof (logArgs[logArgs.length - 1])) === 'function')) {
    callback = logArgs.splice(-1, 1)[0];
  }
  var getClient;
  if (logger) {
    getClient = BBPromise.resolve(logger);
  } else {
    getClient = context.get().then(function (context) {
      logger = createClient(context.application);
      return logger;
    });
  }
  return getClient.then(function () {
    logger.log.apply(logger, logArgs);
  }).nodeify(callback);
};
