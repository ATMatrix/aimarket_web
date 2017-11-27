
'use strict';

export default {
  namespace: 'bill',

  state: {
    accounts: [],
    balance: null,
    channels: [],
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
