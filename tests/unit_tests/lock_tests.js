'use strict';
import Hoist from '../../src';
import {
  expect
}
from 'chai';
import sinon from 'sinon';
import LockAPI from '../../src/lock';

describe('Hoist.lock', function () {
  it('is a function', function () {
    return expect(Hoist).to.respondTo('lock');
  });
  describe('with no lock active', function () {
    var clock;
    var result;
    before(function () {
      clock = sinon.useFakeTimers();
      return (result = Hoist.lock('lock-key').then(function (lock) {
        lock.release();
        return 'lock aquired';
      }));
    });
    it('gets lock', function () {
      return expect(result).to.be.become('lock aquired');
    });
    after(function () {
      clock.restore();
      LockAPI._clearClient();
    });
  });
  describe('with lock active', function () {
    var clock;
    var result;
    var value;
    before(function (done) {
      clock = sinon.useFakeTimers();
      result = Hoist.lock('lock-key').then(function () {
        value = 'lock aquired in 1';
        process.nextTick(function () {
          done();
        });
        return Hoist.lock('lock-key').then(function (lock) {
          value = 'lock aquired in 2';
          lock.release();
        });
      });
    });
    it('gets lock', function () {
      expect(value).to.eql('lock aquired in 1');
    });
    it('lock aquired after 500 milliseconds', function () {
      clock.tick(501);
      return result.then(function () {
        expect(value).to.eql('lock aquired in 2');
      });
    });
    after(function () {
      clock.restore();
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
