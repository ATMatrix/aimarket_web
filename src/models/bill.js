
'use strict';

import * as commonService from '../services/common_service';
import {gqlBody_builder} from '../utils/gql/gqlBody_builder';
import {TRANSFER_GQL, CLOSECHANNEL_GQL, GETPRICE_GQL, OPENCHANNEL_GQL, GETCHANNELS_GQL, TOPUPCHANNEL_GQL} from '../utils/gql/gql_template/index';
import { SETTLECHANNEL_GQL } from '../utils/gql/gql_template/bill_gql';


export default {
  namespace: 'bill',

  state: {
    accounts: ["0x47d1ba802dca4c88871dc594249905c42b7d21b7"],
    balance: null,
    channels: [],
    defaultChannel: {},
    price: '1',
  },

  reducers: {
    saveAcounts(state, { payload: { accounts },
    }) {
      if(accounts.length == 0){
        channels = null;
      }
      return { ...state, accounts };
    },

    saveBalance(state, { payload: { balance } }) {
      return { ...state, balance };
    },

    savePrice(state, { payload: { price } }) {
      return { ...state, price };
    },

    saveChannels(state, { payload: { channels },
    }) {
      console.log("!!!!!!!saveChannels: ", channels);
      if(channels.length == 0){
        channels = null;
      }
      return { ...state, channels };
    },
  },

  effects: {

    * addChannel({ payload }, { put, call, select}) {
      let temp = yield select(state => state.bill.channels);   
      console.log("channles: ", temp)   
      console.log("payload: ", payload);
      temp.push(payload.channel);
      console.log("~~~~~~~~channles: ", temp);
      yield put({
        type: 'saveChannels',
        payload: { channels: temp }
      }) 
    },

    * getInfo({ payload }, { put, call, select}) {
      const accounts = yield select(state => state.bill.accounts);      
      console.log(accounts)
      const account = accounts[0] || "";
      var res = yield uraiden.getTokenInfo(account);
      console.log("res:",res);      
      let {balance} = res;
      yield put({
        type: 'saveBalance',
        payload: { balance }
      })    
      
      let params = {};
      Object.assign(params,{sender_addr:account});
      params = JSON.stringify(params);
      yield put({
        type: 'getChannels',
        payload:{ params }
      });
      params = {};
      Object.assign(params,{sender_addr:account, ai_id:"XIAO_I"});
      params = JSON.stringify(params);
      yield put({
        type: 'getPrice',
        payload: { params }
      });
    },

    * transfer ({ payload }, { put, call }) {
      console.log("model bill transfer payload: ", payload);
      const result = yield call(commonService.service, gqlBody_builder(TRANSFER_GQL, payload));
      console.log(result);
      // console.log(result.data.transfer.content);
    },

    * getPrice ({ payload }, { put, call }) {
      console.log(payload);
      const result = yield call(commonService.service, gqlBody_builder(GETPRICE_GQL, payload));
      let price = result.data.getPrice.content;
      yield put({
        type: 'savePrice',
        payload: {price}
      })
      console.log(result); 
    },

    * getChannels({ payload }, { put, call, select }) {
      console.log(payload);
      const result = yield call(commonService.service, gqlBody_builder(GETCHANNELS_GQL, payload));
      let channels = JSON.parse(result.data.getChannels.content); 
      console.log((channels));
      let accounts = yield select(state => state.bill.accounts);
      channels.map((c, i=0) => {
        Object.assign(c, {
          key: i++,
          account: c.sender_address,
          receiver: uRaidenParams.receiver,
          remaining: uraiden.bal2num(c.deposit) - c.balance,
          block: c.open_block,
          deposit: uraiden.bal2num(c.deposit),
          balance: c.balance
         })
      });      
      yield put({
        type: 'saveChannels',
        payload: {channels}
      })
    },

    * openChannel({ payload }, { put, call, select }) {
      console.log(payload);
      const result = yield call(commonService.service, gqlBody_builder(OPENCHANNEL_GQL, payload));
      let openChannel = JSON.parse(result.data.openChannel.content);
      console.log(openChannel)
      if(openChannel){
        let params = {};
        let accounts = yield select(state => state.bill.accounts);        
        Object.assign(params,{sender_addr:accounts[0]});
        params = JSON.stringify(params);
        yield put({
          type: 'getChannels',
          payload:{ params }
        });
      }
    },

    * closeChannel ({ payload }, { put, call, select }) {
      let temp = yield select(state => state.bill.channels);   
      // console.log("close channel temp: ", temp);
      let key = JSON.parse(payload.params).key;
      // console.log("key", key);
      // delete payload['key'];
      console.log("close channel payload: ", payload);
      const result = yield call(commonService.service, gqlBody_builder(CLOSECHANNEL_GQL, payload));
      console.log("close channel result: ", result);   
      let close_signature = JSON.parse(result.data.closeChannel.content);
      console.log("close channel close_signature: ", close_signature)
      // if(result && result.data && result.data.closeChannel && result.data.closeChannel.code == '600001'){
        let closeSign = close_signature.close_signature;
        console.log(closeSign)
        console.info("CLOSED", JSON.parse(payload.params).block_number);
        // uraiden.closeChannel(closeSign, (err, res) => {
          // if (err) {
            // console.log("An error occurred trying to close the channel", err)
          // }
          // console.info("CLOSED", res);
        // });
        let newChannels = [];
        for(let i = 0; i < temp.length; i++) {
          if(temp[i].key !== key)newChannels.push(temp[i]);
        }
        // console.log("~~~~~~~~~newChannels:", newChannels)
        yield put({
          type: 'saveChannels',
          payload:{ channels: newChannels }
        });
      },

    * topUpChannel ({ payload }, { put, call, select }) {
      console.log(payload);
      const result = yield call(commonService.service, gqlBody_builder(TOPUPCHANNEL_GQL, payload));
      let topUpChannel = JSON.parse(result.data.topUpChannel.content);
      console.log(topUpChannel)
      if(topUpChannel){
        let params = {};
        let accounts = yield select(state => state.bill.accounts);        
        Object.assign(params,{sender_addr:accounts[0]});
        params = JSON.stringify(params);
        yield put({
          type: 'getChannels',
          payload:{ params }
        });
      }
    },

    * settleChannel ({ payload }, { put, call, select }) {
      console.log(payload);
      const result = yield call(commonService.service, gqlBody_builder(SETTLECHANNEL_GQL, payload));
      let settleChannel = JSON.parse(result.data.settleChannel.content);
      console.log(settleChannel)
      if(settleChannel){
        let params = {};
        let accounts = yield select(state => state.bill.accounts);        
        Object.assign(params,{sender_addr:accounts[0]});
        params = JSON.stringify(params);
        yield put({
          type: 'getChannels',
          payload:{ params }
        });
      }
    },
  },

  subscriptions: {
    setup: ({ history, dispatch }) => history.listen(({ pathname }) => {
      if (pathname === '/bill') {
        let cnt = 20;  
        const pollingId = setInterval(() => {
          if (cnt < 0 ||  uraiden) {
            clearInterval(pollingId);
            dispatch({
              type: 'getInfo'
            })
          } else {
            --cnt;
          }
        }, 300);
      }
    })
  }
}
