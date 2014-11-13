'use strict';
var pipeline = require('hoist-events-pipeline')(require('hoist-context'));


function EventsApi() {

}

EventsApi.prototype = {
  raise: function (name, payload) {
    return pipeline.raise(name, payload);
  }
};

module.exports = new EventsApi();
