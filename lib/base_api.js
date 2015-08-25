'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _hoistLogger = require('@hoist/logger');

var _hoistLogger2 = _interopRequireDefault(_hoistLogger);

/**
 * a base class for api definitions
 * @access protected
 */

var BaseAPI =
/**
* create a new Base API
* sets up a logger member
* @abstract
*/
function BaseAPI() {
  _classCallCheck(this, BaseAPI);

  this._logger = _hoistLogger2['default'].child({
    cls: this.constructor.name
  });
};

exports['default'] = BaseAPI;
module.exports = exports['default'];
//# sourceMappingURL=base_api.js.map