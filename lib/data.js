'use strict';
var pipeline = require('hoist-data-pipeline')(require('hoist-context'));
var errors = require('hoist-errors');
var BBPromise = require('bluebird');

function DataApi(type) {
  if (type) {
    this.setType(type);
  }
}

DataApi.prototype.setType = function (type) {
  this._type = type.toLowerCase();
};

DataApi.prototype._verify = function () {
  return BBPromise.try(function ensureType() {
    if (!this._type) {
      throw new errors.data.request.InvalidError('you need to specify a type for the retrieval, call #setType([typename]) first');
    }
  }, [], this).bind(this);
};

DataApi.prototype.find = function (query, callback) {
  return this._verify().then(function retrieveData() {
    return pipeline.find(this._type, query || {});
  }).nodeify(callback);
};
DataApi.prototype.findById = function (id, callback) {
  return BBPromise.try(function ensureQuery() {
    if (!id) {
      throw new errors.data.request.InvalidError('you need to specify an id for #findById');
    }
  }, [], this).bind(this).then(function () {
    return this.findOne({
      _id: id
    });
  }).nodeify(callback);
};
DataApi.prototype.findOne = function (query, callback) {
  return BBPromise.try(function ensureQuery() {
    if (!query) {
      throw new errors.data.request.InvalidError('you need to specify a query for #findOne');
    }
  }, [], this).bind(this).then(function () {
    return this._verify();
  }).then(function retrieveData() {
    return pipeline.findOne(this._type, query);
  }).nodeify(callback);
};
DataApi.prototype.save = function (json, callback) {
  if (!this._type && json._type) {
    this.setType(json._type);
  }
  return this._verify()
    .bind(this)
    .then(function () {
      return pipeline.save(this._type, json);
    }).nodeify(callback);
};
DataApi.prototype._connection = pipeline.connection;
module.exports = function (type) {
  return new DataApi(type);
};
module.exports._connection = pipeline.connection;
