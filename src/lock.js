'use strict';
import config from 'config';
import redisLock from 'redis-lock';
import redis from 'redis';
import BaseAPI from './base_api';

let client;
/**
 * Hoists lock API
 */
class HoistLockAPI extends BaseAPI {

  /**
   * create new lock
   */
  constructor() {
    super();
  }

  /**
   * aquire a lock within the given timeout
   * @param {string} name - the key for the lock
   * @param {Number} [timeout=500] - the timeout to wait for the lock
   * @returns {Promise} - promise to have aquired the lock
   */
  aquireLock(name, timeout) {
    timeout = timeout || 500;
    client = HoistLockAPI._getClient();
    let lock = redisLock(client);
    return new Promise((resolve) => {
      lock(name, timeout, (done) => {
        /*
         * release the current lock
         */
        resolve({
          release: done
        });
      });
    });
  }
}


HoistLockAPI._getClient = function () {
  return client || (client = redis.createClient(config.get('Hoist.redis.port'), config.get('Hoist.redis.host')));
};
HoistLockAPI._clearClient = function () {
  if (client) {
    client.end();
    client = null;
  }
};



export default HoistLockAPI;
