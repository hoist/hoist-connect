'use strict';
import Pipeline from '@hoist/events-pipeline';
import {
  isFunction
}
from 'lodash';
import Bluebird from 'bluebird';
import BaseAPI from './base_api';

class EventsAPI extends BaseAPI {
  constructor() {
    super();
    this.pipeline = new Pipeline();
  }
  raise(name, payload, contextOverride, callback) {
    if (!callback && isFunction(contextOverride)) {
      callback = contextOverride;
      contextOverride = null;
    }
    if (!callback && isFunction(payload)) {
      callback = payload;
      payload = {};
    }
    return Bluebird.resolve(this.pipeline.raise(name, payload, contextOverride))
      .nodeify(callback);
  }
}

export default EventsAPI;
