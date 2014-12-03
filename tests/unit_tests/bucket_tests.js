'use strict';
var Hoist = require('../../lib');
var expect = require('chai').expect;
var sinon = require('sinon');
var Bucket = require('hoist-model').Bucket;
var BBPromise = require('bluebird');
var bucketPipeline = require('hoist-bucket-pipeline').Pipeline;
var Context = require('hoist-context');
var HoistErrors = require('hoist-errors');

describe('Hoist.bucket', function () {
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
  describe('.add with an invalid key argument', function () {
    var bucket = {};
    var newBucket;
    var fakeKey = '2hgjfkitl98-6_hf';
    var error;
    before(function (done) {
      sinon.stub(Bucket, 'findOneAsync').returns(BBPromise.resolve(bucket));
      sinon.stub(bucketPipeline.prototype, 'add').returns(BBPromise.resolve());
      newBucket = Hoist.bucket;
      newBucket.add(fakeKey).catch(function(err){
        error = err;
        done();
      });
    });
    after(function () {
      Bucket.findOneAsync.restore();
      bucketPipeline.prototype.add.restore();
    });
    it('rejects', function () {
      expect(error)
        .to.be.instanceOf(HoistErrors.bucket.InvalidError)
        .and.have.property('message', 'Bucket id seems to be invalid');
    });
    
  });
  describe('.add with an existing key argument', function () {
    var bucket = {};
    var newBucket;
    var fakeKey = '2hgjfkitl98-6_hftgh4';
    var error;
    before(function (done) {
      sinon.stub(Bucket, 'findOneAsync').returns(BBPromise.resolve(bucket));
      sinon.stub(bucketPipeline.prototype, 'add').returns(BBPromise.resolve());
      newBucket = Hoist.bucket;
      newBucket.add(fakeKey).catch(function(err){
        error = err;
        done();
      });
    });
    after(function () {
      Bucket.findOneAsync.restore();
      bucketPipeline.prototype.add.restore();
    });
    it('rejects', function () {
      expect(error)
        .to.be.instanceOf(HoistErrors.bucket.InvalidError)
        .and.have.property('message', 'A bucket with id '+fakeKey+' already exists');
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
  describe('.add with valid key and meta arguments, with key first', function () {
    var newBucket;
    var fakeMeta = {
      fakekey: 'fake data'
    };
    var fakeKey = '2hgjfkitl98-6_hftgh4';
    before(function () {
      sinon.stub(Bucket, 'findOneAsync').returns(BBPromise.resolve());
      sinon.stub(bucketPipeline.prototype, 'add').returns(BBPromise.resolve());
      newBucket = Hoist.bucket;
      return newBucket.add(fakeKey, fakeMeta);
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

  describe('.add with valid key and meta arguments, with meta first', function () {
    var newBucket;
    var fakeMeta = {
      fakekey: 'fake data'
    };
    var fakeKey = '2hgjfkitl98-6_hftgh4';
    before(function () {
      sinon.stub(Bucket, 'findOneAsync').returns(BBPromise.resolve());
      sinon.stub(bucketPipeline.prototype, 'add').returns(BBPromise.resolve());
      newBucket = Hoist.bucket;
      return newBucket.add( fakeMeta, fakeKey);
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

  describe('.setCurrent', function () {
    describe('with a valid bucket id', function () {
      var newBucket;
      var context = {};
      var fakeId = '2hgjfkitl98-6_hftgh4';
      before(function () {
        sinon.stub(Bucket, 'findOneAsync').returns(BBPromise.resolve({}));
        sinon.stub(Context, 'get').returns(BBPromise.resolve(context));
        newBucket = Hoist.bucket;
        return newBucket.setCurrent(fakeId);
      });
      after(function () {
        Bucket.findOneAsync.restore();
        Context.get.restore();
      });
      it('called with correct args', function () {
        return expect(Bucket.findOneAsync.calledWith(fakeId)).to.eql(true);
      });
      it('calls Context.get', function () {
        return expect(Context.get.calledOnce).to.eql(true);
      });
      it('sets context.bucket to the bucket id', function () {
        return expect(context.bucket).to.eql(fakeId);
      });
    });
    describe('with an invalid bucket id', function () {
      var newBucket;
      var error;
      var context = {};
      var fakeId = '2hgjfkitl98-6_hftgh4';
      before(function (done) {
        sinon.stub(Bucket, 'findOneAsync').returns(BBPromise.resolve(null));
        sinon.stub(Context, 'get').returns(BBPromise.resolve(context));
        newBucket = Hoist.bucket;
        newBucket.setCurrent(fakeId).catch(function(err){
          error = err;
          done();
        });
      });
      after(function () {
        Bucket.findOneAsync.restore();
        Context.get.restore();
      });
      it('rejects', function () {
        expect(error)
        .to.be.instanceOf(HoistErrors.bucket.NotFoundError);
      });
      it('called with correct args', function () {
        return expect(Bucket.findOneAsync.calledWith(fakeId)).to.eql(true);
      });
      it('calls Context.get', function () {
        return expect(Context.get.called).to.eql(false);
      });
      
    });
  });
  
});