/**
 * Created by zhubg on 2017/10/20.
 */

import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import styles from './Tester.css';

function Tester({ dispatch ,callAIResult,signupFlag}) {
  function isEmpty(obj)
  {
    for (var name in obj)
    {
      return false;
    }
    return true;
  };

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
      test: {isEmpty(callAIResult)===true?"没东西":'有东西了'}
      callAIResult: {JSON.stringify(callAIResult)}
      <div>
        <Button onClick={signUp.bind(null, {type:'baiduOcr',url:'http://img2.3lian.com/2014/f6/176/d/89.jpg'})}>callai</Button>
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
