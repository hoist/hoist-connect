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

var _hoistBucketPipeline = require('@hoist/bucket-pipeline');

var _hoistBucketPipeline2 = _interopRequireDefault(_hoistBucketPipeline);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _base_api = require('./base_api');

var _base_api2 = _interopRequireDefault(_base_api);

/**
 * API entry for creating buckets
 * as with most API classes this acts more as a wrapper
 * over the Pipeline methods in {@link BucketPipeline}
 */

var BucketAPI = (function (_BaseAPI) {
  /**
   * create a new BucketAPI
   */

  function BucketAPI() {
    _classCallCheck(this, BucketAPI);

    _get(Object.getPrototypeOf(BucketAPI.prototype), 'constructor', this).call(this);
    this._pipeline = new _hoistBucketPipeline2['default']();
  }

  _inherits(BucketAPI, _BaseAPI);

  _createClass(BucketAPI, [{
    key: 'add',

    /**
     * add a new Bucket
     * @param {String} key - the key of the bucket to create, must be unique
     * @param {Object} [meta] - the meta data to save against the bucket
     * @param {function(error: Error, bucket: Bucket)} [callback] - callback to call when bucket has been created
     * @returns {Promise<Bucket>} - a promise to have created the bucket
     **/
    value: function add(key, meta, callback) {
      if (!callback && typeof meta === 'function') {
        callback = meta;
        meta = null;
      }
      if (!callback && !meta && typeof key === 'function') {
        callback = key;
        key = null;
        meta = null;
      }
      return _bluebird2['default'].resolve(this._pipeline.add(key, meta)).nodeify(callback);
    }
  }, {
    key: 'set',

    /**
     * set the current bucket in the Hoist context
     * @param {String} key - the key of the bucket to set
     * @param {Boolean} [create=false] - if the bucket isn't found should it be created?
     * @param {function(error: Error, bucket: Bucket)} [callback] - callback to call when bucket has been set
     * @returns {Promise<Bucket>} - a promise to have set the bucket
     */
    value: function set(key, create, callback) {
      if (!callback && typeof create === 'function') {
        callback = create;
        create = null;
      }
      if (!key || typeof key === 'function') {
        throw new _hoistErrors2['default'].bucket.InvalidError('No key specified to set current bucket');
      }
      return _bluebird2['default'].resolve(this._pipeline.set(key, create)).nodeify(callback);
    }
  }, {
    key: 'get',

    /**
     * get a bucket specified by the key
     * @param {String} key - the key of the bucket to get
     * @param {function(error: Error, bucket: Bucket)} [callback] - callback to call when bucket has been retrieved
     * @returns {Promise<Bucket>} - a promise to have found the bucket
     */
    value: function get(key, callback) {
      if (!callback && typeof key === 'function') {
        callback = key;
        key = null;
      }
      return _bluebird2['default'].resolve(this._pipeline.get(key)).nodeify(callback);
    }
  }, {
    key: 'remove',

    /**
     * remove/delete a bucket specified by the key
     * @param {String} key - the key of the bucket to remove
     * @param {function(error: Error)} [callback] - callback to call when bucket has been removed
     * @returns {Promise} - a promise to have removed the bucket
     */
    value: function remove(key, callback) {
      if (!callback && typeof key === 'function') {
        callback = key;
        key = null;
      }
      return _bluebird2['default'].resolve(this._pipeline.remove(key)).nodeify(callback);
    }
  }, {
    key: 'getAll',

    /**
     * get a list of all buckets in the organisation
     * @param {function(error: Error, buckets: Array<Bucket>)} [callback] - callback to call when list has been retrieved
     * @returns {Promise<Array<Bucket>>} - a promise to have retrieved the buckets
     */
    value: function getAll(callback) {
      return _bluebird2['default'].resolve(this._pipeline.getAll()).nodeify(callback);
    }
  }, {
    key: 'each',

    /**
     * apply a function to every bucket in the current application
     * @param {function(bucket: Bucket)} fn - function to apply to each bucket
     * @param {function(error: Error)} [callback] - callback to call when all buckets have been applied
     * @returns {Promise} - a promise to have run the function against each bucket
     */
    value: function each(fn, callback) {
      var _this = this;

      if (typeof fn !== 'function') {
        throw new _hoistErrors2['default'].bucket.InvalidError('No function given in each');
      }
      return _bluebird2['default'].resolve().then(function () {
        _this._pipeline.each(fn);
      }).nodeify(callback);
    }
  }, {
    key: 'saveMeta',

    /**
     * save/update metadata against a bucket
     * @param {Object} meta - the meta data to save against the bucket
     * @param {String} [key] - the key of the bucket to save data to, applies to current bucket if not supplied
     * @param {function(error: Error)} [callback] - callback to call when all buckets have been applied
     * @returns {Promise} - a promise to have applied the meta data
     */
    value: function saveMeta(meta, key, callback) {
      if (!callback && typeof key === 'function') {
        callback = key;
        key = null;
      }
      return _bluebird2['default'].resolve(this._pipeline.saveMeta(meta, key)).nodeify(callback);
    }
  }]);

  return BucketAPI;
})(_base_api2['default']);

exports['default'] = BucketAPI;
module.exports = exports['default'];
//# sourceMappingURL=bucket.js.map