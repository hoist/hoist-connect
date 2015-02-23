'use strict';
var util = require('util');


module.exports = function () {
  var log = {
    type: 'appLog',
    arguments: Array.prototype.slice.call(arguments)
  };
  console.log(util.format('%j', log));
};
