'use strict';
var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('esdoc', ['clean-docs'], function (cb) {
  exec('./node_modules/.bin/esdoc -c esdoc.json', function (err, stdout, stderr) {
    if (stderr) {
      console.log('stderr:', stderr);
    }
    if (stdout) {
      console.log('stdout:', stdout);
    }
    cb(err);
  });
});
