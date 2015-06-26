'use strict';
import Pipeline from '@hoist/data-pipeline';
import errors from '@hoist/errors';
import Bluebird from 'bluebird';
import BaseAPI from './base_api';

class DataAPI extends BaseAPI {
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
  };
  setType(type) {
    this._type = type.toLowerCase();
  }
  find(query, callback) {
    return Bluebird.resolve(
        this._verify()
        .then(() => {
          return this._pipeline.find(this._type, query || {});
        }))
      .nodeify(callback);
  }
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
