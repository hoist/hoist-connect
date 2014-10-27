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
      it('defines #get', function () {
        expect(data).to.respondTo('get');
      });
      it('defines #post', function () {
        expect(data).to.respondTo('get');
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
    });
    describe('#get', function () {
      var data;
      before(function () {
        data = Hoist.data();
      });
      describe('with type defined', function () {
        describe('with no id', function () {
          var result = [{

          }];
          var retrieved;
          before(function () {
            sinon.stub(dataPipeline.authentication,'apply').returns(BBPromise.resolve(true));
            sinon.stub(dataPipeline,'retrieve').returns(BBPromise.resolve(result));
            data._type = 'person';
            retrieved = data.get();
          });

          after(function () {
            dataPipeline.authentication.apply.restore();
            dataPipeline.retrieve.restore();
          });
          it('authenticates', function () {
            /* jshint -W030 */
            expect(dataPipeline.authentication.apply)
              .to.have.been.called;
          });
          it('retrieves data specifying correct type', function () {
            expect(dataPipeline.retrieve)
              .to.have.been.calledWith('person');
          });
          it('returns correct data', function () {
            expect(retrieved).to.eventually.eql(result);
          });
        });
      });
      describe('with no type defined', function () {
        before(function () {

        });
      });
    });
  });
});
