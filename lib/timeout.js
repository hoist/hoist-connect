'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _hoistContext = require('@hoist/context');

var _hoistContext2 = _interopRequireDefault(_hoistContext);

var _hoistErrors = require('@hoist/errors');

var _hoistErrors2 = _interopRequireDefault(_hoistErrors);

var _lodash = require('lodash');

var _base_api = require('./base_api');

var _base_api2 = _interopRequireDefault(_base_api);

/**
 * the Hoist Timeout API
 */

var TimeoutAPI = (function (_BaseAPI) {
  function TimeoutAPI() {
    _classCallCheck(this, TimeoutAPI);

    _get(Object.getPrototypeOf(TimeoutAPI.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(TimeoutAPI, _BaseAPI);

  _createClass(TimeoutAPI, [{
    key: 'reset',

    /**
     * reset the timeout from now
     * @param {Number} milliseconds - the amount of time to timeout from now (between 1 and 120000)
     * @returns {Promise}
     */
    value: function reset(milliseconds) {
      //upper bound at 2m
      //lower bound at 1s
      return Promise.resolve().then(function () {

        if (!milliseconds || !(0, _lodash.isNumber)(milliseconds) || milliseconds > 120000 || milliseconds < 1) {
          throw new _hoistErrors2['default'].timeout.InvalidTimeoutValueError();
        }

        return _hoistContext2['default'].get().then(function (context) {
          if (context.timeout) {
            clearTimeout(context.timeout.current);
            context.timeout.current = setTimeout(context.timeout.onTimeout, milliseconds);
          }
        });
      });
    }
  }]);

  return TimeoutAPI;
})(_base_api2['default']);

exports['default'] = TimeoutAPI;
module.exports = exports['default'];
//# sourceMappingURL=timeout.js.map