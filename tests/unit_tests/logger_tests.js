'use strict';
require('../bootstrap');
var Context = require('hoist-context');
var sinon = require('sinon');
var expect = require('chai').expect;
var BBPromise = require('bluebird');
describe('Hoist', function () {
  var Hoist = require('../../lib');
  var context = new Context();
  context.application = {
    _id: 'appid'
  };
  describe('.log', function () {
    it('exists', function () {
      expect(Hoist).to.respondTo('log');
    });
    before(function () {
      sinon.stub(Context, 'get').returns(BBPromise.resolve(context));
    });
    after(function () {
      Context.get.restore();
    });
    describe('with no application', function () {
      var consoleLogs = [];
      before(function () {
        sinon.stub(console, 'log', function (message) {
          consoleLogs.push(message);
        });
        return Hoist.log('message').then(function () {
          console.log.restore();
        });
      });
      it('logs to console', function () {
        expect(consoleLogs).to.eql(['{\"type\":\"appLog\",\"arguments\":[\"message\"]}']);
      });

    });
    describe('called with a callback', function () {
      var consoleLogs = [];
      var called;
      before(function () {
        sinon.stub(console, 'log', function () {
          consoleLogs.push(arguments);
        });
        Hoist.log('message', 'two', 'three', function () {
          console.log.restore();
          called = true;
        });

      });
      it('should call log without callback', function () {
        return expect(consoleLogs[0][0]).to.eql('{\"type\":\"appLog\",\"arguments\":[\"message\",\"two\",\"three\"]}');
      });
      it('should call the callback function', function () {
        return expect(called).to.be.true;
      });
    });
  });

});
