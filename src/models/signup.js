/**
 * Created by zhubg on 2017/9/28.
 */

'use strict';

import { routerRedux } from 'dva/router'
import * as signupService from '../services/signup';
import {gqlBody_builder} from '../utils/gql/gqlBody_builder';
import {SINUP_GQl} from '../utils/gql/gql_template/index';

export default {
  namespace: 'signup',

  state: {},

  effects: {
    * signup ({
      payload,
    }, { put, call, select }) {
      //request start
      const result = yield call(signupService.signup,gqlBody_builder(SINUP_GQl,payload));
      // console.log(gqlBody_builder(SINUP_GQl,payload));
      console.log(result);
      if(result.type !== "error") {
        //request success
        let dataContent = JSON.parse(result.data.data.addUser.content);
        console.log(dataContent);
        if(dataContent.flag){
          //signup success
          console.log("signup success");
        }else {
          //signup fail
          console.log("signup failed");
        }
      }else {
        //fail
      }

      // const { locationQuery } = yield select(_ => _.app);
      // if (data.success) {
      //   const { from } = locationQuery;
      //   yield put({ type: 'app/query' });
      //   if (from && from !== '/login') {
      //     yield put(routerRedux.push(from))
      //   } else {
      //     yield put(routerRedux.push('/dashboard'))
      //   }
      // } else {
      //   throw data
      // }
    }
  }

}
