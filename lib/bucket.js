'use strict';
var HoistErrors = require('hoist-errors');
var bucketPipeline = require('hoist-bucket-pipeline')(require('hoist-context'), require('hoist-model'));

function BucketApi() {
}

BucketApi.prototype.add = function (key, meta, callback) {
  return bucketPipeline.add(key, meta).nodeify(callback);
};

BucketApi.prototype.set = function (key, create, callback) {
  if (!key) {
    throw new HoistErrors.bucket.InvalidError('No key specified to set current bucket');
  }
  return bucketPipeline.set(key, create).nodeify(callback);
};

BucketApi.prototype.get = function (key, callback) {
  return bucketPipeline.get(key).nodeify(callback);
};

BucketApi.prototype.getAll = function (callback) {
  return bucketPipeline.getAll().nodeify(callback);
};

BucketApi.prototype.each = function (fn, callback) {
  return bucketPipeline.each(fn).nodeify(callback);
};

module.exports = new BucketApi();
