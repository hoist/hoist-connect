'use strict';
var ConnectorPipeline = require('hoist-connector-pipeline').Pipeline;
var Hoist = require('../../lib');
var sinon = require('sinon');
var expect = require('chai').expect;
var errors = require('hoist-errors');
var BBPromise = require('bluebird');

describe('Hoist', function () {
  describe('.connector', function () {
    var StubConnector = function () {
      this.get = sinon.stub();
      this.put = sinon.stub();
      this.post = sinon.stub();
    };
    var connector;
    var stubConnector = new StubConnector();
    describe('with key', function (){
      before(function () {
        sinon.stub(ConnectorPipeline.prototype, 'loadConnector').returns(BBPromise.resolve(stubConnector));
        connector = Hoist.connector('key');
      });
      after(function(){
        ConnectorPipeline.prototype.loadConnector.restore();
      });
      it('loads the specified connector', function () {
        expect(ConnectorPipeline.prototype.loadConnector)
          .to.have.been.calledWith('key');
      });
      describe('#get', function () {
        var response;
        var _promise = BBPromise.resolve(true);
        before(function () {
          stubConnector.get.returns(_promise);
          response = connector.get('/path?query');
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
        var response;
        var _promise = BBPromise.resolve(true);
        before(function () {
          stubConnector.put.returns(_promise);
          response = connector.put('/path?query', 'data');
        });
        after(function () {
          stubConnector.put.reset();
        });
        it('calls pipeline#put', function () {
          expect(stubConnector.put)
            .to.have.been.calledWith('/path?query', 'data');
        });
      });
      describe('#del', function () {

      });
      describe('#post', function () {
        var response;
        var _promise = BBPromise.resolve(true);
        before(function () {
          stubConnector.post.returns(_promise);
          response = connector.post('/path?query', 'data');
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
