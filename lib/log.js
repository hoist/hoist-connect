'use strict';
var loggly = require('loggly');
var context = require('hoist-context');
var BBPromise = require('bluebird');
var logger;

function createClient(application) {
  var loggers = [console];
  if (application && application.loggly) {
    console.log('creating loggly client', application.loggly);
    loggers.push(loggly.createClient({
      token: application.loggly.token,
      subdomain: application.loggly.domain
    }));
  }
  return {
    log: function (message) {
      loggers.forEach(function (logger) {
        logger.log(message);
      });
    }
  };
}

module.exports = function (message) {
  var getClient;
  if (logger) {
    getClient = BBPromise.resolve(logger);
  } else {
    getClient = context.get().then(function (context) {
      logger = createClient(context.application);
      return logger;
    });
  }
  return getClient.then(function (logger) {
    logger.log(message);
  });
};
