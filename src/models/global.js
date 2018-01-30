'use strict';
import { message, Modal } from 'antd'

export default {
  namespace: 'global',

  state:{

  },

  reducers: {

  },

  effects: {
    *load({
      payload
    },{ put, call, select }) {
        yield put ({
          type: 'aiList/getAiListFromDb',
          payload: {
            params: ""
          }
        });
    }
  },

  subscriptions: {
    setup({ history, dispatch }) {
      // 监听 history 变化，当进入 `/` 时触发 `load` action
      return history.listen(({ pathname }) => {
        if (pathname === '/list') {
          dispatch({ type: 'load' });
        }
        const regex = /details\/(\d+)/;
        if (pathname.match(regex) !== null) {
          console.log("==========regex: ", pathname.match(regex));          
          console.log('load details')
          dispatch({
            type: 'ai/setAIId',
            payload: {
              id: pathname.match(regex)[1]
            }
          });
          let aiId = pathname.match(regex)[1];
          dispatch({
            type: 'ai/saveAIId',
            payload: {aiId}
          })
          dispatch({
            type: 'ai/getAiListInfo',
            payload: { params: JSON.stringify({aiId: +aiId}) }
          })

          // if(!window.web3 || window.web3 === undefined) {
          //   message.error("Please install metamask extension first and unlock test account");
          //   return;
          // }
          dispatch({
            type: 'ai/getChannel',
            payload: { params : JSON.stringify({account: "0x47d1ba802dca4c88871dc594249905c42b7d21b7", aiId: +aiId}) },
          })

        }
      });
    }
  }
}
