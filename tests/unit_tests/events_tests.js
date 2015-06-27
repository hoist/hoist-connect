'use strict';
import Hoist from '../../src';
import Pipeline from '@hoist/events-pipeline';
import {
  expect
}
from 'chai';
import sinon from 'sinon';

/** @test {EventsAPI} */
describe('Hoist.events', function () {
  it('exists', function () {
    return expect(Hoist.events).to.exist;
  });
  /** @test {EventsAPI#raise} */
  describe('.raise', function () {
    var name = 'name';
    var payload = {
      key: 'value'
    };
    before(function (done) {
      sinon.stub(Pipeline.prototype, 'raise').returns(Promise.resolve(null));
      Hoist.events.raise(name, payload, done);
    });
    after(function () {
      Pipeline.prototype.raise.restore();
    });
    it('calls raise on pipeline', function () {
      return expect(Pipeline.prototype.raise).to.have.been.calledWith(name, payload);
    });
  });

});
