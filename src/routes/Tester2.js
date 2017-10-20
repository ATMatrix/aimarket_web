/**
 * Created by zhubg on 2017/10/20.
 */

import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import styles from './Tester.css';

function Tester({ dispatch ,callAIResult,signupFlag}) {
  function signUp(params) {
    dispatch({
      type: 'ai/callai',
      payload: {params:JSON.stringify(params)}
    });
  }

  return (
    <div className={styles.normal}>
      signupFlag: {signupFlag}
      <br/>
      callAIResult: {JSON.stringify(callAIResult)}
      <div>
        <Button onClick={signUp.bind(null, {type:'baiduOrc',url:'http://img2.3lian.com/2014/f6/176/d/89.jpg'})}>callai</Button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { callAIResult,signupFlag } = state.ai;
  return {
    loading: state.loading.models.ai,
    callAIResult,
    signupFlag
  };
}

export default connect(mapStateToProps)(Tester);
