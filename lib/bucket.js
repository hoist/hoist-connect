'use strict';
var Bucket = require('hoist-model').Bucket;
var Context = require('hoist-context').Context;
// var HoistErrors = require('hoist-errors');
// var bucketPipeline = require('hoist-bucket-pipeline')(require('hoist-context'), require('hoist-model'));

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
  if (this.key !== null && (this.key.match(/^[0-9a-zA-Z_\-]{20}$/))) {
    return Bucket.findOneAsync(this.key)
    .bind(this)
    .then(function (bucket) {
      if (bucket) {
        // throw error as that id is already in use
         //     throw new HoistErrors......
        return (this.key = null);
      }
      return this.key;
    });
  } 
  this.key = null;
  // return bucketPipeline.add(this.key, this.meta);
};

BucketApi.prototype.setCurrent = function (bucketId) {
  // check if bucket id exists, then set the context
  // if not throw error
  return Bucket.findOneAsync(bucketId)
  .then(function (bucket) {
    if (bucket) {
      return Context.set({bucket: bucketId});
    }
    // throw new HoistErrors .......
  });
  
};

module.exports = new BucketApi();