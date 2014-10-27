'use strict';
var pipeline = require('hoist-data-pipeline');
var errors = require('hoist-errors');
var BBPromise = require('bluebird');

function Data(type) {
  if (type) {
    this._type = type.toLowerCase();
  }
}

Data.prototype.get = function (id, callback) {
  return BBPromise.try(function ensureType() {
      if(!this._type){
        throw new errors.data.request.InvalidError('you need to specify a type for the retrieval, call #setType([typename]) first');
      }
    },[],this).bind(this)
    .then(function applyAuthentication() {
      return pipeline.authentication.apply();
    })
    .then(function retrieveData() {
      return pipeline.retrieve(this._type, id);
    }).nodeify(callback);
};

module.exports = function (type) {
  return new Data(type);
};
