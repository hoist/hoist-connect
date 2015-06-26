'use strict';
import Context from '@hoist/context';
import Errors from '@hoist/errors';
import {
  isNumber
}
from 'lodash';
import BaseAPI from './base_api';

class TimeoutAPI extends BaseAPI {
  reset(milliseconds) {
    //upper bound at 2m
    //lower bound at 1s
    return Promise.resolve().then(() => {

      if (!milliseconds || !isNumber(milliseconds) || milliseconds > 120000 || milliseconds < 1) {
        throw new Errors.timeout.InvalidTimeoutValueError();
      }

      return Context.get().then((context) => {
        if (context.timeout) {
          clearTimeout(context.timeout.current);
          context.timeout.current = setTimeout(context.timeout.onTimeout, milliseconds);
        }
      });
    });

  }
}


export default TimeoutAPI;
