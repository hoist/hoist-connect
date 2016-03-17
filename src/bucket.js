'use strict';
import Errors from '@hoist/errors';
import Pipeline from '@hoist/bucket-pipeline';
import Bluebird from 'bluebird';
import BaseAPI from './base_api';
import Context from '@hoist/context';
/**
 * API entry for creating buckets
 * as with most API classes this acts more as a wrapper
 * over the Pipeline methods in {@link BucketPipeline}
 */
class BucketAPI extends BaseAPI {
  /**
   * create a new BucketAPI
   */
  constructor() {
    super();
    this._pipeline = new Pipeline();
  }

  /**
   * add a new Bucket
   * @param {String} key - the key of the bucket to create, must be unique
   * @param {Object} [meta] - the meta data to save against the bucket
   * @param {function(error: Error, bucket: Bucket)} [callback] - callback to call when bucket has been created
   * @returns {Promise<Bucket>} - a promise to have created the bucket
   **/
  add(key, meta, callback) {
    if (!callback && typeof meta === 'function') {
      callback = meta;
      meta = null;
    }
    if (!callback && !meta && typeof key === 'function') {
      callback = key;
      key = null;
      meta = null;
    }
    return Bluebird.resolve(Context.get().then((context) => {
        return Promise.resolve(this._pipeline.add(context, key, meta));
      }))
      .nodeify(callback);
  }

  /**
   * set the current bucket in the Hoist context
   * @param {String} key - the key of the bucket to set
   * @param {Boolean} [create=false] - if the bucket isn't found should it be created?
   * @param {function(error: Error, bucket: Bucket)} [callback] - callback to call when bucket has been set
   * @returns {Promise<Bucket>} - a promise to have set the bucket
   */
  set(key, create, callback) {
    if (!callback && typeof create === 'function') {
      callback = create;
      create = null;
    }
    if (!key || typeof key === 'function') {
      throw new Errors.bucket.InvalidError('No key specified to set current bucket');
    }
    return Bluebird.resolve(Context.get().then((context) => {
        return Promise.resolve(this._pipeline.set(context, key, create));
      }))
      .nodeify(callback);
  }

  /**
   * get a bucket specified by the key
   * @param {String} key - the key of the bucket to get
   * @param {function(error: Error, bucket: Bucket)} [callback] - callback to call when bucket has been retrieved
   * @returns {Promise<Bucket>} - a promise to have found the bucket
   */
  get(key, callback) {
    if (!callback && typeof key === 'function') {
      callback = key;
      key = null;
    }
    return Bluebird.resolve(Context.get().then((context) => {
        return Promise.resolve(this._pipeline.get(context, key));
      }))
      .nodeify(callback);
  }

  /**
   * remove/delete a bucket specified by the key
   * @param {String} key - the key of the bucket to remove
   * @param {function(error: Error)} [callback] - callback to call when bucket has been removed
   * @returns {Promise} - a promise to have removed the bucket
   */
  remove(key, callback) {
    if (!callback && typeof key === 'function') {
      callback = key;
      key = null;
    }
    return Bluebird.resolve(Context.get().then((context) => {
        return Promise.resolve(this._pipeline.remove(context, key));
      }))
      .nodeify(callback);
  }

  /**
   * get a list of all buckets in the organisation
   * @param {function(error: Error, buckets: Array<Bucket>)} [callback] - callback to call when list has been retrieved
   * @returns {Promise<Array<Bucket>>} - a promise to have retrieved the buckets
   */
  getAll(callback) {
    return Bluebird.resolve(Context.get().then((context) => {
        return Promise.resolve(this._pipeline.getAll(context));
      }))
      .nodeify(callback);
  }

  /**
   * apply a function to every bucket in the current application
   * @param {function(bucket: Bucket)} fn - function to apply to each bucket
   * @param {function(error: Error)} [callback] - callback to call when all buckets have been applied
   * @returns {Promise} - a promise to have run the function against each bucket
   */
  each(fn, callback) {
    if (typeof fn !== 'function') {
      throw new Errors.bucket.InvalidError('No function given in each');
    }
    return Bluebird.resolve().then(() => {
        return Context.get().then((context) => {
          return Promise.resolve(this._pipeline.each(context, fn));
        });
      })
      .nodeify(callback);
  }

  /**
   * save/update metadata against a bucket
   * @param {Object} meta - the meta data to save against the bucket
   * @param {String} [key] - the key of the bucket to save data to, applies to current bucket if not supplied
   * @param {function(error: Error)} [callback] - callback to call when all buckets have been applied
   * @returns {Promise} - a promise to have applied the meta data
   */
  saveMeta(meta, key, callback) {
    if (!callback && typeof key === 'function') {
      callback = key;
      key = null;
    }
    return Bluebird.resolve(Context.get().then((context) => {
        return Promise.resolve(this._pipeline.saveMeta(context, meta, key));
      }))
      .nodeify(callback);
  }
}

export default BucketAPI;
