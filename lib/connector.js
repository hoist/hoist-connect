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

var ConnectorAPI = (function (_BaseAPI) {
  function ConnectorAPI(key) {
    _classCallCheck(this, ConnectorAPI);

    _get(Object.getPrototypeOf(ConnectorAPI.prototype), 'constructor', this).call(this);
    if (!key) {
      throw new _hoistErrors2['default'].connector.request.InvalidError();
    }
    this._pipeline = new _hoistConnectorPipeline2['default']();
    this._key = key;
  }

  _inherits(ConnectorAPI, _BaseAPI);

  _createClass(ConnectorAPI, [{
    key: '_loadConnector',
    value: function _loadConnector() {
      return this._connector || (this._connector = this._pipeline.loadConnector(this._key));
    }
  }, {
    key: 'get',
    value: function get() {
      var _this = this;

      var getArgs = arguments;
      return this._loadConnector.then(function (c) {
        return c.get.apply(c, getArgs);
      })['catch'](function (err) {
        _this._logger.error(err);
        throw err;
      });
    }
  }, {
    key: 'put',
    value: function put() {
      var _this2 = this;

      var putArgs = arguments;
      return this._loadConnector.then(function (c) {
        return c.put.apply(c, putArgs);
      })['catch'](function (err) {
        _this2._logger.error(err);
        throw err;
      });
    }
  }, {
    key: 'post',
    value: function post() {
      var _this3 = this;

      var postArgs = arguments;
      return this._loadConnector.then(function (c) {
        return c.post.apply(c, postArgs);
      })['catch'](function (err) {
        _this3._logger.error(err);
        throw err;
      });
    }
  }, {
    key: 'delete',
    value: function _delete() {
      var _this4 = this;

      var deleteArgs = arguments;
      return this._loadConnector.then(function (c) {
        return c['delete'].apply(c, deleteArgs);
      })['catch'](function (err) {
        _this4._logger.error(err);
        throw err;
      });
    }
  }, {
    key: 'authorize',
    value: function authorize(token, callback) {
      var _this5 = this;

      return this._loadConnector.then(function (c) {
        return c.authorize(token);
      }).then(function () {
        return _this5;
      }).nodeify(callback);
    }
  }]);

  return ConnectorAPI;
})(_base_api2['default']);

exports['default'] = ConnectorAPI;
module.exports = exports['default'];
//# sourceMappingURL=connector.js.map