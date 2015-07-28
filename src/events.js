'use strict';
import Pipeline from '@hoist/events-pipeline';
import {
  isFunction
}
from 'lodash';
import Bluebird from 'bluebird';
import BaseAPI from './base_api';
import Context from '@hoist/context';

/**
 * Hoists event API
 */
class EventsAPI extends BaseAPI {
  /**
   * create a new instance of the event api
   */
  constructor() {
    super();
    this._pipeline = new Pipeline();
  }

  /**
   * raise a new event
   * @param {string} name - the name of the event
   * @param {object} payload - the event payload
   * @param {object} [contextOverride] - overides for the current context
   * @param {function(error: Error, objects: Event)} [callback] - callback to call when event has been raised
   * @returns {Promise<Event>} - a promise to have raised the Event
   */
  raise(name, payload, contextOverride, callback) {
    if (!callback && isFunction(contextOverride)) {
      callback = contextOverride;
      contextOverride = null;
    }
    if (!callback && isFunction(payload)) {
      callback = payload;
      payload = {};
    }
    return Bluebird.resolve(
      Context.get().then((context) => {
        return this._pipeline.raise(context, name, payload, contextOverride);
      })
    ).nodeify(callback);
  }
}

export default EventsAPI;
