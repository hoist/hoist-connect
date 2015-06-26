'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _redisLock = require('redis-lock');

var _redisLock2 = _interopRequireDefault(_redisLock);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _base_api = require('./base_api');

var _base_api2 = _interopRequireDefault(_base_api);

var client = undefined;

var HoistLockAPI = (function (_BaseAPI) {
  function HoistLockAPI() {
    _classCallCheck(this, HoistLockAPI);

    _get(Object.getPrototypeOf(HoistLockAPI.prototype), 'constructor', this).call(this);
    this.client = HoistLockAPI._getClient();
    this.lock = (0, _redisLock2['default'])(this.client);
  }

  _inherits(HoistLockAPI, _BaseAPI);

  _createClass(HoistLockAPI, [{
    key: 'aquireLock',
    value: function aquireLock(name, timeout) {
      var _this = this;

      timeout = timeout || 500;
      return new Promise(function (resolve) {
        _this.lock(name, timeout, function (done) {
          this.release = done;
          resolve(this);
        });
      });
    }
  }]);

  return HoistLockAPI;
})(_base_api2['default']);

HoistLockAPI._getClient = function () {
  return client || (client = _redis2['default'].createClient(_config2['default'].get('Hoist.redis.port'), _config2['default'].get('Hoist.redis.host')));
};

exports['default'] = HoistLockAPI;
module.exports = exports['default'];
//# sourceMappingURL=lock.js.map