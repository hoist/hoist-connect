'use strict';
var pipeline = require('hoist-events-pipeline')(require('hoist-context'), require('hoist-model'));
var _ = require('lodash');

function EventsApi() {

}

EventsApi.prototype = {
  raise: function (name, payload, contextOverride, callback) {
    if (!callback && _.isFunction(contextOverride)) {
      callback = contextOverride;
      contextOverride = null;
    }
    if (!callback && _.isFunction(payload)) {
      callback = payload;
      payload = {};
    }
    return pipeline.raise(name, payload, contextOverride).nodeify(callback);
  }
};

module.exports = new EventsApi();
