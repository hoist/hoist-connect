'use strict';
var pipeline = require('hoist-data-pipeline');
var errors = require('hoist-errors');
var BBPromise = require('bluebird');

function Data(type) {
  if (type) {
    this._type = type.toLowerCase();
  }
}

Data.prototype._verify = function () {
  return BBPromise.try(function ensureType() {
      if (!this._type) {
        throw new errors.data.request.InvalidError('you need to specify a type for the retrieval, call #setType([typename]) first');
      }
    }, [], this).bind(this)
    .then(function applyAuthentication() {
      return pipeline.authentication.apply();
    });
};

Data.prototype.find = function (query, callback) {
  return this._verify().then(function retrieveData() {
    return pipeline.query.find(this._type, query || {});
  }).nodeify(callback);
};
Data.prototype.findById = function (id, callback) {
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
Data.prototype.findOne = function (query, callback) {
  return BBPromise.try(function ensureQuery() {
    if (!query) {
      throw new errors.data.request.InvalidError('you need to specify a query for #findOne');
    }
  }, [], this).bind(this).then(function () {
    return this._verify();
  }).then(function retrieveData() {
    return pipeline.query.findOne(this._type, query);
  }).nodeify(callback);
};
module.exports = function (type) {
  return new Data(type);
};
