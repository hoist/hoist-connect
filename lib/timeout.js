'use strict';
var Context = require('hoist-context');
var Errors = require('hoist-errors');
var _ = require('lodash');

function TimeoutManager() {

}

TimeoutManager.prototype.reset = function (milliseconds) {
  //upper bound at 30s
  //lower bound at 1s
  if (!milliseconds || !_.isNumber(milliseconds) || milliseconds > 30000 || milliseconds < 1) {
    throw new Errors.timeout.InvalidTimeoutValueError();
  }

  return Context.get().then(function (context) {
    if (context.timeout) {
      clearTimeout(context.timeout.current);
      context.timeout.current = setTimeout(context.timeout.onTimeout, milliseconds);
    }
  });

};



module.exports = new TimeoutManager();
