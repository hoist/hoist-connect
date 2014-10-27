'use strict';
require('../bootstrap');
var Hoist = require('../../lib');
var expect = require('chai').expect;
var sinon = require('sinon');
var BBPromise = require('bluebird');
var dataPipeline = require('hoist-data-pipeline');

describe('Hoist', function () {
  describe('.data()', function () {
    it('is a function', function () {
      expect(Hoist)
        .to.respondTo('data');
    });
    var data;

    function standardMethods() {
      it('defines #find', function () {
        expect(data).to.respondTo('find');
      });
      it('defines #findOne', function () {
        expect(data).to.respondTo('findOne');
      });
    }
    describe('constructed with type', function () {
      before(function () {
        data = Hoist.data('Person');
      });
      it('sets _type', function () {
        expect(data._type).to.eql('person');
      });
      standardMethods(data);
    });
    describe('constructed without type', function () {
      before(function () {
        data = Hoist.data();
      });
      standardMethods(data);
      it('#find throws exception', function () {
        return expect(data.find())
          .to.be.rejectedWith('you need to specify a type for the retrieval, call #setType([typename]) first');
      });
      it('#findOne throws exception', function () {
        return expect(data.findOne({}))
          .to.be.rejectedWith('you need to specify a type for the retrieval, call #setType([typename]) first');
      });
      it('#findById throws exception', function () {
        return expect(data.findById('id'))
          .to.be.rejectedWith('you need to specify a type for the retrieval, call #setType([typename]) first');
      });

    });
    describe('#find', function () {
      var data;
      before(function () {
        data = Hoist.data();
      });
      var result = [{

      }];
      var retrieved;
      before(function () {
        sinon.stub(dataPipeline.authentication, 'apply').returns(BBPromise.resolve(true));
        sinon.stub(dataPipeline.query, 'find').returns(BBPromise.resolve(result));
        data._type = 'person';
      });
      after(function () {
        dataPipeline.authentication.apply.restore();
        dataPipeline.query.find.restore();
      });
      describe('with no query', function () {
        before(function () {
          retrieved = data.find();
        });
        after(function () {
          dataPipeline.authentication.apply.reset();
          dataPipeline.query.find.reset();
        });
        it('authenticates', function () {
          /* jshint -W030 */
          expect(dataPipeline.authentication.apply)
            .to.have.been.called;
        });
        it('retrieves data specifying correct type, and basic query', function () {
          expect(dataPipeline.query.find)
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
          dataPipeline.authentication.apply.reset();
          dataPipeline.query.find.reset();
        });
        it('authenticates', function () {
          /* jshint -W030 */
          expect(dataPipeline.authentication.apply)
            .to.have.been.called;
        });
        it('retrieves data specifying correct type', function () {
          expect(dataPipeline.query.find)
            .to.have.been.calledWith('person', {
              '_id': 'id'
            });
        });
        it('returns correct data', function () {
          return expect(retrieved).to.eventually.eql(result);
        });
      });
    });
    describe('#findOne', function () {
      var data;
      before(function () {
        data = Hoist.data();
      });
      var result = {

      };
      var retrieved;
      before(function () {
        sinon.stub(dataPipeline.authentication, 'apply').returns(BBPromise.resolve(false));
        sinon.stub(dataPipeline.query, 'findOne').returns(BBPromise.resolve(result));
        data._type = 'person';
      });
      after(function () {
        dataPipeline.authentication.apply.restore();
        dataPipeline.query.findOne.restore();
      });
      describe('with no query', function () {
        before(function () {
          retrieved = data.findOne();
        });
        after(function () {
          dataPipeline.authentication.apply.reset();
          dataPipeline.query.findOne.reset();
        });
        it('throws an error', function () {
          /* jshint -W030 */
          return expect(retrieved)
            .to.be.rejectedWith('you need to specify a query for #findOne');
        });
      });
      describe('with a query defined', function () {
        before(function () {
          retrieved = data.findOne({
            '_id': 'id'
          });
        });
        after(function () {
          dataPipeline.authentication.apply.reset();
          dataPipeline.query.findOne.reset();
        });
        it('authenticates', function () {
          /* jshint -W030 */
          expect(dataPipeline.authentication.apply)
            .to.have.been.called;
        });
        it('retrieves data specifying correct type', function () {
          expect(dataPipeline.query.findOne)
            .to.have.been.calledWith('person', {
              '_id': 'id'
            });
        });
        it('returns correct data', function () {
          return expect(retrieved).to.eventually.eql(result);
        });
      });
    });
    describe('#findById', function () {
      var data;
      before(function () {
        data = Hoist.data();
      });
      var result = {

      };
      var retrieved;
      before(function () {
        sinon.stub(dataPipeline.authentication, 'apply').returns(BBPromise.resolve(false));
        sinon.stub(dataPipeline.query, 'findOne').returns(BBPromise.resolve(result));
        data._type = 'person';
      });
      after(function () {
        dataPipeline.authentication.apply.restore();
        dataPipeline.query.findOne.restore();
      });
      describe('with no id', function () {
        before(function () {
          retrieved = data.findById();
        });
        after(function () {
          dataPipeline.authentication.apply.reset();
          dataPipeline.query.findOne.reset();
        });
        it('throws an error', function () {
          /* jshint -W030 */
          return expect(retrieved)
            .to.be.rejectedWith('you need to specify an id for #findById');
        });
      });
      describe('with an id defined', function () {
        before(function () {
          retrieved = data.findById('id');
        });
        after(function () {
          dataPipeline.authentication.apply.reset();
          dataPipeline.query.findOne.reset();
        });
        it('authenticates', function () {
          /* jshint -W030 */
          expect(dataPipeline.authentication.apply)
            .to.have.been.called;
        });
        it('retrieves data specifying correct type', function () {
          expect(dataPipeline.query.findOne)
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
});