'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lock = require('./lock');

var _lock2 = _interopRequireDefault(_lock);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var _connector = require('./connector');

var _connector2 = _interopRequireDefault(_connector);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _timeout = require('./timeout');

var _timeout2 = _interopRequireDefault(_timeout);

var _context = require('@hoist/context');

var _context2 = _interopRequireDefault(_context);

var _model = require('@hoist/model');

var _model2 = _interopRequireDefault(_model);

var _bucket = require('./bucket');

var _bucket2 = _interopRequireDefault(_bucket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = {
  data: function data(type) {
    return new _data2.default(type);
  },
  user: new _user2.default(),
  events: new _events2.default(),
  connector: function connector(key) {
    return new _connector2.default(key);
  },
  log: _log2.default,
  lock: function CreateLock(name, timeout, callback) {
    var hoistLock = new _lock2.default();
    if (!callback && (0, _lodash.isFunction)(timeout)) {
      callback = timeout;
      timeout = null;
    }
    return _bluebird2.default.resolve(hoistLock.aquireLock(name, timeout)).nodeify(callback);
  },
  timeout: new _timeout2.default(),
  Context: _context2.default,
  _model: _model2.default,
  bucket: new _bucket2.default()
};

index.data._cleanup = function () {
  return _data2.default.disconnect();
};

index.event = index.events;

exports.default = index;


module.exports = index;
//# sourceMappingURL=index.js.map
