'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = Log;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * log out the object to be captured by the executor process
 */
function Log() {

  var args = Array.prototype.slice.call(arguments);
  var callback = void 0;
  if ((0, _lodash.isFunction)(args[args.length - 1])) {
    callback = args.pop();
  }
  var log = {
    type: 'appLog',
    arguments: args
  };

  var cache = [];
  var message = JSON.stringify(log, function (key, value) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
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

  return _bluebird2.default.resolve(null).nodeify(callback);
}
//# sourceMappingURL=log.js.map
