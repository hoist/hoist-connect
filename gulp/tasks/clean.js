'use strict';
var gulp = require('gulp');
var del = require('del');

gulp.task('clean-coverage', function (callback) {

  del('coverage/**/*', callback);
});
gulp.task('clean-docs', function (callback) {
  del('docs/**/*', callback);
});
gulp.task('clean-compiled', function (callback) {
  del('lib/**/*', callback);
});

