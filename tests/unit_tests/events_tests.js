'use strict';
import Hoist from '../../lib';
import Pipeline from '@hoist/events-pipeline';
import {
  expect
}
from 'chai';
import sinon from 'sinon';

describe('event', function () {
  it('exists', function () {
    return expect(Hoist.events).to.exist;
  });
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
