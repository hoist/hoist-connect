'use strict';
require('../bootstrap');
var expect = require('chai').expect;
var Hoist = require('../../lib');

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
      it('defines #setType',function(){
        expect(data).to.respondTo('setType');
      });
      it('setType sets the _type property',function(){
        var originalType = data._type;
        data.setType('newType');
        var newType = data._type;
        data._type = originalType;
        expect(newType).to.eql('newtype');
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
      it('#save throws exception',function(){
        return expect(data.save({}))
          .to.be.rejectedWith('you need to specify a type for the retrieval, call #setType([typename]) first');
      });
    });
  });
});
