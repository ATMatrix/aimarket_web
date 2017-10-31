'use strict';
import { routerRedux } from 'dva/router'
import * as signupService from '../services/signup';
import {gqlBody_builder} from '../utils/gql/gqlBody_builder';
import {SINUP_GQl} from '../utils/gql/gql_template/index';

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
      // const { locationQuery } = yield select(_ => _.app)
      // data.success
      if (true) {
       //request success
       // let dataContent = JSON.parse(result.data.data.addUser.content);
       let dataContent = {"flag" : true};
       console.log(dataContent);
       if(dataContent.flag){
         //login success
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
         let loginFlagTemp = yield select(state => state.login);
         console.log(loginFlagTemp);
         yield put(routerRedux.push('/userAccount'))
       }else {
         //login fail
         console.log("login failed");
         yield put({
           type: 'saveLoginFlag',
           payload: {
             loginFlag:"loginFlag_false",
           }
         });
        //  proxyGlobal.emit("loginFlag_false");
        //  let loginFlagTemp = yield select(state => state.login);
        //  console.log(loginFlagTemp);
       }
     } else {
       //request fail
       yield put({
         type: 'saveloginFlag',
         payload: {
           loginFlag:"loginFlag_false"
         }
       });
      //  let loginFlagTemp = yield select(state => state.login);
      //  console.log(loginFlagTemp);
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
