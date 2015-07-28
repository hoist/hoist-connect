'use strict';
import log from '../../src/log';
/** @test {Log} */
describe('Hoist.log', function () {
  before(function () {
    var b = {

    };
    var a = {
      b: b
    };
    b.a = a;
    var logObject = {
      a: a,
      b: b
    };
    log(logObject);
  });


  it('should log circular structure', function () {
    console.log('manually check the log above');
  });
});
