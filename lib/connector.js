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
          //we should always show the rest params but they might return an error
          methods = methods.concat(['get', 'post', 'put', 'delete']);
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

              for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
              }

              if (typeof params[params.length - 1] === 'function') {
                callback = params.pop();
              }
              return _bluebird2['default'].resolve(c[method].apply(c, params)).nodeify(callback);
            };
          });
        });
      }
      return this._connector;
    }
  }, {
    key: 'init',
    value: function init() {
      return this._loadConnector();
    }
  }, {
    key: 'get',
    value: function get() {
      var _this3 = this;

      for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
      }

      return this._loadConnector().then(function () {
        return _this3.get.apply(_this3, params);
      });
    }
  }, {
    key: 'put',
    value: function put() {
      var _this4 = this;

      for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        params[_key3] = arguments[_key3];
      }

      return this._loadConnector().then(function () {
        return _this4.put.apply(_this4, params);
      });
    }
  }, {
    key: 'post',
    value: function post() {
      var _this5 = this;

      for (var _len4 = arguments.length, params = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        params[_key4] = arguments[_key4];
      }

      return this._loadConnector().then(function () {
        return _this5.post.apply(_this5, params);
      });
    }
  }, {
    key: 'delete',
    value: function _delete() {
      var _this6 = this;

      for (var _len5 = arguments.length, params = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        params[_key5] = arguments[_key5];
      }

      return this._loadConnector().then(function () {
        return _this6['delete'].apply(_this6, params);
      });
    }
  }]);

  return ConnectorAPI;
})(_base_api2['default']);

exports['default'] = ConnectorAPI;
module.exports = exports['default'];
//# sourceMappingURL=connector.js.map