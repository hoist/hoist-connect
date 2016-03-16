'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _errors = require('@hoist/errors');

var _errors2 = _interopRequireDefault(_errors);

var _connectorPipeline = require('@hoist/connector-pipeline');

var _connectorPipeline2 = _interopRequireDefault(_connectorPipeline);

var _base_api = require('./base_api');

var _base_api2 = _interopRequireDefault(_base_api);

var _lodash = require('lodash');

var _logger = require('@hoist/logger');

var _logger2 = _interopRequireDefault(_logger);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Hoists API wrapper around connectors
 */

var ConnectorAPI = function (_BaseAPI) {
  _inherits(ConnectorAPI, _BaseAPI);

  /**
   * create a new connector API
   * @param {string} key - the connector key
   */

  function ConnectorAPI(key) {
    _classCallCheck(this, ConnectorAPI);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ConnectorAPI).call(this));

    _this2._logger = _logger2.default.child({
      cls: _this2.constructor.name
    });
    if (!key) {
      throw new _errors2.default.connector.request.InvalidError();
    }
    _this2._pipeline = new _connectorPipeline2.default();
    _this2._key = key;
    _this2._loadConnector();
    return _this2;
  }

  _createClass(ConnectorAPI, [{
    key: '_loadConnector',
    value: function _loadConnector() {
      var _this3 = this;

      if (!this._connector) {
        this._connector = this._pipeline.loadConnector(this._key).then(function (c) {

          var methods = (0, _lodash.filter)((0, _lodash.functions)(c), function (property) {

            if (property.startsWith('_') || property === 'receiveBounce' || _this3[property]) {
              return false;
            } else {
              return true;
            }
          });
          //we should always show the rest params but they might return an error
          methods = methods.concat(['get', 'post', 'put', 'delete', 'authorize']);
          methods.forEach(function (method) {
            /**
             * also has all methods of underlying connector
             */
            var _this = _this3;
            _this3[method] = function () {
              _this._logger.info('proxying method ' + method);
              if (typeof c[method] !== 'function') {
                var methodType = _typeof(c[method]);
                _this._logger.warn({
                  methodType: methodType,
                  typeof: c
                }, 'tried to call an unsupported method');
                throw new _errors2.default.connector.request.UnsupportedError(method + ' method unsupported');
              }
              var callback = void 0;

              for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                params[_key] = arguments[_key];
              }

              if (typeof params[params.length - 1] === 'function') {
                callback = params.pop();
              }
              return _bluebird2.default.resolve(c[method].apply(c, params)).nodeify(callback);
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
      var _this4 = this;

      for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
      }

      return this._loadConnector().then(function () {
        return _this4.get.apply(_this4, params);
      });
    }
  }, {
    key: 'put',
    value: function put() {
      var _this5 = this;

      for (var _len3 = arguments.length, params = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        params[_key3] = arguments[_key3];
      }

      return this._loadConnector().then(function () {
        return _this5.put.apply(_this5, params);
      });
    }
  }, {
    key: 'post',
    value: function post() {
      var _this6 = this;

      for (var _len4 = arguments.length, params = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        params[_key4] = arguments[_key4];
      }

      return this._loadConnector().then(function () {
        return _this6.post.apply(_this6, params);
      });
    }
  }, {
    key: 'delete',
    value: function _delete() {
      var _this7 = this;

      for (var _len5 = arguments.length, params = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        params[_key5] = arguments[_key5];
      }

      return this._loadConnector().then(function () {
        return _this7.delete.apply(_this7, params);
      });
    }
  }, {
    key: 'authorize',
    value: function authorize() {
      var _this8 = this;

      for (var _len6 = arguments.length, params = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        params[_key6] = arguments[_key6];
      }

      return this._loadConnector().then(function () {
        return _this8.authorize.apply(_this8, params);
      });
    }
  }]);

  return ConnectorAPI;
}(_base_api2.default);

exports.default = ConnectorAPI;
//# sourceMappingURL=connector.js.map
