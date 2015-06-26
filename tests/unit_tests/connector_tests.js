'use strict';
var ConnectorPipeline = require('@hoist/connector-pipeline').Pipeline;
var Hoist = require('../../lib');
var sinon = require('sinon');
var expect = require('chai').expect;
var errors = require('@hoist/errors');
var BBPromise = require('bluebird');

describe('Hoist', function () {
  describe('.connector', function () {
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
        sinon.stub(ConnectorPipeline.prototype, 'loadConnector').returns(BBPromise.resolve(stubConnector));
        connector = Hoist.connector('key');
      });
      after(function () {
        ConnectorPipeline.prototype.loadConnector.restore();
      });
      it('loads the specified connector', function () {
        expect(ConnectorPipeline.prototype.loadConnector)
          .to.have.been.calledWith('key');
      });
      describe('#get', function () {

        var _promise = BBPromise.resolve(true);
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
      describe('#put', function () {

        var _promise = BBPromise.resolve(true);
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
      describe('#delete', function () {

        var _promise = BBPromise.resolve(true);
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
      describe('#post', function () {

        var _promise = BBPromise.resolve(true);
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
});
