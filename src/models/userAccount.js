'use strict';

import { routerRedux } from 'dva/router'
import * as commonService from '../services/common_service';
import {gqlBody_builder} from '../utils/gql/gqlBody_builder';
import {SETACCOUNT_GQL} from '../utils/gql/gql_template/index';
import {GETACCOUNT_GQL} from '../utils/gql/gql_template/index';
import att_artifacts from '../components/UserAccount/ATT.json'
import { default as contract } from 'truffle-contract'

export default {

  namespace: 'userAccount',

  state: {
    account: '',
    balance: '',
    username: '',
    accountFlag: 'accountFlag_null',
    sendLoading: false,
    sendValue: 'SEND',
  },
  reducers: {
    saveAccount(state, { payload: { account } }) {
      return { ...state, account };
    },
    saveBalance(state, { payload: { balance } }) {
      return { ...state, balance };
    },
    saveUsername(state, { payload: { username } }) {
      return { ...state, username };
    },
    saveAccountFlag(state, { payload: { accountFlag } }) {
      return { ...state, accountFlag };
    },
    saveSendLoading(state, { payload: { sendLoading } }) {
      return { ...state, sendLoading };
    },
    saveSendValue(state, { payload: { sendValue } }) {
      return { ...state, sendValue };
    },
  },
  effects: {

    * getAccountBalance ({
        payload
      }, { put, call, select }) {
        if(payload != '') {
            const web3 = getWeb3();

            let loginFlagTemp = yield select(state => state.login);
            const ATT = contract(att_artifacts);
            ATT.setProvider(web3.currentProvider);
            let att = ATT.at('0x067d0f4d04b7be88f47e5c9e70c3785b95ab5e02');
          
            const balance = yield att.balanceOf(payload);
            yield put({
              type: 'setBalance',
              payload: balance
            })
          }
          
    },

    * getAccountDb ({
                         payload
                       }, { put, call, select }) {

        console.log("getAccount payload: ", payload);
        console.log("getAccount gqlBody_builder:", gqlBody_builder(GETACCOUNT_GQL,payload))
        const result = yield call(commonService.service,gqlBody_builder(GETACCOUNT_GQL, payload));
        console.log("getAccountDb result: ", result);
        // const params = JSON.parse(payload)
        // console.log("setAccount: ", JSON.parse(payload.params).user.address);
        console.log("result: ",result);
        if(result.err != null || result.data === null) {
          console.log("result err: ", result.err);
          console.log("getAccountDb request failed");
          
        }
        else if(result.data === null || result.error != null) {
          console.log("Att address has not been set")
        }
        else {
          if (result.data.getAttAddress.type != undefined && result.data.getAttAddress.type !== 'error') {
            console.log("get account success");
            
            yield put({
                type: 'saveAccount',
                payload: {
                  account: result.data.getAttAddress.content,
                }
            });
            yield put({
                type: 'getAccountBalance',
                payload:  result.data.getAttAddress.content
            });
           }
           
          else {
            //request fail
            console.log("get address failed");
            
          //  let loginFlagTemp = yield select(state => state.login);
          //  console.log(loginFlagTemp);
        }
      }          
    },

    * setAccountDb ({
                         payload
                       }, { put, call, select }) {
        // console.log("setAccount payload: ", payload);
        // console.log("setAccount gqlBody_builder:", gqlBody_builder(SETACCOUNT_GQL,payload))
        const result = yield call(commonService.service,gqlBody_builder(SETACCOUNT_GQL,payload));
        // console.log('--------------');  
        // console.log("setAccount result: ", result);
        // const params = JSON.parse(payload)
        // console.log("setAccount: ", JSON.parse(payload.params).user.address);
        const accountAddress = JSON.parse(payload.params).user.address;
        if(result.err != null) {
          console.log("result err: ", result.err);
          console.log("request failed");
          yield put({
            type: 'saveAccountFlag',
            payload: {
              accountFlag:"accountFlag_fail",
            }
          });
        }
        else {
          if (result.data.setAttAddress.type != undefined && result.data.setAttAddress.type !== 'error') {
            console.log("set account success");
            yield put({
              type: 'saveAccountFlag',
              payload: {
                accountFlag:"accountFlag_true",
              }
            });
           }
             else {
          //request fail
          console.log("set address failed");
          yield put({
            type: 'saveAccountFlag',
            payload: {
              accountFlag:"accountFlag_false",
            }
          });
         //  let loginFlagTemp = yield select(state => state.login);
         //  console.log(loginFlagTemp);
        }
      }          
    }
    ,
    * setAccount ({
      payload
    }, { put, call, select }) {
    //request start
      yield put({
      type: 'saveAccount',
      payload: {
        account : payload
      }
      });
    }
,
    * setBalance ({
      payload
    }, { put, call, select }) {
    //request start
      yield put({
      type: 'saveBalance',
      payload: {
        balance : payload
      }
      });
    }
,
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

    * setSendValue ({
      payload,
      }, { put, call, select }) {
        yield put({
          type: 'saveSendValue',
          payload: {
            sendValue : payload
          }
        });
      },

      * setSendLoading ({
        payload,
        }, { put, call, select }) {
          yield put({
            type: 'saveSendLoading',
            payload: {
              sendLoading : payload
            }
          });
        }

  }
} 
