'use strict';
require('../bootstrap');
var Context = require('hoist-context');
var sinon = require('sinon');
var expect = require('chai').expect;
var BBPromise = require('bluebird');
describe('Hoist', function () {
  var Hoist = require('../../lib');
  describe('.log', function () {
    it('exists', function () {
      expect(Hoist).to.respondTo('log');
    });
    describe('with no application', function () {
      var consoleLogs = [];
      before(function () {
        sinon.stub(Context, 'get').returns(BBPromise.resolve(new Context()));
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
  });
});
