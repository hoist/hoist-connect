'use strict';
require('../bootstrap');
var Hoist = require('../../src');
var expect = require('chai').expect;
var sinon = require('sinon');
var BBPromise = require('bluebird');
var DataPipeline = require('@hoist/data-pipeline').Pipeline;

/** @test {DataAPI} */
describe('Hoist.data', function () {
  /** @test {BucketAPI#find} */
  describe('Hoist.data#find', function () {
    var data;
    before(function () {
      data = Hoist.data();
    });
    var result = [{

    }];
    var retrieved;
    before(function () {
      sinon.stub(DataPipeline.prototype, 'find').returns(BBPromise.resolve(result));
      data._type = 'person';
    });
    after(function () {
      DataPipeline.prototype.find.restore();
    });
    describe('with no query', function () {
      before(function () {
        retrieved = data.find();
      });
      after(function () {
        DataPipeline.prototype.find.reset();
      });
      it('retrieves data specifying correct type, and basic query', function () {
        expect(DataPipeline.prototype.find)
          .to.have.been.calledWith('person', {});
      });
      it('returns correct data', function () {
        expect(retrieved).to.eventually.eql(result);
      });
    });
    describe('with a query defined', function () {
      before(function () {
        retrieved = data.find({
          '_id': 'id'
        });
      });
      after(function () {
        DataPipeline.prototype.find.reset();
      });
      it('retrieves data specifying correct type', function () {
        expect(DataPipeline.prototype.find)
          .to.have.been.calledWith('person', {
            '_id': 'id'
          });
      });
      it('returns correct data', function () {
        return expect(retrieved).to.eventually.eql(result);
      });
    });
  });
  /** @test {BucketAPI#findOne} */
  describe('Hoist.data#findOne', function () {
    var data;
    before(function () {
      data = Hoist.data();
    });
    var result = {

    };
    var retrieved;
    before(function () {
      sinon.stub(DataPipeline.prototype, 'findOne').returns(BBPromise.resolve(result));
      data._type = 'person';
    });
    after(function () {
      DataPipeline.prototype.findOne.restore();
    });
    describe('with no query', function () {
      let error;
      before(function () {
        return data.findOne().catch((err) => {
          error = err;
        });
      });
      after(function () {
        DataPipeline.prototype.findOne.reset();
      });
      it('throws an error', function () {
        /* jshint -W030 */
        return expect(error.message)
          .to.eql('you need to specify a query for #findOne');
      });
    });
    describe('with a query defined', function () {
      before(function () {
        retrieved = data.findOne({
          '_id': 'id'
        });
      });
      after(function () {
        DataPipeline.prototype.findOne.reset();
      });
      it('retrieves data specifying correct type', function () {
        expect(DataPipeline.prototype.findOne)
          .to.have.been.calledWith('person', {
            '_id': 'id'
          });
      });
      it('returns correct data', function () {
        return expect(retrieved).to.eventually.eql(result);
      });
    });
  });
  /** @test {BucketAPI#findById} */
  describe('Hoist.data#findById', function () {
    var data;
    before(function () {
      data = Hoist.data();
    });
    var result = {

    };
    var retrieved;
    before(function () {
      sinon.stub(DataPipeline.prototype, 'findOne').returns(BBPromise.resolve(result));
      data._type = 'person';
    });
    after(function () {
      DataPipeline.prototype.findOne.restore();
    });
    describe('with no id', function () {
      let error;
      before(function () {
        retrieved = data.findById().catch((err) => {
          error = err;
        });
      });
      after(function () {
        DataPipeline.prototype.findOne.reset();
      });
      it('throws an error', function () {
        /* jshint -W030 */
        return expect(error.message)
          .to.eql('you need to specify an id for #findById');
      });
    });
    describe('with an id defined', function () {
      before(function () {
        retrieved = data.findById('id');
      });
      after(function () {
        DataPipeline.prototype.findOne.reset();
      });
      it('retrieves data specifying correct type', function () {
        expect(DataPipeline.prototype.findOne)
          .to.have.been.calledWith('person', {
            '_id': 'id'
          });
      });
      it('returns correct data', function () {
        return expect(retrieved).to.eventually.eql(result);
      });
    });
  });
});
