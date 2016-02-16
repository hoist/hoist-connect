'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _context = require('@hoist/context');

var _context2 = _interopRequireDefault(_context);

var _errors = require('@hoist/errors');

var _errors2 = _interopRequireDefault(_errors);

var _lodash = require('lodash');

var _base_api = require('./base_api');

var _base_api2 = _interopRequireDefault(_base_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * the Hoist Timeout API
 */

var TimeoutAPI = function (_BaseAPI) {
  _inherits(TimeoutAPI, _BaseAPI);

  function TimeoutAPI() {
    _classCallCheck(this, TimeoutAPI);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TimeoutAPI).apply(this, arguments));
  }

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
          throw new _errors2.default.timeout.InvalidTimeoutValueError();
        }

        return _context2.default.get().then(function (context) {
          if (context.timeout) {
            clearTimeout(context.timeout.current);
            context.timeout.current = setTimeout(context.timeout.onTimeout, milliseconds);
          }
        });
      });
    }
  }]);

  return TimeoutAPI;
}(_base_api2.default);

exports.default = TimeoutAPI;
//# sourceMappingURL=timeout.js.map
