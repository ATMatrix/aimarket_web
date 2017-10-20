/**
 * Created by zhubg on 2017/10/20.
 */

'use strict';

import { routerRedux } from 'dva/router'
import * as commonService from '../services/common_service';
import {gqlBody_builder} from '../utils/gql/gqlBody_builder';
import {CALLAI_GQl} from '../utils/gql/gql_template/index';

export default {
  namespace: 'ai',

  state: {
    signupFlag:'signupFlag_null',
    aiName:"",
    callAIResult:{}
  },
  reducers: {
    saveSignupFlag(state, { payload: { signupFlag } }) {
      return { ...state, signupFlag };
    },
    saveCallAIResult(state, { payload: { callAIResult } }) {
      return { ...state, callAIResult };
    },
    saveAIName(state, { payload: { aiName } }) {
      return { ...state, aiName };
    }
  },
  effects: {
    * callai ({
      payload
    }, { put, call, select }) {
      //request start
      const result = yield call(commonService.service,gqlBody_builder(CALLAI_GQl,payload));
      // console.log(gqlBody_builder(SINUP_GQl,payload));
      console.log(result);

      if(result.data && result.data.data.callAI.content && (result.data.data.callAI.type !== "error")){
        let dataContent = JSON.parse(result.data.data.callAI.content);

        yield put({
          type: 'saveCallAIResult',
          payload: {
            callAIResult:dataContent
          }
        });
      } else {
        console.log("request fail!");
      }

    }
    ,
    * setAIName ({
      payload
    }, { put, call, select }) {
      console.log(payload);
      yield put({
        type: 'saveAIName',
        payload: {
          aiName:payload
        }
      });
    }
    ,
    * setcallAIResult ({
      payload
    }, { put, call, select }) {
      console.log(payload);
      yield put({
        type: 'saveCallAIResult',
        payload: {
          aiName:payload
        }
      });
    }

  }

}
