'use strict';
var BBPromise = require('bluebird');
var _ = require('lodash');

module.exports = function () {

  var args = Array.prototype.slice.call(arguments);
  var callback;
  if (_.isFunction(args[args.length - 1])) {
    callback = args.pop();
  }
  var log = {
    type: 'appLog',
    arguments: args
  };

  var cache = [];
  var message = JSON.stringify(log, function (key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        return '[Circular]';
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
  cache = null;
  console.log(message);

  //return promise for backwards compatibility

  return BBPromise.resolve(null).nodeify(callback);
};
