'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _hoistDataPipeline = require('@hoist/data-pipeline');

var _hoistDataPipeline2 = _interopRequireDefault(_hoistDataPipeline);

var _hoistErrors = require('@hoist/errors');

var _hoistErrors2 = _interopRequireDefault(_hoistErrors);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _base_api = require('./base_api');

var _base_api2 = _interopRequireDefault(_base_api);

/**
 * Hoists Data API
 */

var DataAPI = (function (_BaseAPI) {
  _inherits(DataAPI, _BaseAPI);

  /**
   * create a new data API
   * @param {string} [type] - the object type for this data api instance
   */

  function DataAPI(type) {
    _classCallCheck(this, DataAPI);

    _get(Object.getPrototypeOf(DataAPI.prototype), 'constructor', this).call(this);
    if (type) {
      this.setType(type);
    }
    this._pipeline = new _hoistDataPipeline2['default']();
  }

  _createClass(DataAPI, [{
    key: '_verify',
    value: function _verify() {
      var _this = this;

      return Promise.resolve().then(function () {
        if (!_this._type) {
          throw new _hoistErrors2['default'].data.request.InvalidError('you need to specify a type for the retrieval, call #setType([typename]) first');
        }
      });
    }

    /**
     * set the type of this Data API instance
     * @param {string} type - the object type for this data api instance
     */
  }, {
    key: 'setType',
    value: function setType(type) {
      this._type = type.toLowerCase();
    }

    /**
     * find objects matching the given query
     * @param {object} query - the mongo style query
     * @param {function(error: Error, objects: Array<object>)} [callback] - callback to call when objects have been found
     * @returns {Promise<Array<object>>} - a promise to have retrieved the objects
     */
  }, {
    key: 'find',
    value: function find(query, callback) {
      var _this2 = this;

      return _bluebird2['default'].resolve(this._verify().then(function () {
        return _this2._pipeline.find(_this2._type, query || {});
      })).nodeify(callback);
    }

    /**
     * find a single object with the matching id
     * @param {string} id - the object id
     * @param {function(error: Error, object: object)} [callback] - callback to call when object has been found
     * @returns {Promise<object>} - a promise to have retrieved the object
     */
  }, {
    key: 'findById',
    value: function findById(id, callback) {
      var _this3 = this;

      return _bluebird2['default'].resolve(Promise.resolve().then(function () {
        if (!id) {
          throw new _hoistErrors2['default'].data.request.InvalidError('you need to specify an id for #findById');
        }
      }).then(function () {
        return _this3.findOne({
          _id: id
        });
      })).nodeify(callback);
    }

    /**
     * find a single object matching the given query
     * @param {object} query - the mongo style query
     * @param {function(error: Error, object: object)} [callback] - callback to call when object has been found
     * @returns {Promise<object>} - a promise to have retrieved the object
     */
  }, {
    key: 'findOne',
    value: function findOne(query, callback) {
      var _this4 = this;

      return _bluebird2['default'].resolve(Promise.resolve().then(function () {
        if (!query) {
          throw new _hoistErrors2['default'].data.request.InvalidError('you need to specify a query for #findOne');
        }
      }).then(function () {
        return _this4._verify();
      }).then(function () {
        return _this4._pipeline.findOne(_this4._type, query);
      })).nodeify(callback);
    }

    /**
     * remove objects matching the given query
     * @param {object} query - the mongo style query
     * @param {function(error: Error)} [callback] - callback to call when objects have been removed
     * @returns {Promise} - a promise to have removed the objects
     */
  }, {
    key: 'remove',
    value: function remove(query, callback) {
      var _this5 = this;

      return _bluebird2['default'].resolve(Promise.resolve().then(function () {
        if (!query) {
          throw new _hoistErrors2['default'].data.request.InvalidError('you need to specify a query for #remove');
        }
      }).then(function () {
        return _this5._verify();
      }).then(function () {
        return _this5._pipeline.remove(_this5._type, query);
      })).nodeify(callback);
    }

    /**
     * remove a single object with a given id
     * @param {string} id - the object id
     * @param {function(error: Error)} [callback] - callback to call when object has been removed
     * @returns {Promise} - a promise to have removed the object
     */
  }, {
    key: 'removeOneById',
    value: function removeOneById(id, callback) {
      var _this6 = this;

      return _bluebird2['default'].resolve(Promise.resolve().then(function () {
        if (!id) {
          throw new _hoistErrors2['default'].data.request.InvalidError('you need to specify an id for #removeOneById');
        }
      }).then(function () {
        return _this6._verify();
      }).then(function () {
        return _this6._pipeline.remove(_this6._type, {
          _id: id
        });
      })).nodeify(callback);
    }

    /**
     * save an object
     * @param {object} json - raw object to save
     * @param {function(error: Error, object: object)} [callback] - callback to call when objects has been saved
     * @returns {Promise<object>} - a promise to have saved the object
     */
  }, {
    key: 'save',
    value: function save(json, callback) {
      var _this7 = this;

      if (!this._type && json._type) {
        this.setType(json._type);
      }
      return _bluebird2['default'].resolve(this._verify().then(function () {
        return _this7._pipeline.save(_this7._type, json);
      })).nodeify(callback);
    }
  }]);

  return DataAPI;
})(_base_api2['default']);

exports['default'] = DataAPI;
module.exports = exports['default'];
//# sourceMappingURL=data.js.map