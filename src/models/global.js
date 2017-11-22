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
        if (pathname === '/list') {
          dispatch({ type: 'load' });
        }
      });
    }
  }
}
