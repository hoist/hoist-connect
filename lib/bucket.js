'use strict';
var Bucket = require('hoist-model').Bucket;
var Context = require('hoist-context');
var HoistErrors = require('hoist-errors');
var BBPromise = require('bluebird');
var bucketPipeline = require('hoist-bucket-pipeline')(require('hoist-context'), require('hoist-model'));

function BucketApi() {
}

BucketApi.prototype.add = function () {

  var bucketArgs = Array.prototype.slice.call(arguments, 0);
  this.meta = null;
  this.key = null;
  this.meta = (bucketArgs.length > 1 && ((typeof (bucketArgs[bucketArgs.length - 1])) === 'object') ) ? bucketArgs.splice(-1, 1)[0] : this.meta;
  this.key = (bucketArgs.length > 1 && ((typeof (bucketArgs[bucketArgs.length - 1])) === 'string')) ? bucketArgs.splice(-1, 1)[0] : this.key;
  this.key = (bucketArgs.length === 1 && ((typeof (bucketArgs[0])) === 'string') ) ? bucketArgs[0] : this.key;
  this.meta = (bucketArgs.length === 1 && ((typeof (bucketArgs[0])) === 'object')) ? bucketArgs[0] : this.meta;
  if (this.key !== null ) {
    if(this.key.match(/^[0-9a-zA-Z_\-]{20}$/)) {
      return Bucket.findOneAsync(this.key)
      .bind(this)
      .then(function (bucket) {
        if (bucket) {
          throw new HoistErrors.bucket.InvalidError('A bucket with id '+this.key+' already exists');
        }
        return bucketPipeline.add(this.key, this.meta);
      });
    }
    return BBPromise.reject(new HoistErrors.bucket.InvalidError());
  } 
  this.key = null;
  return bucketPipeline.add(this.key, this.meta);
};

BucketApi.prototype.setCurrent = function (bucketId) {
  return Bucket.findOneAsync(bucketId)
  .then(function (bucket) {
    if (bucket) {
      return Context.get().bind(this).then(function (context) {
        context.bucket = bucketId;
      });
    }
    throw new HoistErrors.bucket.NotFoundError();
  });
  
};

module.exports = new BucketApi();
