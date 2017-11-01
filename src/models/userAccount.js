/**
 * Created by zhubg on 2017/10/20.
 */

'use strict';

import { routerRedux } from 'dva/router'
import * as commonService from '../services/common_service';

export default {

  namespace: 'userAccount',

  state: {
    accountAddress: '',
    accountBalance: '',
    username: ''
  },
  reducers: {
    saveAccountAddress(state, { payload: { accountAddress } }) {
      return { ...state, accountAddress };
    },
    saveAccountBalance(state, { payload: { accountBalance } }) {
      return { ...state, accountBalance };
    },
    saveUsername(state, { payload: { username } }) {
      return { ...state, username };
    }
  },
  effects: {
    * setAccountAddress ({
                         payload
                       }, { put, call, select }) {
      //request start
      yield put({
        type: 'saveAccountAddress',
        payload: {
          accountAddress : payload
        }
      });
    }
    ,
    * setAccountBalance ({
      payload
    }, { put, call, select }) {
    //request start
      yield put({
      type: 'saveAccountBalance',
      payload: {
        accountBalance : payload
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
