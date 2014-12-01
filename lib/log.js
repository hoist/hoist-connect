'use strict';
var loggly = require('loggly');
var context = require('hoist-context');
var BBPromise = require('bluebird');
var Model = require('hoist-model');
var logger;
var util = require('util');

function ModelLogger(context) {
  this.context = context;
}
ModelLogger.prototype.log = function (message) {
  var logEvent = {
    environment: this.context.environment,
    message: message
  };
  if (this.context.application) {
    logEvent.application = this.context.application._id;
  }
  if (this.context.event) {
    logEvent.eventId = this.context.event.eventId;
    logEvent.correlationId = this.context.event.correlationId;
    logEvent.moduleName = this.context.event.moduleName;
  }
  new Model.ExecutionLogEvent(logEvent).saveAsync();
};

function createClient(context) {
  var loggers = [console];
  if (context.application && context.application.loggly) {
    loggers.push(loggly.createClient({
      token: context.application.loggly.token,
      subdomain: context.application.loggly.subdomain
    }));
    loggers.push(new ModelLogger(context));
  }
  return {
    log: function () {
      var message = util.format.apply(this, arguments);
      loggers.forEach(function (logger) {
        logger.log(message);
      });

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
      logger = createClient(context);
      return logger;
    });
  }
  return getClient.then(function () {
    logger.log.apply(logger, logArgs);
  }).nodeify(callback);
};
