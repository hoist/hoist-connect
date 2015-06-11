'use strict';
var Context = require('hoist-context');
var Errors = require('hoist-errors');
var _ = require('lodash');
var BBPromise = require('bluebird');

function TimeoutManager() {

}

TimeoutManager.prototype.reset = function (milliseconds) {
  //upper bound at 2m
  //lower bound at 1s
  return BBPromise.try(function () {

    if (!milliseconds || !_.isNumber(milliseconds) || milliseconds > 120000 || milliseconds < 1) {
      throw new Errors.timeout.InvalidTimeoutValueError();
    }

    return Context.get().then(function (context) {
      if (context.timeout) {
        clearTimeout(context.timeout.current);
        context.timeout.current = setTimeout(context.timeout.onTimeout, milliseconds);
      }
    });
  });

};



module.exports = new TimeoutManager();
