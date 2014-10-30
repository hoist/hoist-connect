'use strict';
require('../bootstrap');
var Hoist = require('../../lib');
var sinon = require('sinon');
var expect = require('chai').expect;
var BBPromise = require('bluebird');
var dataPipeline = require('hoist-data-pipeline')(require('hoist-context'));

describe('Hoist', function () {
  describe('.data()', function () {
    before(function () {

    });
    var objToSave = {
      key: 'value'
    };
    var objWithReqFields = {
      key: 'value',
      _type: 'value2'
    };
    describe('#save', function () {
      before(function () {
        sinon.stub(dataPipeline.authentication, 'apply').returns(BBPromise.resolve(true));
        sinon.stub(dataPipeline.requiredFields, 'apply').returns(BBPromise.resolve(objWithReqFields));
        sinon.stub(dataPipeline.save, 'apply').returns(BBPromise.resolve(true));
      });
      after(function () {
        dataPipeline.authentication.apply.restore();
        dataPipeline.requiredFields.apply.restore();
        dataPipeline.save.apply.restore();
      });
      describe('with type set by class', function () {
        var data;
        before(function () {
          data = Hoist.data('person');
          data.save(objToSave);
        });
        after(function () {
          dataPipeline.authentication.apply.reset();
          dataPipeline.requiredFields.apply.reset();
          dataPipeline.save.apply.reset();
        });
        it('authenticates', function () {
          /* jshint -W030 */
          expect(dataPipeline.authentication.apply)
            .to.have.been.called;
        });
        it('passes to pipeline save', function () {
          expect(dataPipeline.save.apply)
            .to.have.been.calledWith(objWithReqFields);
        });
        it('applies required fields', function () {
          expect(dataPipeline.requiredFields.apply)
            .to.have.been.calledWith('person', objToSave);
        });
      });
      describe('with type set by object', function () {
        var data;
        before(function () {
          data = Hoist.data();
          data.save(objWithReqFields);
        });
        after(function () {
          dataPipeline.authentication.apply.reset();
          dataPipeline.requiredFields.apply.reset();
          dataPipeline.save.apply.reset();
        });
        it('authenticates', function () {
          /* jshint -W030 */
          expect(dataPipeline.authentication.apply)
            .to.have.been.called;
        });
        it('passes to pipeline save', function () {
          expect(dataPipeline.save.apply)
            .to.have.been.calledWith(objWithReqFields);
        });
        it('applies required fields', function () {
          expect(dataPipeline.requiredFields.apply)
            .to.have.been.calledWith('value2', objWithReqFields);
        });
      });
    });
  });
});
