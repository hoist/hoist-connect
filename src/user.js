'use strict';
import Errors from '@hoist/errors';
import Pipeline from '@hoist/user-pipeline';
import BaseAPI from './base_api';
import Bluebird from 'bluebird';

/**
 * Hoists User API
 * @depreciated
 */
class UserAPI extends BaseAPI {
  /**
   * create a user API
   */
  constructor() {
    super();
    this._pipeline = new Pipeline();
  }

  /**
   * log the user in
   * @params {string} username - the username
   * @params {password} password - the password
   */
  login(username, password, callback) {
    if (!username) {
      throw new Errors.user.request.InvalidError('username is required');
    }
    if (!password) {
      throw new Errors.user.request.InvalidError('password is required');
    }
    return Bluebird.resolve(this._pipeline.login(username, password))
      .nodeify(callback);
  }
  invite(userDetails, callback) {
    if (!userDetails) {
      throw new Errors.user.request.InvalidError('user details are required');
    }
    return Bluebird.resolve(this._pipeline.invite(userDetails))
      .nodeify(callback);
  }
}

export default UserAPI;
