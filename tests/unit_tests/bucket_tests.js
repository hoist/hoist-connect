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
      it('with callback', function (done) {
        Hoist.bucket.set(fakeKey, true, done);
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
      it('with callback', function (done) {
        Hoist.bucket.add(fakeKey, fakeMeta, done);
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
      it('with callback', function (done) {
        Hoist.bucket.get(fakeKey, done);
      });
    });
  });
  describe('.getAll', function () {
    before(function () {
      sinon.stub(bucketPipeline.prototype, 'getAll').returns(BBPromise.resolve([]));
      return Hoist.bucket.getAll();
    });
    after(function () {
      bucketPipeline.prototype.getAll.restore();
    });
    it('calls bucketPipeline.get with correct key', function () {
      expect(bucketPipeline.prototype.getAll)
        .to.have.been.calledWith();
    });
    it('with callback', function (done) {
      Hoist.bucket.getAll(done);
    });
  });
  describe('.each', function () {
    var fn = function () {};
    before(function () {
      sinon.stub(bucketPipeline.prototype, 'each').returns(BBPromise.resolve());
      return Hoist.bucket.each(fn);
    });
    after(function () {
      bucketPipeline.prototype.each.restore();
    });
    it('calls bucketPipeline.each with correct key', function () {
      expect(bucketPipeline.prototype.each)
        .to.have.been.calledWith(fn);
    });
    it('with callback', function (done) {
      Hoist.bucket.each(fn, done);
    });
  });
});