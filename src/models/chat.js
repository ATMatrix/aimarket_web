/**
 * Created by zhubg on 2017/10/20.
 */

'use strict';

import { routerRedux } from 'dva/router'
import * as commonService from '../services/common_service';
const fs = require('fs')
import _ from 'lodash'

export default {

  namespace: 'chat',

  state: {
    messages: [],
    name: "",
    isInit: false,
    isLoggedIn: false
  },
  reducers: {
    saveMessages(state, { payload: { messages } }) {
      return { ...state, messages };
    },
    saveName(state, { payload: { name } }) {
      return { ...state, name };
    },
    saveIsInit(state, { payload: { isInit } }) {
      return { ...state, isInit };
    },
    saveIsLoggedIn(state, { payload: { isLoggedIn } }) {
      return { ...state, isLoggedIn };
    }

  },
  effects: {

    * setMessages ({
                         payload
                       }, { put, call, select }) {
      let msg = _.cloneDeep(yield select(state => state.chat.messages));

      console.log("original msg: ", msg);
      msg.push(payload);
      // msg += (payload + '\n');
      console.log("msg: ", msg);
      yield put({
        type: 'saveMessages',
        payload: {
          messages: msg
        }
      });
    },

    * setName ({
      payload
    }, { put, call, select }) {
      yield put({
        type: 'saveName',
        payload: {
          name: payload
      }
    });
    },

    * setIsInit ({
      payload
    }, { put, call, select }) {
      yield put({
        type: 'saveIsInit',
        payload: {
          isInit: payload
      }
    });
    },
    * setIsLoggedIn ({
      payload
    }, { put, call, select }) {
      yield put({
        type: 'saveIsLoggedIn',
        payload: {
          isLoggedIn: payload
      }
    });
    }

  }

}
