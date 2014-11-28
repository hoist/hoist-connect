'use strict';
require('../bootstrap');
var Hoist = require('../../lib');
var Pipeline = require('hoist-events-pipeline').Pipeline;
var expect = require('chai').expect;
var sinon = require('sinon');
var BBPromise = require('bluebird');
describe('event', function () {
  it('exists', function () {
    return expect(Hoist.events).to.exist;
  });
  describe('.raise', function () {
    var name = 'name';
    var payload = {
      key: 'value'
    };
    before(function(done){
      sinon.stub(Pipeline.prototype,'raise').returns(BBPromise.resolve(null));
      Hoist.events.raise(name,payload,done);
    });
    after(function () {
      Pipeline.prototype.raise.restore();
    });
    it('calls raise on pipeline', function () {
      return expect(Pipeline.prototype.raise).to.have.been.calledWith(name, payload);
    });
  });

});
