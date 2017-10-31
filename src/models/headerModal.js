/**
 * Created by zhubg on 2017/10/20.
 */

'use strict';

import { routerRedux } from 'dva/router'
import * as commonService from '../services/common_service';

export default {

  namespace: 'headerModal',

  state: {
    loginVisible: false,
    registerVisible: false,
    username: ''
  },
  reducers: {
    saveLoginVisible(state, { payload: { loginVisible } }) {
      return { ...state, loginVisible };
    },
    saveRegisterVisible(state, { payload: { registerVisible } }) {
      return { ...state, registerVisible };
    },
    saveState(state, { payload: { registerVisible, loginVisible } }) {
      return { ...state, registerVisible, loginVisible };
    },
    saveUsername(state, { payload: { username } }) {
      return { ...state, username };
    }
  },
  effects: {
    * setLoginVisible ({
                         payload
                       }, { put, call, select }) {
      //request start
      yield put({
        type: 'saveLoginVisible',
        payload: {
          loginVisible : payload
        }
      });
    }
    ,
    * setRegisterVisible ({
                            payload
                          }, { put, call, select }) {
      yield put({
        type: 'saveRegisterVisible',
        payload: {
          registerVisible : payload
        }
      });

    }

  }
  ,
  * setState ({
                payload
              }, { put, call, select }) {
    yield put({
      type: 'saveState',
      payload: {
        registerVisible : payload.registerVisible,
        loginVisible : payload.loginVisible
      }
    })
  },

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
