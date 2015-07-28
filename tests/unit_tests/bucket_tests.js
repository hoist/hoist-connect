'use strict';
import Hoist from '../../src';
import {
  expect
}
from 'chai';
import sinon from 'sinon';
import BucketPipeline from '@hoist/bucket-pipeline';
import Errors from '@hoist/errors';

/** @test {BucketAPI} */
describe('Hoist.bucket', function () {
  it('exists', function () {
    return expect(Hoist.bucket).to.exist;
  });
  /** @test {BucketAPI#remove} */
  describe('.remove', function () {
    before(function () {
      sinon.stub(BucketPipeline.prototype, 'remove').returns(Promise.resolve(null));
      return Hoist.bucket.remove('key');
    });
    after(function () {
      BucketPipeline.prototype.remove.restore();
    });
    it('calls bucketPipeline.remove', function () {
      return expect(BucketPipeline.prototype.remove)
        .to.have.been.calledWith('key');
    });
  });
  /** @test {BucketAPI#set} */
  describe('.set', function () {
    describe('with key and create', function () {
      var fakeKey = 'key';
      before(function () {
        sinon.stub(BucketPipeline.prototype, 'set').returns(Promise.resolve());
        return Hoist.bucket.set(fakeKey, true);
      });
      after(function () {
        BucketPipeline.prototype.set.restore();
      });
      it('calls bucketPipeline.set with correct key', function () {
        expect(BucketPipeline.prototype.set)
          .to.have.been.calledWith(fakeKey, true);
      });
      it('with callback', function (done) {
        Hoist.bucket.set(fakeKey, true, done);
      });
    });
    describe('with key and callback', function () {
      var fakeKey = 'key';
      before(function (done) {
        sinon.stub(BucketPipeline.prototype, 'set').returns(Promise.resolve());
        return Hoist.bucket.set(fakeKey, done);
      });
      after(function () {
        BucketPipeline.prototype.set.restore();
      });
      it('calls bucketPipeline.set with correct key and meta', function () {
        expect(BucketPipeline.prototype.set)
          .to.have.been.calledWith(fakeKey, null);
      });
    });
    describe('with no key specified', function () {
      it('rejects', function () {
        expect(function () {
          Hoist.bucket.set();
        }).to.throw(Errors.bucket.InvalidError);
      });
      it('with callback', function () {
        expect(function () {
          Hoist.bucket.set(function () {});
        }).to.throw(Errors.bucket.InvalidError);
      });
    });
  });

  /** @test {BucketAPI#add} */
  describe('.add', function () {
    describe('with key and meta', function () {
      var fakeKey = 'key';
      var fakeMeta = 'meta';
      before(function () {
        sinon.stub(BucketPipeline.prototype, 'add').returns(Promise.resolve());
        return Hoist.bucket.add(fakeKey, fakeMeta);
      });
      after(function () {
        BucketPipeline.prototype.add.restore();
      });
      it('calls bucketPipeline.add with correct key and meta', function () {
        expect(BucketPipeline.prototype.add)
          .to.have.been.calledWith(fakeKey, fakeMeta);
      });
      it('with callback', function (done) {
        Hoist.bucket.add(fakeKey, fakeMeta, done);
      });
    });
    describe('with key and callback', function () {
      var fakeKey = 'key';
      before(function (done) {
        sinon.stub(BucketPipeline.prototype, 'add').returns(Promise.resolve());
        return Hoist.bucket.add(fakeKey, done);
      });
      after(function () {
        BucketPipeline.prototype.add.restore();
      });
      it('calls bucketPipeline.add with correct key and meta', function () {
        expect(BucketPipeline.prototype.add)
          .to.have.been.calledWith(fakeKey, null);
      });
    });
    describe('with only callback', function () {
      before(function (done) {
        sinon.stub(BucketPipeline.prototype, 'add').returns(Promise.resolve());
        return Hoist.bucket.add(done);
      });
      after(function () {
        BucketPipeline.prototype.add.restore();
      });
      it('calls bucketPipeline.add with correct key and meta', function () {
        expect(BucketPipeline.prototype.add)
          .to.have.been.calledWith(null, null);
      });
    });
  });

  /** @test {BucketAPI#get} */
  describe('.get', function () {
    describe('with key', function () {
      var fakeKey = 'key';
      before(function () {
        sinon.stub(BucketPipeline.prototype, 'get').returns(Promise.resolve());
        return Hoist.bucket.get(fakeKey);
      });
      after(function () {
        BucketPipeline.prototype.get.restore();
      });
      it('calls bucketPipeline.get with correct key', function () {
        expect(BucketPipeline.prototype.get)
          .to.have.been.calledWith(fakeKey);
      });
      it('with callback', function (done) {
        Hoist.bucket.get(fakeKey, done);
      });
    });
    describe('with only callback', function () {
      before(function (done) {
        sinon.stub(BucketPipeline.prototype, 'get').returns(Promise.resolve());
        Hoist.bucket.get(done);
      });
      after(function () {
        BucketPipeline.prototype.get.restore();
      });
      it('calls bucketPipeline.get with no key', function () {
        expect(BucketPipeline.prototype.get)
          .to.have.been.calledWith();
      });
    });
  });

  /** @test {BucketAPI#getAll} */
  describe('.getAll', function () {
    before(function () {
      sinon.stub(BucketPipeline.prototype, 'getAll').returns(Promise.resolve([]));
      return Hoist.bucket.getAll();
    });
    after(function () {
      BucketPipeline.prototype.getAll.restore();
    });
    it('calls bucketPipeline.get with correct key', function () {
      expect(BucketPipeline.prototype.getAll)
        .to.have.been.calledWith();
    });
    it('with callback', function (done) {
      Hoist.bucket.getAll(done);
    });
  });

  /** @test {BucketAPI#each} */
  describe('.each', function () {
    describe('with a function', function () {
      var fn = function () {};
      before(function () {
        sinon.stub(BucketPipeline.prototype, 'each').returns(Promise.resolve());
        return Hoist.bucket.each(fn);
      });
      after(function () {
        BucketPipeline.prototype.each.restore();
      });
      it('calls bucketPipeline.each with correct key', function () {
        expect(BucketPipeline.prototype.each)
          .to.have.been.calledWith(fn);
      });
      it('with callback', function (done) {
        Hoist.bucket.each(fn, done);
      });
    });
    describe('without function', function () {
      it('rejects', function () {
        expect(function () {
          Hoist.bucket.each();
        }).to.throw(Errors.bucket.InvalidError);
      });
    });
  });
  describe('.saveMeta', function () {
    describe('with meta and key', function () {
      var fakeMeta = {
        key: 'value'
      };
      var fakeKey = 'key';
      before(function () {
        sinon.stub(BucketPipeline.prototype, 'saveMeta').returns(Promise.resolve());
        return Hoist.bucket.saveMeta(fakeMeta, fakeKey);
      });
      after(function () {
        BucketPipeline.prototype.saveMeta.restore();
      });
      it('calls bucketPipeline.saveMeta with correct key', function () {
        expect(BucketPipeline.prototype.saveMeta)
          .to.have.been.calledWith(fakeMeta, fakeKey);
      });
      it('with callback', function (done) {
        Hoist.bucket.saveMeta(fakeMeta, fakeKey, done);
      });
    });
    describe('with meta and no key', function () {
      var fakeMeta = {
        key: 'value'
      };
      before(function () {
        sinon.stub(BucketPipeline.prototype, 'saveMeta').returns(Promise.resolve());
        return Hoist.bucket.saveMeta(fakeMeta);
      });
      after(function () {
        BucketPipeline.prototype.saveMeta.restore();
      });
      it('calls bucketPipeline.saveMeta with correct key', function () {
        expect(BucketPipeline.prototype.saveMeta)
          .to.have.been.calledWith(fakeMeta, undefined);
      });
    });
    describe('with meta and no key and callback', function () {
      var fakeMeta = {
        key: 'value'
      };
      before(function (done) {
        sinon.stub(BucketPipeline.prototype, 'saveMeta').returns(Promise.resolve());
        return Hoist.bucket.saveMeta(fakeMeta, done);
      });
      after(function () {
        BucketPipeline.prototype.saveMeta.restore();
      });
      it('calls bucketPipeline.saveMeta with correct key', function () {
        expect(BucketPipeline.prototype.saveMeta)
          .to.have.been.calledWith(fakeMeta, null);
      });
    });
  });
});
