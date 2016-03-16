'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _errors = require('@hoist/errors');

var _errors2 = _interopRequireDefault(_errors);

var _bucketPipeline = require('@hoist/bucket-pipeline');

var _bucketPipeline2 = _interopRequireDefault(_bucketPipeline);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _base_api = require('./base_api');

var _base_api2 = _interopRequireDefault(_base_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * API entry for creating buckets
 * as with most API classes this acts more as a wrapper
 * over the Pipeline methods in {@link BucketPipeline}
 */

var BucketAPI = function (_BaseAPI) {
  _inherits(BucketAPI, _BaseAPI);

  /**
   * create a new BucketAPI
   */

  function BucketAPI() {
    _classCallCheck(this, BucketAPI);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BucketAPI).call(this));

    _this._pipeline = new _bucketPipeline2.default();
    return _this;
  }

  /**
   * add a new Bucket
   * @param {String} key - the key of the bucket to create, must be unique
   * @param {Object} [meta] - the meta data to save against the bucket
   * @param {function(error: Error, bucket: Bucket)} [callback] - callback to call when bucket has been created
   * @returns {Promise<Bucket>} - a promise to have created the bucket
   **/


  _createClass(BucketAPI, [{
    key: 'add',
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
      return _bluebird2.default.resolve(this._pipeline.add(key, meta)).nodeify(callback);
    }

    /**
     * set the current bucket in the Hoist context
     * @param {String} key - the key of the bucket to set
     * @param {Boolean} [create=false] - if the bucket isn't found should it be created?
     * @param {function(error: Error, bucket: Bucket)} [callback] - callback to call when bucket has been set
     * @returns {Promise<Bucket>} - a promise to have set the bucket
     */

  }, {
    key: 'set',
    value: function set(key, create, callback) {
      if (!callback && typeof create === 'function') {
        callback = create;
        create = null;
      }
      if (!key || typeof key === 'function') {
        throw new _errors2.default.bucket.InvalidError('No key specified to set current bucket');
      }
      return _bluebird2.default.resolve(this._pipeline.set(key, create)).nodeify(callback);
    }

    /**
     * get a bucket specified by the key
     * @param {String} key - the key of the bucket to get
     * @param {function(error: Error, bucket: Bucket)} [callback] - callback to call when bucket has been retrieved
     * @returns {Promise<Bucket>} - a promise to have found the bucket
     */

  }, {
    key: 'get',
    value: function get(key, callback) {
      if (!callback && typeof key === 'function') {
        callback = key;
        key = null;
      }
      return _bluebird2.default.resolve(this._pipeline.get(key)).nodeify(callback);
    }

    /**
     * remove/delete a bucket specified by the key
     * @param {String} key - the key of the bucket to remove
     * @param {function(error: Error)} [callback] - callback to call when bucket has been removed
     * @returns {Promise} - a promise to have removed the bucket
     */

  }, {
    key: 'remove',
    value: function remove(key, callback) {
      if (!callback && typeof key === 'function') {
        callback = key;
        key = null;
      }
      return _bluebird2.default.resolve(this._pipeline.remove(key)).nodeify(callback);
    }

    /**
     * get a list of all buckets in the organisation
     * @param {function(error: Error, buckets: Array<Bucket>)} [callback] - callback to call when list has been retrieved
     * @returns {Promise<Array<Bucket>>} - a promise to have retrieved the buckets
     */

  }, {
    key: 'getAll',
    value: function getAll(callback) {
      return _bluebird2.default.resolve(this._pipeline.getAll()).nodeify(callback);
    }

    /**
     * apply a function to every bucket in the current application
     * @param {function(bucket: Bucket)} fn - function to apply to each bucket
     * @param {function(error: Error)} [callback] - callback to call when all buckets have been applied
     * @returns {Promise} - a promise to have run the function against each bucket
     */

  }, {
    key: 'each',
    value: function each(fn, callback) {
      var _this2 = this;

      if (typeof fn !== 'function') {
        throw new _errors2.default.bucket.InvalidError('No function given in each');
      }
      return _bluebird2.default.resolve().then(function () {
        _this2._pipeline.each(fn);
      }).nodeify(callback);
    }

    /**
     * save/update metadata against a bucket
     * @param {Object} meta - the meta data to save against the bucket
     * @param {String} [key] - the key of the bucket to save data to, applies to current bucket if not supplied
     * @param {function(error: Error)} [callback] - callback to call when all buckets have been applied
     * @returns {Promise} - a promise to have applied the meta data
     */

  }, {
    key: 'saveMeta',
    value: function saveMeta(meta, key, callback) {
      if (!callback && typeof key === 'function') {
        callback = key;
        key = null;
      }
      return _bluebird2.default.resolve(this._pipeline.saveMeta(meta, key)).nodeify(callback);
    }
  }]);

  return BucketAPI;
}(_base_api2.default);

exports.default = BucketAPI;
//# sourceMappingURL=bucket.js.map
