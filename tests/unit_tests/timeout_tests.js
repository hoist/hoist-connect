'use strict';
import Hoist from '../../src';
import {
  expect
}
from 'chai';
import Context from '@hoist/context';
import sinon from 'sinon';

/** @test {TimeoutAPI} */
describe('Hoist.timeout', function () {
  it('exists', function () {
    return expect(Hoist).to.have.property('timeout');
  });

  /** @test {TimeoutAPI#reset} */
  describe('#reset', function () {
    describe('with valid value', function () {
      var clock;
      var context;
      var result = '';
      beforeEach(function () {
        context = {
          timeout: {
            onTimeout: function () {
              result = 'this is a reset timeout';
            }
          }
        };
        result = '';
        clock = sinon.useFakeTimers();
        context.timeout.current = setTimeout(function () {
          result = 'this is original timeout';
        }, 300);
        sinon.stub(Context, 'get').returns(Promise.resolve(context));
        clock.tick(200);
        return Hoist.timeout.reset(5000);
      });
      it('replaces timeout', function () {
        clock.tick(200);
        return expect(result).to.eql('');
      });
      it('sets new timeout', function () {
        clock.tick(5000);
        return expect(result).to.eql('this is a reset timeout');
      });
      afterEach(function () {
        clearTimeout(context.timeout.current);
        Context.get.restore();
        clock.restore();
      });
    });
    describe('with invalid value', function () {
      var clock;
      var context;
      var result = '';
      beforeEach(function () {
        context = {
          timeout: {
            onTimeout: function () {
              result = 'this is a reset timeout';
            }
          }
        };
        result = '';
        clock = sinon.useFakeTimers();
        context.timeout.current = setTimeout(function () {
          result = 'this is original timeout';
        }, 300);
        sinon.stub(Context, 'get').returns(Promise.resolve(context));
        clock.tick(200);
      });
      it('throws an error', function () {
        return expect(Hoist.timeout.reset(500000)).to.be.rejectedWith('The specified value for timeout length was invalid');
      });
      it('maintains original timeout', function () {
        clock.tick(200);
        return expect(result).to.eql('this is original timeout');
      });
      afterEach(function () {
        clearTimeout(context.timeout.current);
        Context.get.restore();
        clock.restore();
      });
    });
  });
});
