'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Log = Log;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

function Log() {

  var args = Array.prototype.slice.call(arguments);
  var callback = undefined;
  if ((0, _lodash.isFunction)(args[args.length - 1])) {
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

  return _bluebird2['default'].resolve(null).nodeify(callback);
}
//# sourceMappingURL=log.js.map