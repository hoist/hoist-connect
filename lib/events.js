'use strict';
var pipeline = require('hoist-events-pipeline')(require('hoist-context'));


function EventsApi() {

}

EventsApi.prototype = {
  raise: function (name, payload, callback) {
    return pipeline.raise(name, payload).nodeify(callback);
  }
};

module.exports = new EventsApi();
