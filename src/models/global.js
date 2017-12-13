'use strict';

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
        console.log(">>>>><<<<<<<history", history);
        if (pathname === '/list') {
          dispatch({ type: 'load' });
        }
        if (pathname.substr(0, 8) === '/details') {
          console.log('load details')
          dispatch({
            type: 'ai/setAIId',
            payload: {
              id: pathname.substr(9)
            }
          });
        }
      });
    }
  }
}
