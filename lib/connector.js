'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _hoistErrors = require('@hoist/errors');

var _hoistErrors2 = _interopRequireDefault(_hoistErrors);

var _hoistConnectorPipeline = require('@hoist/connector-pipeline');

var _hoistConnectorPipeline2 = _interopRequireDefault(_hoistConnectorPipeline);

var _base_api = require('./base_api');

var _base_api2 = _interopRequireDefault(_base_api);

var _lodash = require('lodash');

var _hoistLogger = require('@hoist/logger');

var _hoistLogger2 = _interopRequireDefault(_hoistLogger);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

/**
 * Hoists API wrapper around connectors
 */

var ConnectorAPI = (function (_BaseAPI) {
  /**
   * create a new connector API
   * @param {string} key - the connector key
   */

  function ConnectorAPI(key) {
    _classCallCheck(this, ConnectorAPI);

    _get(Object.getPrototypeOf(ConnectorAPI.prototype), 'constructor', this).call(this);
    this._logger = _hoistLogger2['default'].child({
      cls: this.constructor.name
    });
    if (!key) {
      throw new _hoistErrors2['default'].connector.request.InvalidError();
    }
    this._pipeline = new _hoistConnectorPipeline2['default']();
    this._key = key;
    this._loadConnector();
  }

  _inherits(ConnectorAPI, _BaseAPI);

  _createClass(ConnectorAPI, [{
    key: '_loadConnector',
    value: function _loadConnector() {
      var _this2 = this;

      if (!this._connector) {
        this._connector = this._pipeline.loadConnector(this._key).then(function (c) {
          var methods = (0, _lodash.filter)((0, _lodash.functions)(c), function (property) {
            if (property.startsWith('_') || property === 'receiveBounce' || _this2[property]) {
              return false;
            } else {
              return true;
            }
          });
          methods.forEach(function (method) {
            /**
             * also has all methods of underlying connector
             */
            var _this = _this2;
            _this2[method] = function () {
              _this._logger.info('proxying method ' + method);
              if (typeof c[method] !== 'function') {
                throw new _hoistErrors2['default'].connector.request.UnsupportedError(method + ' method unsupported');
              }
              var callback = undefined;
              var args = Array.prototype.slice.call(arguments);
              if (typeof args[args.length - 1] === 'function') {
                callback = args.pop();
              }
              return _bluebird2['default'].resolve(c[method].apply(c, args)).nodeify(callback);
            };
          });
        });
      }
      return this._connector;
    }
  }]);

  return ConnectorAPI;
})(_base_api2['default']);

exports['default'] = ConnectorAPI;
module.exports = exports['default'];
//# sourceMappingURL=connector.js.map