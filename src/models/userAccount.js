/**
 * Created by zhubg on 2017/10/20.
 */

'use strict';

import { routerRedux } from 'dva/router'
import * as commonService from '../services/common_service';

export default {

  namespace: 'userAccount',

  state: {
    account: '',
    username: ''
  },
  reducers: {
    saveAccount(state, { payload: { account } }) {
      return { ...state, account };
    },
    saveUsername(state, { payload: { username } }) {
      return { ...state, username };
    }
  },
  effects: {
    * setAccount ({
                         payload
                       }, { put, call, select }) {
      //request start
      yield put({
        type: 'saveAccount',
        payload: {
          account : payload
        }
      });
    }
    ,
  * setUsername ({
    payload,
    }, { put, call, select }) {
      yield put({
        type: 'saveUsername',
        payload: {
          username : payload
        }
      });
    }

  }
} 
