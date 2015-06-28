'use strict';
import Pipeline from '@hoist/data-pipeline';
import errors from '@hoist/errors';
import Bluebird from 'bluebird';
import BaseAPI from './base_api';

/**
 * Hoists Data API
 */
class DataAPI extends BaseAPI {
  /**
   * create a new data API
   * @param {string} [type] - the object type for this data api instance
   */
  constructor(type) {
    super();
    if (type) {
      this.setType(type);
    }
    this._pipeline = new Pipeline();
  }

  _verify() {
    return Promise.resolve().then(() => {
      if (!this._type) {
        throw new errors.data.request.InvalidError('you need to specify a type for the retrieval, call #setType([typename]) first');
      }
    });
  }

  /**
   * set the type of this Data API instance
   * @param {string} type - the object type for this data api instance
   */
  setType(type) {
    this._type = type.toLowerCase();
  }

  /**
   * find objects matching the given query
   * @param {object} query - the mongo style query
   * @param {function(error: Error, objects: Array<object>)} [callback] - callback to call when objects have been found
   * @returns {Promise<Array<object>>} - a promise to have retrieved the objects
   */
  find(query, callback) {
    return Bluebird.resolve(
        this._verify()
        .then(() => {
          return this._pipeline.find(this._type, query || {});
        }))
      .nodeify(callback);
  }

  /**
   * find a single object with the matching id
   * @param {string} id - the object id
   * @param {function(error: Error, object: object)} [callback] - callback to call when object has been found
   * @returns {Promise<object>} - a promise to have retrieved the object
   */
  findById(id, callback) {
    return Bluebird.resolve(
        Promise.resolve()
        .then(() => {
          if (!id) {
            throw new errors.data.request.InvalidError('you need to specify an id for #findById');
          }
        })
        .then(() => {
          return this.findOne({
            _id: id
          });
        }))
      .nodeify(callback);
  }

  /**
   * find a single object matching the given query
   * @param {object} query - the mongo style query
   * @param {function(error: Error, object: object)} [callback] - callback to call when object has been found
   * @returns {Promise<object>} - a promise to have retrieved the object
   */
  findOne(query, callback) {
    return Bluebird.resolve(
        Promise.resolve()
        .then(() => {
          if (!query) {
            throw new errors.data.request.InvalidError('you need to specify a query for #findOne');
          }
        })
        .then(() => {
          return this._verify();
        })
        .then(() => {
          return this._pipeline.findOne(this._type, query);
        }))
      .nodeify(callback);
  }

  /**
   * remove objects matching the given query
   * @param {object} query - the mongo style query
   * @param {function(error: Error)} [callback] - callback to call when objects have been removed
   * @returns {Promise} - a promise to have removed the objects
   */
  remove(query, callback) {
    return Bluebird.resolve(
        Promise.resolve()
        .then(() => {
          if (!query) {
            throw new errors.data.request.InvalidError('you need to specify a query for #remove');
          }
        })
        .then(() => {
          return this._verify();
        })
        .then(() => {
          return this._pipeline.remove(this._type, query);
        }))
      .nodeify(callback);
  }

  /**
   * remove a single object with a given id
   * @param {string} id - the object id
   * @param {function(error: Error)} [callback] - callback to call when object has been removed
   * @returns {Promise} - a promise to have removed the object
   */
  removeOneById(id, callback) {
    return Bluebird.resolve(
        Promise.resolve()
        .then(() => {
          if (!id) {
            throw new errors.data.request.InvalidError('you need to specify an id for #removeOneById');
          }
        })
        .then(() => {
          return this._verify();
        })
        .then(() => {
          return this._pipeline.remove(this._type, {
            _id: id
          });
        }))
      .nodeify(callback);
  }

  /**
   * save an object
   * @param {object} json - raw object to save
   * @param {function(error: Error, object: object)} [callback] - callback to call when objects has been saved
   * @returns {Promise<object>} - a promise to have saved the object
   */
  save(json, callback) {
    if (!this._type && json._type) {
      this.setType(json._type);
    }
    return Bluebird.resolve(
      this._verify()
      .then(() => {
        return this._pipeline.save(this._type, json);
      })).nodeify(callback);
  }
}


export default DataAPI;
