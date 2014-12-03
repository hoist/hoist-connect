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
    _id:'appid'
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
        expect(consoleLogs).to.eql(['message']);
      });

    });
    describe('called with a callback',function(){
      var called = false;
      var consoleLogs = [];
      before(function(){
         sinon.stub(console, 'log', function () {
          consoleLogs.push(arguments);
        });
        return Hoist.log('message','two','three',function(){
          console.log.restore();
          called = true;
        });
      });
      it('calls callback',function(){
        return expect(called).to.be.true;
      });
      it('should call log without callback',function(){
        return expect(consoleLogs[0][0]).to.eql('message two three');
      });
    });
  });

});
