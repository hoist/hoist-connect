'use strict';
var util = require('util');
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
  console.log(util.format('%j', log));

  //return promise for backwards compatibility

  return BBPromise.resolve(null).nodeify(callback);
};
