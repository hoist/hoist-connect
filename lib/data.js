'use strict';
var pipeline = require('hoist-data-pipeline');
function Data(type) {
  if (type) {
    this._type = type.toLowerCase();
  }

}

Data.prototype.get = function (callback) {
  return pipeline.authentication.apply()
  .bind(this)
  .then(function(){
    return pipeline.retrieve(this._type);
  }).nodeify(callback);
};

module.exports = function (type) {
  return new Data(type);
};
