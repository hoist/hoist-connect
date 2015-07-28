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

var _hoistUserPipeline = require('@hoist/user-pipeline');

var _hoistUserPipeline2 = _interopRequireDefault(_hoistUserPipeline);

var _base_api = require('./base_api');

var _base_api2 = _interopRequireDefault(_base_api);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

/**
 * Hoists User API
 * @depreciated
 */

var UserAPI = (function (_BaseAPI) {
  /**
   * create a user API
   */

  function UserAPI() {
    _classCallCheck(this, UserAPI);

    _get(Object.getPrototypeOf(UserAPI.prototype), 'constructor', this).call(this);
    this._pipeline = new _hoistUserPipeline2['default']();
  }

  _inherits(UserAPI, _BaseAPI);

  _createClass(UserAPI, [{
    key: 'login',

    /**
     * log the user in
     * @params {string} username - the username
     * @params {password} password - the password
     */
    value: function login(username, password, callback) {
      if (!username) {
        throw new _hoistErrors2['default'].user.request.InvalidError('username is required');
      }
      if (!password) {
        throw new _hoistErrors2['default'].user.request.InvalidError('password is required');
      }
      return _bluebird2['default'].resolve(this._pipeline.login(username, password)).nodeify(callback);
    }
  }, {
    key: 'invite',
    value: function invite(userDetails, callback) {
      if (!userDetails) {
        throw new _hoistErrors2['default'].user.request.InvalidError('user details are required');
      }
      return _bluebird2['default'].resolve(this._pipeline.invite(userDetails)).nodeify(callback);
    }
  }]);

  return UserAPI;
})(_base_api2['default']);

exports['default'] = UserAPI;
module.exports = exports['default'];
//# sourceMappingURL=user.js.map