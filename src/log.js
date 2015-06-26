'use strict';
import Bluebird from 'bluebird';
import {
  isFunction
}
from 'lodash';

export function Log() {

  let args = Array.prototype.slice.call(arguments);
  let callback;
  if (isFunction(args[args.length - 1])) {
    callback = args.pop();
  }
  let log = {
    type: 'appLog',
    arguments: args
  };

  let cache = [];
  let message = JSON.stringify(log, function (key, value) {
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

  return Bluebird.resolve(null).nodeify(callback);
}
