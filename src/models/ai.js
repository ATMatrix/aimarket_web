/**
 * Created by zhubg on 2017/10/20.
 */

'use strict';

import { routerRedux } from 'dva/router';
import * as commonService from '../services/common_service';
import {gqlBody_builder} from '../utils/gql/gqlBody_builder';
import {CALLAI_GQL, GETAIDETAILS_GQL, GETCHANNEL_GQL, OPENCHANNEL_GQL, TOPUPCHANNEL_GQL, CLOSECHANNEL_GQL, GETPRICE_GQL, GETAILISTINFO_GQL, DEDUCT_GQL, SETCHANNEL_GQL} from '../utils/gql/gql_template/index';
import { isDate } from 'util';


export default {
  namespace: 'ai',

  state: {
    signupFlag: 'signupFlag_null',
    aiName: '',
    aiId: '',
    AIDetails: '',
    requesting: false,
    callAIResult: '',
    callAILog: '',
    callStep: {},
    channel: {},
    openChannelBtn: false,
    callAIBtn: false,
    topUpBtn: false,
    closeChannelBtn: false,
    price: '',
    aiNameEnShort: '',
    raidenRequesting: false,
  },

  reducers: {
    saveSignupFlag(state, {
      payload: { signupFlag },
    }) {
      return {
        ...state,
        signupFlag,
      };
    },

    saveCallAIResult(state, { payload }) {
      return {
        ...state,
        callAIResult: payload,
        requesting: false,
        raidenRequesting: false
      };
    },

    saveAIDetails(state, {
      payload: { details },
    }) {
      return {
        ...state,
        AIDetails: details,
        callAIResult: '',
        callAILog: '',
        requesting: false,
        callStep: {},
      };
    },

    makeRequest(state) {
      return {
        ...state,
        requesting: true,
        callAIResult: '',
        callAILog: '',
        callStep: {},
      };
    },

    makeRequestByRaiden(state) {
      return {
        ...state,
        raidenRequesting: true,
        callAIResult: '',
        callAILog: '',
        callStep: {},
      };
    },

    newStep(state, { payload }) {
      return {
        ...state,
        callStep: Object.assign(state.callStep, payload),
      };
    },

    newLog(state, { payload }) {
      return {
        ...state,
        callAILog: `${state.callAILog}\n\n${payload}`,
      };
    },

    saveChannel(state, {
      payload: { channel },
    }) {
      console.log("saveChannel", channel);
      return {
        ...state,
        channel,
      };
    },

    saveAIId(state ,{ payload: { aiId }}) {
      return { ...state, aiId }
    },

    saveOpenChannelBtn(state ,{ payload: { openChannelBtn }}) {
      return { ...state, openChannelBtn }
    },

    saveCallAIBtn(state ,{ payload: { callAIBtn }}) {
      return { ...state, callAIBtn }
    },

    saveTopUpBtn(state ,{ payload: { topUpBtn }}) {
      return { ...state, topUpBtn }
    },

    saveCloseChannelBtn(state ,{ payload: { closeChannelBtn }}) {
      return { ...state, closeChannelBtn }
    },

    savePrice(state, { payload: { price } }) {
      console.log("savePrice price", price);
      return { ...state, price };
    },

    saveAiNameEnShort (state, { payload: { aiNameEnShort } }) {
      return { ...state, aiNameEnShort };
    },

    saveRaidenRequesting (state, { payload: { raidenRequesting } }) {
      return { ...state, raidenRequesting };
    },

  },

  effects: {
    * callai({ payload }, { put, call, select }) {
      if(payload === 'default') {
        yield put({
          type: 'makeRequest',
        })
      }
      else if(payload === 'raiden') {
        console.log("raidenRequesting payload", payload)
        yield put({
          type: 'makeRequestByRaiden',
        })
      }
      else return;
      yield put({
        type: 'newStep',
        payload: {
          blockchainStatus: 'process',
        },
      })
    },

    * nextStep({ payload }, { put, call, select }) {
      const steps = [
        'BlockChain',
        'FrozenFunds',
        'Worker',
        'DeductFunds',
        'Results',
      ]
      const statuses = [
        'blockchainStatus',
        'frozenFundsStatus',
        'workerStatus',
        'deductFundsStatus',
        'resultStatus',
      ]

      yield put({
        type: 'newLog',
        payload: JSON.stringify(payload, null, 2),
      });
      if (payload.stage === 'Results') {
        yield put({
          type: 'saveCallAIResult',
          payload: JSON.stringify(payload, null, 2),
        })
      }

      const putPayload = {}
      const idx = steps.indexOf(payload.stage)
      const current = statuses[idx]
      if (payload.err) {
        putPayload[current] = 'error'
      } else {
        const next = statuses[idx + 1]
        putPayload[current] = 'finish'
        if (next) {
          putPayload[next] = 'process'
        }
      }

      yield put({
        type: 'newStep',
        payload: putPayload,
      })
    },

    * setAIId({ payload }, { put, call, select }) {
      console.log("---------setAIId start----------");
      const result = yield call(commonService.service, gqlBody_builder(GETAIDETAILS_GQL, payload));
      console.log("result: ", result);
      if (result && result.data && result.data.getAiDetails && result.data.getAiDetails.content) {
        const details = result.data.getAiDetails.content;

        console.log('++++++')
        console.log(details)

        yield put({
          type: 'saveAIDetails',
          payload: {details},
        });
      } else {
        console.log("request fail!");
      }
    },

    * setcallAIResult({ payload }, { put, call, select }) {
      yield put({
        type: 'saveCallAIResult',
        payload: {
          aiName: payload,
        },
      });
    },

    * getChannel({ payload }, { put, call, select }) {
        console.log("getChannel", payload);
        const result = yield call(commonService.service, gqlBody_builder(GETCHANNEL_GQL, payload));
        console.log("getChannel result", result);
        if (result && result.data && result.data.getChannel && result.data.getChannel.content) {
          let data = JSON.parse(result.data.getChannel.content);
          console.log("====data====", data);
          if(data.length <= 0) {
            console.log("no channel found!");
            let channel = {};
            yield put({
              type: 'saveChannel',
              payload: {channel}
            })
            yield put({
              type: 'ai/setButton',
              payload: ''
            })
            return;
          }
          let channel = {deposit: data[0].DEPOSIT, balance: data[0].BALANCE, remaining: data[0].REMAINING, account: data[0].ACCOUNT, receiver: data[0].RECEIVER, block: data[0].BLOCK, state: data[0].STATE};
          yield put({
            type: 'saveChannel',
            payload: {channel}
          })
          yield put({
            type: 'ai/setButton',
            payload: ''
          })
      }
    },

    * openChannel({ payload }, { put, call, select }) {
        // console.log("openChannel", payload);
        const result = yield call(commonService.service, gqlBody_builder(OPENCHANNEL_GQL, payload));
        // console.log("openChannel result", result);
        if(result && result.data && result.data.openChannel && result.data.openChannel.content) {
          // console.log("open channel success!");
          let channel = JSON.parse(payload.params);
          
          yield put({
            type: 'saveChannel',
            payload: {channel}
          })
        }
        else {
          console.log("open channel failed!");
        }
        yield put({
          type: 'ai/setButton',
          payload: ''
        })
    },

    * topUpChannel({ payload }, { put, call, select }) {
        // console.log("topUpChannel", payload);
        const result = yield call(commonService.service, gqlBody_builder(TOPUPCHANNEL_GQL, payload));
        // console.log("topUpChannel result", result);
        if(result && result.data && result.data.topUpChannel && result.data.topUpChannel.content) {
          console.log("topup channel success!");
          let aiId = JSON.parse(payload.params).aiId;

          yield put({
            type: 'ai/getChannel',
            payload: { params : JSON.stringify({account: web3.eth.accounts[0], aiId: +aiId}) },
          })
        }
        else {
          console.log("topup channel failed!");
        }
    },

    * closeChannel({ payload }, { put, call, select }) {
        console.log("closeChannel", payload);
        const result = yield call(commonService.service, gqlBody_builder(CLOSECHANNEL_GQL, payload));

        if(result && result.data && result.data.closeChannel && result.data.closeChannel.content) {

          console.log("close channel result: ", result);   
          let close_signature = JSON.parse(result.data.closeChannel.content);
          console.log("close channel close_signature: ", close_signature)
          // if(result && result.data && result.data.closeChannel && result.data.closeChannel.code == '600001'){
          let closeSign = close_signature.close_signature;
          console.log(closeSign)

          console.log("close channel success!");
          let aiId = JSON.parse(payload.params).aiId;

          yield put({
            type: 'ai/getChannel',
            payload: { params : JSON.stringify({account: web3.eth.accounts[0], aiId: +aiId}) },
          })
        }
        else {
          console.log("close channel failed!");
        }
        yield put({
          type: 'ai/setButton',
          payload: ''
        })
    },

    * setButton({ payload }, { put ,call, select }) {
        let channel = yield select(state => state.ai.channel);
        console.log("set button channel", channel);
        if(channel && Object.keys(channel).length !== 0) {
          console.log("channel found")
          yield put({
            type: 'ai/saveOpenChannelBtn',
            payload: {openChannelBtn: true}
          })
          yield put({
            type: 'saveTopUpBtn',
            payload: {topUpBtn: false}
          })
          yield put({
            type: 'saveCloseChannelBtn',
            payload: {closeChannelBtn: false}
          })
          yield put({
            type: 'saveCallAIBtn',
            payload: {callAIBtn: false}
          })
        }
        else {
          console.log("no channel found")
          yield put({
            type: 'ai/saveOpenChannelBtn',
            payload: {openChannelBtn: false}
          })
          yield put({
            type: 'saveTopUpBtn',
            payload: {topUpBtn: true}
          })
          yield put({
            type: 'saveCloseChannelBtn',
            payload: {closeChannelBtn: true}
          })
          yield put({
            type: 'saveCallAIBtn',
            payload: {callAIBtn: true}
          })
        }
    },

    * getPrice ({ payload }, { put, call }) {
        console.log(payload);
        const result = yield call(commonService.service, gqlBody_builder(GETPRICE_GQL, payload));
        let price = result.data.getPrice.content;
        console.log("getPrice", price);
        yield put({
          type: 'savePrice',
          payload: {price}
        })
        console.log("ai get price result", result); 
    },

    * getAiListInfo ({ payload }, { put, call }) {
        console.log("getAiListInfo payload", payload);
        const result = yield call(commonService.service, gqlBody_builder(GETAILISTINFO_GQL, payload));
        console.log("getAiListInfo result", result);
        if(result && result.data && result.data.getAiListInfo && result.data.getAiListInfo.content) {
          let aiNameEnShort = JSON.parse(result.data.getAiListInfo.content)[0].AI_NAME_EN_SHORT;
          console.log("aiNameEnShort", aiNameEnShort);
          yield put ({
            type: 'saveAiNameEnShort',
            payload: {aiNameEnShort}
          })

          let params = {};
          Object.assign(params,{ai_id: aiNameEnShort, sender_addr: web3.eth.accounts[0]});
          params = JSON.stringify(params);
          yield put({
            type: 'getPrice',
            payload: { params }
          }); 

          return result.data.getAiListInfo.content;
        }
        else {
          console.log("getAiListInfo failed");
        }

    },

    * deduct ({ payload }, { put, call }) {
      console.log("ai deduct payload: ", payload);
      const result = yield call(commonService.service, gqlBody_builder(DEDUCT_GQL, payload));
      console.log("00000",result);
      if(result && result.data && result.data.deduct && result.data.deduct.content) {

        let isDeduct = result.data.deduct.content;
        console.log("isDeduct ", isDeduct);
        if(isDeduct === 'true') {
          let temp = JSON.parse(payload.params);
          console.log("deduct temp", temp)
          let params = {}
          Object.assign(params, {balance: temp.balance + temp.price, remaining: temp.remaining - temp.price, block: temp.block});
          params = JSON.stringify(params);
          const result = yield call(commonService.service, gqlBody_builder(SETCHANNEL_GQL, {params}));
          console.log("set channel result", result);

          
          yield put({
            type: 'getChannel',
            payload: { params : JSON.stringify({account: web3.eth.accounts[0], aiId: +temp.aiId}) },
          })
        }
        else {
          console.log("deduct failed");
        }
      // console.log("xiaoiResult", xiaoiResult);
      }
      else {
        console.log("deduct failed");
      }
    },

  },
}
