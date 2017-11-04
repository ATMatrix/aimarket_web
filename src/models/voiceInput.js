'use strict';

export default {
  namespace: 'voiceInput',

  state: {
    final_span: '',
    interim_span: ''
  },
  reducers: {
    saveFinalSpan(state, { payload: { final_span } }) {
      return { ...state, final_span };
    },
    saveInterimSpan(state, { payload: { interim_span } }) {
      return { ...state, interim_span };
    },

  },

  effects: {
   * setFinalSpan ({
   payload,
    }, { put, call, select }) {
      console.log('++',payload);
      if(payload.length > 30){
        payload = payload.slice(payload.length-30);
      }
      yield put({
        type: 'saveFinalSpan',
        payload: {
          final_span : payload
        }
      });
    },


    * setInterimSpan ({
      payload,
       }, { put, call, select }) {
         yield put({
           type: 'saveInterimSpan',
           payload: {
            interim_span : payload
           }
         });
       },

 }
}
