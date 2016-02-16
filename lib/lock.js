'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _redisLock = require('redis-lock');

var _redisLock2 = _interopRequireDefault(_redisLock);

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _redisSentinelClient = require('redis-sentinel-client');

var _redisSentinelClient2 = _interopRequireDefault(_redisSentinelClient);

var _base_api = require('./base_api');

var _base_api2 = _interopRequireDefault(_base_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var client = undefined;
/**
 * Hoists lock API
 */

var HoistLockAPI = function (_BaseAPI) {
  _inherits(HoistLockAPI, _BaseAPI);

  /**
   * create new lock
   */

  function HoistLockAPI() {
    _classCallCheck(this, HoistLockAPI);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HoistLockAPI).call(this));
  }

  /**
   * aquire a lock within the given timeout
   * @param {string} name - the key for the lock
   * @param {Number} [timeout=500] - the timeout to wait for the lock
   * @returns {Promise} - promise to have aquired the lock
   */


  _createClass(HoistLockAPI, [{
    key: 'aquireLock',
    value: function aquireLock(name, timeout) {
      timeout = timeout || 500;
      client = HoistLockAPI._getClient();
      var lock = (0, _redisLock2.default)(client);
      return new Promise(function (resolve) {
        lock(name, timeout, function (done) {
          /*
           * release the current lock
           */
          resolve({
            release: done
          });
        });
      });
    }
  }]);

  return HoistLockAPI;
}(_base_api2.default);

function createClient() {
  if (_config2.default.has('Hoist.redis.clustered') && _config2.default.get('Hoist.redis.clustered')) {
    return _redisSentinelClient2.default.createClient({
      host: _config2.default.get('Hoist.redis.host'),
      port: _config2.default.get('Hoist.redis.port'),
      masterName: _config2.default.get('Hoist.redis.masterName')
    });
  } else {
    return _redis2.default.createClient(_config2.default.get('Hoist.redis.port'), _config2.default.get('Hoist.redis.host'));
  }
}

HoistLockAPI._getClient = function () {
  return client || (client = createClient());
};
HoistLockAPI._clearClient = function () {
  if (client) {
    client.end();
    client = null;
  }
};

exports.default = HoistLockAPI;
//# sourceMappingURL=lock.js.map
