'use strict';
var loggly = require('loggly');
var context = require('hoist-context');
var Model = require('hoist-model');

var hoistLogger = require('hoist-logger');
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
  hoistLogger.info({
    context: this.context,
    logEvent: logEvent
  }, 'about to save custom log');
  new Model.ExecutionLogEvent(logEvent).saveAsync().then(function () {
    hoistLogger.info('custom log saved ok');
  }).catch(function (err) {
    hoistLogger.alert(err, this.context.application._id, {
      context: this.context,
      logEvent: logEvent
    });
    hoistLogger.error(err, 'unable to save log');
  });
};

function createClient(context) {
  var loggers = [console];
  if (context.application && context.application.loggly) {
    loggers.push(loggly.createClient({
      token: context.application.loggly.token,
      subdomain: context.application.loggly.subdomain
    }));
  }
  loggers.push(new ModelLogger(context));
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

  getClient = context.get().then(function (context) {
    return createClient(context);
  });

  return getClient.then(function (client) {
    client.log.apply(client, logArgs);
  }).nodeify(callback);
};
