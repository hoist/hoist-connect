'use strict';
var errors = require('hoist-errors');
var pipeline = require('hoist-connector-pipeline')(require('hoist-context'), require('hoist-model'));
var logger = require('hoist-logger');

function ConnectorApi(type, key) {
  if (!type || !key) {
    throw new errors.connector.request.InvalidError();
  }
  this.connector = pipeline.loadConnector(type, key);
}

ConnectorApi.prototype = {
  get: function () {
    var getArgs = arguments;
    logger.info('inside hoist-connect.connector.get');
    var self = this;
    return self.connector.then(function (c) {
      return c.get.apply(c, getArgs);
    });
  }
};

module.exports = function (type, key) {
  return new ConnectorApi(type, key);
};
