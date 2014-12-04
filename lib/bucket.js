'use strict';
var HoistErrors = require('hoist-errors');
var bucketPipeline = require('hoist-bucket-pipeline')(require('hoist-context'), require('hoist-model'));

function BucketApi() {
}

BucketApi.prototype.add = function (key, meta, callback) {
  if (callback) {
    return bucketPipeline.add(key, meta).nodeify(callback);
  }
  return bucketPipeline.add(key, meta);
};

BucketApi.prototype.set = function (key, create, callback) {
  if (!key) {
    throw new HoistErrors.bucket.InvalidError('No key specified to set current bucket');
  }
  if (callback) {
    return bucketPipeline.set(key, create).nodeify(callback);
  }
  return bucketPipeline.set(key, create);
};

BucketApi.prototype.get = function (key, callback) {
  if (callback) {
    return bucketPipeline.get(key).nodeify(callback);
  }
  return bucketPipeline.get(key);
};

BucketApi.prototype.getAll = function (callback) {
  if (callback) {
    return bucketPipeline.getAll().nodeify(callback);
  }
  return bucketPipeline.getAll();
};

BucketApi.prototype.each = function (fn, callback) {
  if (callback) {
    return bucketPipeline.each(fn).nodeify(callback);
  }
  return bucketPipeline.each(fn);
};

module.exports = new BucketApi();
