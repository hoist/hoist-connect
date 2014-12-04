'use strict';
var pipeline = require('hoist-events-pipeline')(require('hoist-context'), require('hoist-model'));
var _ = require('lodash');

function EventsApi() {

}

EventsApi.prototype = {
  raise: function (name, payload, context, callback) {
    if (!callback && _.isFunction(context)) {
      callback = context;
      context = null;
    }
    if (!callback && _.isFunction(payload)) {
      callback = payload;
      payload = {};
    }
    return pipeline.raise(name, payload, context).nodeify(callback);
  }
};

module.exports = new EventsApi();
