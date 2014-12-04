'use strict';
var HoistErrors = require('hoist-errors');
var bucketPipeline = require('hoist-bucket-pipeline')(require('hoist-context'), require('hoist-model'));

function BucketApi() {
}

BucketApi.prototype.add = function (key, meta) {
  return bucketPipeline.add(key, meta);
};

BucketApi.prototype.set = function (key, create) {
  if (!key) {
    throw new HoistErrors.bucket.InvalidError('No key specified to set current bucket');
  }
  return bucketPipeline.set(key, create);
};

BucketApi.prototype.get = function (key) {
  return bucketPipeline.get(key);
};

BucketApi.prototype.getAll = function () {
  return bucketPipeline.getAll();
};

BucketApi.prototype.each = function (fn) {
  return bucketPipeline.each(fn);
};

module.exports = new BucketApi();
