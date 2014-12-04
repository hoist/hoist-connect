'use strict';
var Hoist = require('../../lib');
var expect = require('chai').expect;
var sinon = require('sinon');
var BBPromise = require('bluebird');
var bucketPipeline = require('hoist-bucket-pipeline').Pipeline;
var HoistErrors = require('hoist-errors');

describe('Hoist.bucket', function () {
  it('exists', function () {
    return expect(Hoist.bucket).to.exist;
  });
  describe('.set', function () {
    describe('with key and create', function (){
      var fakeKey = 'key';
      before(function () {
        sinon.stub(bucketPipeline.prototype, 'set').returns(BBPromise.resolve());
        return Hoist.bucket.set(fakeKey, true);
      });
      after(function(){
        bucketPipeline.prototype.set.restore();
      });
      it('calls bucketPipeline.set with correct key', function () {
        expect(bucketPipeline.prototype.set)
          .to.have.been.calledWith(fakeKey, true);
      });
    });
    describe('with no key specified', function () {
      it('rejects', function () {
        expect(function () {
          Hoist.bucket.set();
        }).to.throw(HoistErrors.bucket.InvalidError);
      });
    });
  });
  describe('.add', function () {
    describe('with key and meta', function (){
      var fakeKey = 'key';
      var fakeMeta = 'meta';
      before(function () {
        sinon.stub(bucketPipeline.prototype, 'add').returns(BBPromise.resolve());
        return Hoist.bucket.add(fakeKey, fakeMeta);
      });
      after(function(){
        bucketPipeline.prototype.add.restore();
      });
      it('calls bucketPipeline.add with correct key and meta', function () {
        expect(bucketPipeline.prototype.add)
          .to.have.been.calledWith(fakeKey, fakeMeta);
      });
    });
  });
  describe('.get', function () {
    describe('with key', function (){
      var fakeKey = 'key';
      before(function () {
        sinon.stub(bucketPipeline.prototype, 'get').returns(BBPromise.resolve());
        return Hoist.bucket.get(fakeKey);
      });
      after(function(){
        bucketPipeline.prototype.get.restore();
      });
      it('calls bucketPipeline.get with correct key', function () {
        expect(bucketPipeline.prototype.get)
          .to.have.been.calledWith(fakeKey);
      });
    });
  });
});