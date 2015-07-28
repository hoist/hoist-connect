'use strict';
import Hoist from '../../src';
import {
  expect
}
from 'chai';
import LockAPI from '../../src/lock';

describe('Hoist.lock', function () {
  it('is a function', function () {
    return expect(Hoist).to.respondTo('lock');
  });
  describe('with no lock active', function () {
    var result;
    before(function () {
      return (result = Hoist.lock('lock-key').then(function (lock) {
        lock.release();
        return 'lock aquired';
      }));
    });
    it('gets lock', function () {
      return expect(result).to.be.become('lock aquired');
    });
    after(function () {
      LockAPI._clearClient();
    });
  });
  describe('with lock active', function () {
    this.timeout(5000);
    var result;
    var value;
    before(function (done) {
      result = Hoist.lock('lock-key').then(function () {
        value = 'lock aquired in 1';
        process.nextTick(function () {
          done();
        });
        return Hoist.lock('lock-key').then(function (lock) {
          value = 'lock aquired in 2';
          console.log('releasing');
          lock.release();
        });
      });
    });
    it('gets lock', function () {
      expect(value).to.eql('lock aquired in 1');
    });
    it('lock aquired after 500 milliseconds', function (done) {
      setTimeout(() => {
        result.then(function () {
          return expect(value).to.eql('lock aquired in 2');
        }).then(() => {
          done();
        });
      }, 501);

    });
    after(function () {
      LockAPI._clearClient();
    });
  });
  describe('with lock released', function () {

    var value;
    before(function () {

      return (Hoist.lock('lock-key').then(function (lock1) {
        value = 'lock aquired in 1';
        process.nextTick(function () {
          lock1.release();
        });
        return Hoist.lock('lock-key').then(function (lock2) {
          value = 'lock aquired in 2';
          lock2.release();
        });
      }));
    });
    it('gets lock', function () {
      expect(value).to.eql('lock aquired in 2');
    });

    after(function () {
      LockAPI._clearClient();
    });
  });
});
