'use strict';

import { routerRedux } from 'dva/router';
import * as commonService from '../services/common_service';
import { gqlBody_builder } from '../utils/gql/gqlBody_builder';
import { CALLAI_GQL } from '../utils/gql/gql_template/index';

export default {
  namespace: 'censor',

  state: {
    result: '{}',
    id: null,
  },

  reducers: {
    updateResult(state, { payload }) {
      return {
        ...state,
        result: payload,
      };
    },
    clearID(state) {
      return {
        ...state,
        result: '',
        id: null,
      };
    },
    setID(state, {payload}) {
      return {
        ...state,
        id: payload,
      }
    }
  },

  effects: {
    * censorImage({
      payload,
    }, { put, call }) {
      const result = yield call(commonService.service, gqlBody_builder(CALLAI_GQL, payload));
      if (result && result.data.callAI.content && (result.data.callAI.type !== "error")) {
        const dataContent = result.data.callAI.content;

        yield put({
          type: 'updateResult',
          payload: dataContent,
        });
      } else {
        console.log("request fail!");
      }
    }
  },
  * clear(payload = null, { put }) {
    yield put({
      type: 'clearID',
    });
  },
  * setFuck({ payload }, { put }) {
    yield put({
      type: 'setID',
      payload,
    })
  }
}
