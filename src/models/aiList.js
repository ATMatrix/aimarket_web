/**
 * Created by zhubg on 2017/10/20.
 */

'use strict';

import { routerRedux } from 'dva/router'
import * as commonService from '../services/common_service';
import {gqlBody_builder} from '../utils/gql/gqlBody_builder';
import {CALLAI_GQl} from '../utils/gql/gql_template/index';
import mock_data from '../components/AIList/mock_data/data'

export default {
  namespace: 'aiList',

  state: {
    sortedInfo:"",
    filteredInfo:"",
    tableData: mock_data.tableData,
    callAIResult:{}
  },
  reducers: {
    saveTableData(state, { payload: { tableData } }) {
      return { ...state, tableData };
    },
    saveCallAIResult(state, { payload: { callAIResult } }) {
      return { ...state, callAIResult };
    },
    saveFilteredInfo(state, { payload: { aiName } }) {
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
      let dataContent = JSON.parse(result.data.data.callAI.content);
      console.log(dataContent);

      yield put({
        type: 'saveCallAIResult',
        payload: {
          callAIResult:dataContent
        }
      });
    }
    ,
    * setTableData ({
                   payload
                 }, { put, call, select }) {
      console.log("payload");
      console.log(payload);
      yield put({
        type: 'saveTableData',
        payload: {
          tableData:payload
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
