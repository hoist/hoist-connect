'use strict';
var notifier = require('node-notifier');

var _error;
module.exports = {
  getError: function () {
    return _error;
  },
  errorHandler: function (err) {
    notifier.notify({
      title: 'A Gulp error occurred',
      message: err.message
    });
    _error = err;
    console.log('Error:', err.message, err.stack);
  }
};
