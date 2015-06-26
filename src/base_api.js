'use strict';
import logger from '@hoist/logger';
/**
 * a base class for api definitions
 * @access protected
 */
class BaseAPI {
  /**
  * create a new Base API
  * sets up a logger member
  * @abstract
  */
  constructor() {
    this._logger = logger.child({
      cls: this.constructor.name
    });
  }
}

export default BaseAPI;
