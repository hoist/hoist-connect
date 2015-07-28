'use strict';
import Hoist from '../../src';
import {expect} from 'chai';
import HoistErrors from '@hoist/errors';
import {Pipeline as UserPipeline} from '@hoist/user-pipeline';
import {AppUser} from '@hoist/model';
import sinon from 'sinon';

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
        sinon.stub(UserPipeline.prototype, 'login').returns(Promise.resolve(appUser));
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
      describe('valid request', function () {
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
      before(function () {
        sinon.stub(UserPipeline.prototype, 'invite').returns(Promise.resolve(null));
      });
      after(function () {
        UserPipeline.prototype.invite.restore();
      });
      it('requires user details', function () {
        return expect(function () {
          Hoist.user.invite(null);
        }).to.throw(HoistErrors.user.request.InvalidError, 'user details are required');
      });
      describe('valid request', function () {
        before(function () {
          return (Hoist.user.invite({
            username: 'username'
          }));
        });
        it('passes details to pipeline', function () {
          expect(UserPipeline.prototype.invite)
            .to.have.been.calledWith({
              username: 'username'
            });
        });
      });
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
