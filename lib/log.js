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
      var message = util.format.apply(this,arguments);
      loggers.forEach(function (logger) {
        logger.log(message);
      });
      process.emit('log',message);
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
