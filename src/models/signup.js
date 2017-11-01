/**
 * Created by zhubg on 2017/9/28.
 */

'use strict';

import { routerRedux } from 'dva/router'
import * as signupService from '../services/signup';
import {gqlBody_builder} from '../utils/gql/gqlBody_builder';
import {SINUP_GQL} from '../utils/gql/gql_template/index';

export default {
  namespace: 'signup',

  state: {
    signupFlag:'signupFlag_null',
  },
  reducers: {
    saveSignupFlag(state, { payload: { signupFlag } }) {
      return { ...state, signupFlag };
    }
  },
  effects: {
    * signup ({
                payload,
              }, { put, call, select }) {
      //request start
      const result = yield call(signupService.signup,gqlBody_builder(SINUP_GQL,payload));
      // console.log(gqlBody_builder(SINUP_GQl,payload));
      console.log('+++++++++++++++++++++++++');      
      console.log("signup:", result);    
      if(result.type != undefined && result.type != "error") {
        //request success
        let dataContent = JSON.parse(result.data.data.addUser.content);
        // let dataContent = {"flag" : true}
        console.log(dataContent);
        if(dataContent.flag){
          //signup success
          console.log("signup success");
          yield put({
            type: 'saveSignupFlag',
            payload: {
              signupFlag:"signupFlag_true",
            }
          });
          // proxyGlobal.emit("signupFlag_true");
          let signupFlagTemp = yield select(state => state.signup);
          console.log(signupFlagTemp);
        }else {
          //signup fail
          console.log("signup failed");
          yield put({
            type: 'saveSignupFlag',
            payload: {
              signupFlag:"signupFlag_false",
            }
          });
          // proxyGlobal.emit("signupFlag_false");
          let signupFlagTemp = yield select(state => state.signup);
          console.log(signupFlagTemp);
        }
      }else {
        //request fail
        yield put({
          type: 'saveSignupFlag',
          payload: {
            signupFlag:"signupFlag_false"
          }
        });
        let signupFlagTemp = yield select(state => state.signup);
        console.log(signupFlagTemp);
      }
    },

    * setSignUpFlag ({
      payload,
    }, { put, call, select }) {
      yield put({
        type: 'saveSignupFlag',
        payload: {
          signupFlag : payload
        }
      });
    }
  },


}
