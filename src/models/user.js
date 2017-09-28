/**
 * Created by zhubg on 2017/9/28.
 */

'use strict';

import * as usersService from '../services/users';

export default {
  namespace: 'user',
  state: {
    username: null,
    email: null
  },
  reducers: {
    save(state, { payload: { username: username, email } }) {
      return { ...state, list, total, page };
    }
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10)
        }
      });
    },
    *remove({ payload: id }, { call, put }) {
      yield call(usersService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(usersService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *add({ payload: values }, { call, put }) {
      const { data, headers } = yield call(usersService.add, { user });
      yield put({ type: 'save',
        payload: {
        user:user
      }});
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query || { page :1 } });
        }
      });
    },
  },
};
