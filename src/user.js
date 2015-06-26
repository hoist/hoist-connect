'use strict';
import Errors from '@hoist/errors';
import Pipeline from '@hoist/user-pipeline';
import BaseAPI from './base_api';
import Bluebird from 'bluebird';

class UserAPI extends BaseAPI {
  constructor() {
    super();
    this.pipeline = new Pipeline();
  }
  login(username, password, callback) {
    if (!username) {
      throw new Errors.user.request.InvalidError('username is required');
    }
    if (!password) {
      throw new Errors.user.request.InvalidError('password is required');
    }
    return Bluebird.resolve(this.pipeline.login(username, password))
      .nodeify(callback);
  }
  invite(userDetails, callback) {
    if (!userDetails) {
      throw new Errors.user.request.InvalidError('user details are required');
    }
    return Bluebird.resolve(this.pipeline.invite(userDetails))
      .nodeify(callback);
  }
}

export default UserAPI;
