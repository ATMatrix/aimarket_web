/**
 * Created by zhubg on 2017/11/4.
 */

'use strict';

export default {
  namespace: 'windowSize',

  state: {
    windowWidth: (typeof window !== 'undefined') ? window.innerWidth : undefined,
    windowHeight: (typeof window !== 'undefined') ? window.innerHeight : undefined,
    stream:{}
  },

  reducers: {
    saveWindowSize(state, {
      payload: { windowWidth, windowHeight },
    }) {
      return {
        ...state,
        windowWidth,
        windowHeight
      };
    }
    ,
    saveStream(state, {
      payload: { stream},
    }) {
      return {
        ...state,
        stream
      };
    }
  }
  
}
