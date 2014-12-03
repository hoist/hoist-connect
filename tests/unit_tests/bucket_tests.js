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
  describe('.setCurrent', function () {
    describe('with key', function (){
      var fakeKey = 'key';
      before(function () {
        sinon.stub(bucketPipeline.prototype, 'setCurrent').returns(BBPromise.resolve());
        return Hoist.bucket.setCurrent(fakeKey);
      });
      after(function(){
        bucketPipeline.prototype.setCurrent.restore();
      });
      it('calls bucketPipeline.setCurrent with correct key', function () {
        expect(bucketPipeline.prototype.setCurrent)
          .to.have.been.calledWith(fakeKey);
      });
    });
    describe('with no key specified', function () {
      it('rejects', function () {
        expect(function () {
          Hoist.bucket.setCurrent();
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
});