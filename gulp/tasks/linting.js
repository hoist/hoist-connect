'use strict';
var gulp = require('gulp');
var loadPlugins = require('gulp-load-plugins');
var globs = require('../globs');

var plugins = loadPlugins();

function runESLint() {
  return gulp.src(
      globs.js.src.concat(
        globs.js.gulpfile,
        globs.specs)
    )
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.formatEach());
}

gulp.task('eslint-build', function () {
  return runESLint().pipe(plugins.eslint.failOnError());
});
gulp.task('eslint', function () {
  return runESLint();
});
