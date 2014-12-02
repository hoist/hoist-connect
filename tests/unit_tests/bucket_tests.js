'use strict';
var Hoist = require('../../lib');
var expect = require('chai').expect;
var sinon = require('sinon');
var Bucket = require('hoist-model').Bucket;
var BBPromise = require('bluebird');
var bucketPipeline = require('hoist-bucket-pipeline').Pipeline;


describe.only('Hoist.bucket', function () {
  it('exists', function () {
    return expect(Hoist.bucket).to.exist;
  });
  
  describe('.add with no arguments', function () {
    var bucket = {};
    var newBucket;
    before(function () {
      sinon.stub(Bucket, 'findOneAsync').returns(BBPromise.resolve(bucket));
      sinon.stub(bucketPipeline.prototype, 'add').returns(BBPromise.resolve());
      newBucket = Hoist.bucket;
      return newBucket.add();
    });
    after(function () {
      Bucket.findOneAsync.restore();
      bucketPipeline.prototype.add.restore();
    });
    it('sets the meta correctly', function () {
      return expect(newBucket.meta).to.eql(null);
    });
    it('called with correct args', function () {
      return expect(bucketPipeline.prototype.add.calledWith(null, null)).to.be.true;
    });
    it('sets the key correctly', function () {
      return expect(newBucket.key).to.eql(null);
    });
  });
  describe('.add with non existant key argument', function () {
    var newBucket;
    var fakeKey = '2hgjfkitl98-6_hftgh4';
    before(function () {
      sinon.stub(Bucket, 'findOneAsync').returns(BBPromise.resolve());
      sinon.stub(bucketPipeline.prototype, 'add').returns(BBPromise.resolve());

      newBucket = Hoist.bucket;
      return newBucket.add(fakeKey);
    });
    after(function () {
      Bucket.findOneAsync.restore();
      bucketPipeline.prototype.add.restore();
    });
    it('called with correct args', function () {
      return expect(bucketPipeline.prototype.add.calledWith(fakeKey, null)).to.eql(true);
    });

    it('sets the meta to null', function () {
      return expect(newBucket.meta).to.eql(null);
    });
    it('sets the key correctly', function () {
      return expect(newBucket.key).to.eql(fakeKey);
    });
  });
  describe('.add with an existing key argument', function () {
    var bucket = {};
    var newBucket;
    var fakeKey = '2hgjfkitl98-6_hftgh4';
    before(function () {
      sinon.stub(Bucket, 'findOneAsync').returns(BBPromise.resolve(bucket));
      sinon.stub(bucketPipeline.prototype, 'add').returns(BBPromise.resolve());
      newBucket = Hoist.bucket;
      return newBucket.add(fakeKey);
    });
    after(function () {
      Bucket.findOneAsync.restore();
      bucketPipeline.prototype.add.restore();
    });
    it('called with correct args', function () {
      return expect(bucketPipeline.prototype.add.calledWith(null, null)).to.eql(true);
    });
    it('sets the meta to null', function () {
      return expect(newBucket.meta).to.eql(null);
    });
    it('sets the key to null', function () {
      return expect(newBucket.key).to.eql(null);
    });
  });
  describe('.add with valid meta argument', function () {
    var newBucket;
    var fakeMeta = {
      fakekey: 'fake data'
    };
    before(function () {
      sinon.stub(Bucket, 'findOneAsync').returns(BBPromise.resolve());
      newBucket = Hoist.bucket;
      sinon.stub(bucketPipeline.prototype, 'add').returns(BBPromise.resolve());

      return newBucket.add(fakeMeta);
    });
    after(function () {
      Bucket.findOneAsync.restore();
      bucketPipeline.prototype.add.restore();
    });
    it('called with correct args', function () {
      return expect(bucketPipeline.prototype.add.calledWith( null, fakeMeta)).to.eql(true);
    });
    it('sets the meta correctly', function () {
      return expect(newBucket.meta).to.eql(fakeMeta);
    });
    it('sets the key correctly', function () {
      return expect(newBucket.key).to.eql(null);
    });
  });
  describe('.add with valid key and meta arguments', function () {
    var newBucket;
    var fakeMeta = {
      fakekey: 'fake data'
    };
    var fakeKey = '2hgjfkitl98-6_hftgh4';
    before(function () {
      sinon.stub(Bucket, 'findOneAsync').returns(BBPromise.resolve());
      sinon.stub(bucketPipeline.prototype, 'add').returns(BBPromise.resolve());
      newBucket = Hoist.bucket;
      return newBucket.add(fakeMeta,fakeKey );
    });
    after(function () {
      Bucket.findOneAsync.restore();
      bucketPipeline.prototype.add.restore();
    });
    it('called with correct args', function () {
      return expect(bucketPipeline.prototype.add.calledWith(fakeKey, fakeMeta)).to.eql(true);
    });
    it('sets the meta correctly', function () {
      return expect(newBucket.meta).to.eql(fakeMeta);
    });
    it('sets the key correctly', function () {
      return expect(newBucket.key).to.eql(fakeKey);
    });
  });
  
});