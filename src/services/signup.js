/**
 * Created by zhubg on 2017/9/28.
 */

'use strict';

import request from '../utils/request_gql';

export function signup(obj) {
  return request('/api', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {'Content-Type': 'application/json'}
  });
}
