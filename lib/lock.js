'use strict';
var config = require('config');
var _ = require('lodash');
var BBPromise = require('bluebird');
var client;

function HoistLock(release) {
  this.release = release;
}

function getClient() {
  return client || (client = require('redis').createClient(config.get('Hoist.redis.port'),config.get('Hoist.redis.host')));
}



module.exports = function (name, timeout, callback) {

  var lock = require('redis-lock')(getClient());
  if (!callback && _.isFunction(timeout)) {
    callback = timeout;
    timeout = null;
  }
  timeout = timeout || 500;
  return new BBPromise(function (resolve) {
    lock(name, timeout, function (done) {
      resolve(new HoistLock(done));
    });
  }).nodeify(callback);
};
module.exports.clearClient = function () {
  if (client) {
    client.end();
    client = null;
  }
};
