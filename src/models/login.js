'use strict';
import { routerRedux } from 'dva/router'
import * as commonService from '../services/common_service';
import {gqlBody_builder} from '../utils/gql/gqlBody_builder';
import {SININ_GQL} from '../utils/gql/gql_template/index';

export default {
  namespace: 'login',

  state: {
    loginFlag:'loginFlag_null',
    username: ''
  },
  reducers: {
    saveLoginFlag(state, { payload: { loginFlag } }) {
      return { ...state, loginFlag };
    },
    saveUsername(state, { payload: { username } }) {
      return { ...state, username };
    }
   
  },

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      console.log("login:login ", payload);
      // let data = yield call(login, payload)
      console.log(gqlBody_builder(SININ_GQL,payload))
      const result = yield call(commonService.service,gqlBody_builder(SININ_GQL,payload));
      // console.log('--------------');  
      console.log("result: ", result);
      // const { locationQuery } = yield select(_ => _.app)
      // data.success
      if(result.err != null) {
        console.log("result err: ", result.err);
        console.log("request failed");
        yield put({
          type: 'saveLoginFlag',
          payload: {
            loginFlag:"loginFlag_fail",
          }
        });
      }
      else {
        if (result.data.loginUser.type != undefined && result.data.loginUser.type !== 'error') {
          console.log("login success");
          yield put({
            type: 'saveLoginFlag',
            payload: {
              loginFlag:"loginFlag_true",
            }
          });
          console.log("login username: ", payload.user.username);
          yield put({
             type: 'saveUsername',
             payload: {
               username : payload.user.username
             }
           });
          // proxyGlobal.emit("loginFlag_true");
         //  let loginFlagTemp = yield select(state => state.login);
         //  console.log(loginFlagTemp);
          yield put(routerRedux.push('/userAccount'))
         }
           else {
        //request fail
        console.log("login failed");
        yield put({
          type: 'saveLoginFlag',
          payload: {
            loginFlag:"loginFlag_false",
          }
        });
       //  let loginFlagTemp = yield select(state => state.login);
       //  console.log(loginFlagTemp);
      }
      }

   },

   * setLoginFlag ({
     payload,
      }, { put, call, select }) {
        yield put({
          type: 'saveLoginFlag',
          payload: {
            loginFlag : payload
          }
        });
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
    },

    * logout ({
      payload,
       }, { put, call, select }) {
         yield put({
           type: 'saveUsername',
           payload: {
             username : payload
           }
         });
         yield put(routerRedux.push('/'))
       },

 }
}
