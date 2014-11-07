'use strict';
var HoistErrors = require('hoist-errors');
var userPipeline = require('hoist-user-pipeline')(require('hoist-model'));

function UserApi() {

}

UserApi.prototype = {
  login: function (username, password, callback) {
    if (!username) {
      throw new HoistErrors.user.request.InvalidError('username is required');
    }
    if (!password) {
      throw new HoistErrors.user.request.InvalidError('password is required');
    }
    return userPipeline.login(username, password).nodeify(callback);
  }
};
module.exports = new UserApi();
