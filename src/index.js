'use strict';
import {
  isFunction
}
from 'lodash';
import LockAPI from './lock';
import Bluebird from 'bluebird';
import DataAPI from './data';
import UserAPI from './user';
import EventsAPI from './events';
import ConnectorAPI from './connector';
import log from './log';
import TimeoutAPI from './timeout';
import Context from '@hoist/context';
import Model from '@hoist/model';
import BucketAPI from './bucket';

let index = {
  data: function (type) {
    return new DataAPI(type);
  },
  user: new UserAPI(),
  events: new EventsAPI(),
  connector: function (key) {
    return new ConnectorAPI(key);
  },
  log: log,
  lock: function CreateLock(name, timeout, callback) {
    let hoistLock = new LockAPI();
    if (!callback && isFunction(timeout)) {
      callback = timeout;
      timeout = null;
    }
    return Bluebird.resolve(hoistLock.aquireLock(name, timeout))
      .nodeify(callback);
  },
  timeout: new TimeoutAPI(),
  Context: Context,
  _model: Model,
  bucket: new BucketAPI()
};

index.event = index.events;

export default index;
