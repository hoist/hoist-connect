'use strict';
var Hoist = require('../../lib');
var expect = require('chai').expect;
var HoistErrors = require('hoist-errors');
var UserPipeline = require('hoist-user-pipeline').Pipeline;
var AppUser = require('hoist-model').AppUser;
var sinon = require('sinon');
var BBPromise = require('bluebird');

describe('Hoist', function () {
  describe('.user', function () {
    var appUser;
    before(function () {
      appUser = new AppUser();
    });

    it('exists', function () {
      return expect(Hoist.user).to.exist;
    });
    describe('.login', function () {
      before(function () {
        sinon.stub(UserPipeline.prototype, 'login').returns(BBPromise.resolve(appUser));
      });
      after(function () {
        UserPipeline.prototype.login.restore();
      });
      it('requires username', function () {
        return expect(function () {
          Hoist.user.login(null, 'password');
        }).to.throw(HoistErrors.user.request.InvalidError, 'username is required');
      });
      it('requires password', function () {
        return expect(function () {
          Hoist.user.login('user', null);
        }).to.throw(HoistErrors.user.request.InvalidError, 'password is required');
      });
      describe('successful login', function () {
        var result;
        before(function () {
          return (result = Hoist.user.login('username', 'password'));
        });
        it('returns app user', function () {
          return expect(result).to.become(appUser);
        });
        it('passes username and password to pipeline', function () {
          expect(UserPipeline.prototype.login)
            .to.have.been.calledWith('username', 'password');
        });
      });
    });
    describe('.invite', function () {

    });
    describe('.create', function () {

    });
    describe('.find', function () {

    });
    describe('.delete', function () {

    });
    describe('.resetPassword', function () {

    });
  });
});
