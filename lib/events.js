'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventsPipeline = require('@hoist/events-pipeline');

var _eventsPipeline2 = _interopRequireDefault(_eventsPipeline);

var _lodash = require('lodash');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _base_api = require('./base_api');

var _base_api2 = _interopRequireDefault(_base_api);

var _context = require('@hoist/context');

var _context2 = _interopRequireDefault(_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Hoists event API
 */

var EventsAPI = function (_BaseAPI) {
  _inherits(EventsAPI, _BaseAPI);

  /**
   * create a new instance of the event api
   */

  function EventsAPI() {
    _classCallCheck(this, EventsAPI);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EventsAPI).call(this));

    _this._pipeline = new _eventsPipeline2.default();
    return _this;
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
      var _this2 = this;

      if (!callback && (0, _lodash.isFunction)(contextOverride)) {
        callback = contextOverride;
        contextOverride = null;
      }
      if (!callback && (0, _lodash.isFunction)(payload)) {
        callback = payload;
        payload = {};
      }
      return _bluebird2.default.resolve(_context2.default.get().then(function (context) {
        return _this2._pipeline.raise(context, name, payload, contextOverride);
      })).nodeify(callback);
    }
  }]);

  return EventsAPI;
}(_base_api2.default);

exports.default = EventsAPI;
//# sourceMappingURL=events.js.map
