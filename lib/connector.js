'use strict';
var errors = require('@hoist/errors');
var pipeline = require('@hoist/connector-pipeline')(require('@hoist/context'), require('@hoist/model'));
var logger = require('@hoist/logger');

function ConnectorApi(key) {
  if (!key) {
    throw new errors.connector.request.InvalidError();
  }
  this.connector = pipeline.loadConnector(key).bind(this);
}

ConnectorApi.prototype = {
  get: function () {
    var getArgs = arguments;
    var self = this;
    return self.connector.then(function (c) {
      return c.get.apply(c, getArgs);
    }).catch(function (err) {
      logger.error(err);
      throw err;
    });
  },
  put: function () {
    var putArgs = arguments;
    var self = this;
    return self.connector.then(function (c) {
      return c.put.apply(c, putArgs);
    }).catch(function (err) {
      logger.error(err);
      throw err;
    });
  },
  post: function () {
    var postArgs = arguments;
    var self = this;
    return self.connector.then(function (c) {
      return c.post.apply(c, postArgs);
    }).catch(function (err) {
      logger.error(err);
      throw err;
    });
  },
  delete: function () {
    var deleteArgs = arguments;
    var self = this;
    return self.connector.then(function (c) {
      return c.delete.apply(c, deleteArgs);
    }).catch(function (err) {
      logger.error(err);
      throw err;
    });
  },
  authorize: function (token, callback) {
    return this.connector.then(function (c) {
      return c.authorize(token);
    }).then(function () {
      return this;
    }).nodeify(callback);
  }
};

module.exports = function (key) {
  return new ConnectorApi(key);
};
