'use strict';
var gulp = require('gulp');
var requireDir = require('require-dir');
require('git-guppy')(gulp);
var helpers = require('./gulp/helpers');

requireDir('./gulp/tasks', {
  recurse: true
});
gulp.task('test', ['transpile', 'eslint-build', 'mocha-server'], function (cb) {


  cb(helpers.getError());
});
gulp.task('default', function () {
  return gulp.start('eslint-build',
    'mocha-server');
});

gulp.task('post-commit', ['test', 'esdoc']);

gulp.task('pre-commit', ['transpile'], function () {

});
