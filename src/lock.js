'use strict';
import config from 'config';
import redisLock from 'redis-lock';
import redis from 'redis';
import BaseAPI from './base_api';

let client;

class HoistLockAPI extends BaseAPI {
  constructor() {
    super();
    this.client = HoistLockAPI._getClient();
    this.lock = redisLock(this.client);
  }
  aquireLock(name, timeout) {

    timeout = timeout || 500;
    return new Promise((resolve) => {
      this.lock(name, timeout, function (done) {
        this.release = done;
        resolve(this);
      });
    });
  }
}


HoistLockAPI._getClient = function () {
  return client || (client = redis.createClient(config.get('Hoist.redis.port'), config.get('Hoist.redis.host')));
};



export default HoistLockAPI;
