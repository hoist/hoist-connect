'use strict';
var HoistErrors = require('hoist-errors');
var bucketPipeline = require('hoist-bucket-pipeline')(require('hoist-context'), require('hoist-model'));
var BBPromise = require('bluebird');

function BucketApi() {
}

BucketApi.prototype.add = function (key, meta, callback) {
  if(!callback && typeof meta === 'function'){
    callback = meta;
    meta = null;
  }
  if(!callback && !meta && typeof key === 'function'){
    callback = key;
    key = null;
    meta = null;
  }
  return bucketPipeline.add(key, meta).nodeify(callback);
};

BucketApi.prototype.set = function (key, create, callback) {
  if (!callback && typeof create === 'function') {
    callback = create;
    create = null;
  }
  return BBPromise.try(function () {
    if (!key || typeof key === 'function') {
      throw new HoistErrors.bucket.InvalidError('No key specified to set current bucket');
    }
  }).then(function () {
    return bucketPipeline.set(key, create);
  }).nodeify(callback);
};

BucketApi.prototype.get = function (key, callback) {
  if(!callback && typeof key === 'function'){
    callback = key;
    key = null;
  }
  return bucketPipeline.get(key).nodeify(callback);
};

BucketApi.prototype.getAll = function (callback) {
  return bucketPipeline.getAll().nodeify(callback);
};

BucketApi.prototype.each = function (fn, callback) {
  return bucketPipeline.each(fn).nodeify(callback);
};

module.exports = new BucketApi();
