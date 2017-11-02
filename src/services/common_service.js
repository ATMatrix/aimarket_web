/**
 * Created by zhubg on 2017/9/28.
 */

'use strict';

// import io from 'socket.io-client';
import request from '../utils/request_gql';

export function service(obj) {
  return request('/api', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {'Content-Type': 'application/json'}
  });
}

// export function
