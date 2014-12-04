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

module.exports = new BucketApi();
