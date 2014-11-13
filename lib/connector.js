'use strict';
var errors = require('hoist-errors');
var pipeline = require('hoist-connector-pipeline')(require('hoist-context'),require('hoist-model'));

function ConnectorApi(type, key) {
  if(!type||!key){
    throw new errors.connector.request.InvalidError();
  }
  this.connector = pipeline.loadConnector(type,key);
}

ConnectorApi.prototype = {
  get:function(){
    return this.connector.get.apply(this.connector,arguments);
  }
};

module.exports = function (type, key) {
  return new ConnectorApi(type, key);
};
