'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('@hoist/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

  this._logger = _logger2.default.child({
    cls: this.constructor.name
  });
};

exports.default = BaseAPI;
//# sourceMappingURL=base_api.js.map
