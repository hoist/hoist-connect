'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _hoistEventsPipeline = require('@hoist/events-pipeline');

var _hoistEventsPipeline2 = _interopRequireDefault(_hoistEventsPipeline);

var _lodash = require('lodash');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _base_api = require('./base_api');

var _base_api2 = _interopRequireDefault(_base_api);

var _hoistContext = require('@hoist/context');

/**
 * Hoists event API
 */

var _hoistContext2 = _interopRequireDefault(_hoistContext);

var EventsAPI = (function (_BaseAPI) {
  _inherits(EventsAPI, _BaseAPI);

  /**
   * create a new instance of the event api
   */

  function EventsAPI() {
    _classCallCheck(this, EventsAPI);

    _get(Object.getPrototypeOf(EventsAPI.prototype), 'constructor', this).call(this);
    this._pipeline = new _hoistEventsPipeline2['default']();
  }

  /**
   * raise a new event
   * @param {string} name - the name of the event
   * @param {object} payload - the event payload
   * @param {object} [contextOverride] - overides for the current context
   * @param {function(error: Error, objects: Event)} [callback] - callback to call when event has been raised
   * @returns {Promise<Event>} - a promise to have raised the Event
   */

  _createClass(EventsAPI, [{
    key: 'raise',
    value: function raise(name, payload, contextOverride, callback) {
      var _this = this;

      if (!callback && (0, _lodash.isFunction)(contextOverride)) {
        callback = contextOverride;
        contextOverride = null;
      }
      if (!callback && (0, _lodash.isFunction)(payload)) {
        callback = payload;
        payload = {};
      }
      return _bluebird2['default'].resolve(_hoistContext2['default'].get().then(function (context) {
        return _this._pipeline.raise(context, name, payload, contextOverride);
      })).nodeify(callback);
    }
  }]);

  return EventsAPI;
})(_base_api2['default']);

exports['default'] = EventsAPI;
module.exports = exports['default'];
//# sourceMappingURL=events.js.map