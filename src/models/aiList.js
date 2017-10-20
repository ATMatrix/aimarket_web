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
    callAIResult:{},
    value: "ALL",
    isCollected: "false"
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
      const tableDataBack = mock_data.tableData;
      let value = payload.toString().toUpperCase();
      if(value === "ALL") {
        yield put({
          type: 'saveTableData',
          payload: {
            tableData:tableDataBack
          }
        });
      }
      // const val = `^${value}$`;
      // const reg = new RegExp(val, 'gi')

      else {
        let tempData = [];
        for (let record in tableDataBack) {
          if(tableDataBack[record].price === value) {
            tempData.push(tableDataBack[record])
          }
        }
        // let tempData = tableData.map((record) => {
        //   // console.log("record")
        //   // console.log(record)
        //   const match = record.price.match(reg)
        //   console.log("match")
        //   console.log(match)
        //   if (!match) return null;
        //   return {
        //     ...record,
        //   };
        // }).filter(record => !!record);

        yield put({
          type: 'saveTableData',
          payload: {
            tableData:tempData
          }
        });
      }

    }
    ,
    * setIsCollected ({
                      payload
                    }, { put, call, select }) {
      const tableDataBack = mock_data.tableData;
      let isCollected = payload;

      if(isCollected === false) {
        const dataTemp = tableData.slice()
        setState({
          tableData: dataTemp.map((record) => {
            if(record.key === opt.key) {
              record.isCollected = true
              record.iconStyle = 'icon_style2'
              record.iconType = 'star'
            }
            return record
          })
        })
      }
      else {
        const dataTemp = tableData.slice()
        setState({
          tableData: dataTemp.map((record) => {
            if(record.key === opt.key) {
              record.isCollected = false
              record.iconStyle = 'icon_style1'
              record.iconType = 'star_o'
            }
            return record
          })
        })
      }
      if(value === "ALL") {
        yield put({
          type: 'saveTableData',
          payload: {
            tableData:tableDataBack
          }
        });
      }
      else {
        let tempData = [];
        for (let record in tableDataBack) {
          if(tableDataBack[record].price === value) {
            tempData.push(tableDataBack[record])
          }
        }
        yield put({
          type: 'saveTableData',
          payload: {
            tableData:tempData
          }
        });
      }

    }
    ,
    * setcallAIResult ({
                         payload
                       }, { put, call, select }) {
      yield put({
        type: 'saveCallAIResult',
        payload: {
          aiName:payload
        }
      });
    }

  }

}
