'use strict';
import ConnectorPipeline from '@hoist/connector-pipeline';
import Hoist from '../../src';
import sinon from 'sinon';
import {
  expect
}
from 'chai';
import errors from '@hoist/errors';

/** @test {ConnectorAPI} */
describe('Hoist.connector', function () {
  var StubConnector = function () {
    this.get = sinon.stub();
    this.put = sinon.stub();
    this.post = sinon.stub();
    this.delete = sinon.stub();
  };
  var connector;
  var stubConnector = new StubConnector();
  describe('with key', function () {
    before(function () {
      sinon.stub(ConnectorPipeline.prototype, 'loadConnector').returns(Promise.resolve(stubConnector));
      connector = Hoist.connector('key');
    });
    after(function () {
      ConnectorPipeline.prototype.loadConnector.restore();
    });
    it('loads the specified connector', function () {
      expect(ConnectorPipeline.prototype.loadConnector)
        .to.have.been.calledWith('key');
    });
    /** @test {ConnectorAPI#get} */
    describe('Hoist.connector#get', function () {
      var _promise = Promise.resolve(true);
      before(function () {
        stubConnector.get.returns(_promise);
        return connector.get('/path?query');
      });
      after(function () {
        stubConnector.get.reset();
      });
      it('calls pipeline#get', function () {
        expect(stubConnector.get)
          .to.have.been.calledWith('/path?query');
      });
    });
    /** @test {ConnectorAPI#put} */
    describe('Hoist.connector#put', function () {

      var _promise = Promise.resolve(true);
      before(function () {
        stubConnector.put.returns(_promise);
        return connector.put('/path?query', 'data');
      });
      after(function () {
        stubConnector.put.reset();
      });
      it('calls pipeline#put', function () {
        expect(stubConnector.put)
          .to.have.been.calledWith('/path?query', 'data');
      });
    });
    /** @test {ConnectorAPI#delete} */
    describe('Hoist.connector#delete', function () {

      var _promise = Promise.resolve(true);
      before(function () {
        stubConnector.delete.returns(_promise);
        return connector.delete('/path');
      });
      after(function () {
        stubConnector.delete.reset();
      });
      it('calls pipeline#delete', function () {
        expect(stubConnector.delete)
          .to.have.been.calledWith('/path');
      });
    });
    /** @test {ConnectorAPI#post} */
    describe('Hoist.connector#post', function () {

      var _promise = Promise.resolve(true);
      before(function () {
        stubConnector.post.returns(_promise);
        return connector.post('/path?query', 'data');
      });
      after(function () {
        stubConnector.post.reset();
      });
      it('calls pipeline#post', function () {
        expect(stubConnector.post)
          .to.have.been.calledWith('/path?query', 'data');
      });
    });
  });
  describe('with no key specified', function () {
    it('rejects', function () {
      expect(function () {
        Hoist.connector();
      }).to.throw(errors.connector.request.InvalidError);
    });
  });
});
