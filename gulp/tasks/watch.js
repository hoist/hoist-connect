'use strict';
var gulp = require('gulp');
var globs = require('../globs');
var runSequence = require('run-sequence');

gulp.task('watch', function (callback) {
  var watching = false;
  runSequence(['mocha-server-continue', 'esdoc'], function () {
    if (!watching) {
      console.log('running watch');
      gulp.watch(globs.js.Gulpfile, ['eslint']);
      gulp.watch(globs.specs.concat(globs.js.lib), ['mocha-server-continue', 'esdoc']);
      callback();
    }
  });
});
