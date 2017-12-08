
'use strict';

import * as commonService from '../services/common_service';
import {gqlBody_builder} from '../utils/gql/gqlBody_builder';
import {TRANSFER_GQL, CLOSECHANNEL_GQL, GETPRICE_GQL} from '../utils/gql/gql_template/index';

export default {
  namespace: 'bill',

  state: {
    accounts: [],
    balance: null,
    channels: [],
    useMM: false,
    price: '...',
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
      if(channels.length == 0){
        channels = null;
      }
      return { ...state, channels };
    },
  },

  effects: {
    * getInfo({ payload }, { put, call }) {
      const accounts = uraiden.getAccounts();
      console.log(accounts)
      yield put({
        type: 'saveAcounts',
        payload: { accounts },
      })
      const account = accounts[0] || "";
      uraiden.loadStoredChannel(account, uRaidenParams.receiver);  
      var res = yield uraiden.getTokenInfo(account);
      console.log("res:",res);      
      let {balance} = res;
      yield put({
        type: 'saveBalance',
        payload: { balance }
      })    

      if (uraiden.isChannelValid() &&
          uraiden.channel.account === account &&
          uraiden.channel.receiver === uRaidenParams.receiver){
            let info = yield uraiden.getChannelInfo();
            console.log("info",info)
            let channel = uraiden.channel;
            let remaining = 0;
            if (info.deposit > 0 && channel && !isNaN(channel.balance)) {
              remaining = info.deposit - channel.balance;
            }
            Object.assign(channel, {state: info.state, deposit: info.deposit, remaining, key:'0'});            
            let channels = [channel];
            console.log(channels)
            yield put({
              type: 'saveChannels',
              payload: {channels}
            })
      }
      let params = {};
      Object.assign(params,{sender_addr:uraiden.channel.account, ai_id:"XIAO_I"});
      params = JSON.stringify(params);
      yield put({
        type: 'getPrice',
        payload: {params}
      })
    },

    * transfer ({ payload }, { put, call }) {
      console.log(payload);
      const result = yield call(commonService.service, gqlBody_builder(TRANSFER_GQL, payload));
      console.log(result);
    },

    * closeChannel ({ payload }, { put, call }) {
      console.log(payload);
      const result = yield call(commonService.service, gqlBody_builder(CLOSECHANNEL_GQL, payload));
      console.log(result);   
      let close_signature = JSON.parse(result.data.closeChannel.content);
      console.log(close_signature)
      // if(result && result.data && result.data.closeChannel && result.data.closeChannel.code == '600001'){
        let closeSign = close_signature.close_signature;
        console.log(closeSign)
        uraiden.closeChannel(closeSign, (err, res) => {
          if (err) {
            console.log("An error occurred trying to close the channel", err)
          }
          console.info("CLOSED", res);
        });
      // }
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
    }
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
