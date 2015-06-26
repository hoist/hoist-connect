'use strict';
import errors from '@hoist/errors';
import Pipeline from '@hoist/connector-pipeline';
import BaseAPI from './base_api';

class ConnectorAPI extends BaseAPI {
  constructor(key) {
    super();
    if (!key) {
      throw new errors.connector.request.InvalidError();
    }
    this._pipeline = new Pipeline();
    this._key = key;
  }
  _loadConnector() {
    return this._connector || (this._connector = this._pipeline.loadConnector(this._key));
  }
  get() {
    var getArgs = arguments;
    return this._loadConnector.then((c) => {
      return c.get.apply(c, getArgs);
    }).catch((err) => {
      this._logger.error(err);
      throw err;
    });
  }
  put() {
    var putArgs = arguments;
    return this._loadConnector.then((c) => {
      return c.put.apply(c, putArgs);
    }).catch((err) => {
      this._logger.error(err);
      throw err;
    });
  }
  post() {
    var postArgs = arguments;
    return this._loadConnector.then((c) => {
      return c.post.apply(c, postArgs);
    }).catch((err) => {
      this._logger.error(err);
      throw err;
    });
  }
  delete() {
    var deleteArgs = arguments;
    return this._loadConnector.then((c) => {
      return c.delete.apply(c, deleteArgs);
    }).catch((err) => {
      this._logger.error(err);
      throw err;
    });
  }
  authorize(token, callback) {
    return this._loadConnector.then((c) => {
      return c.authorize(token);
    }).then(() => {
      return this;
    }).nodeify(callback);
  }
}

export default ConnectorAPI;
