/**
 * Created by zhubg on 2017/10/20.
 */

import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import styles from './Tester.css';

function Tester({ dispatch ,callAIResult,aiName}) {
  function signUp(name) {
    dispatch({
      type: 'ai/setAIName',
      payload: name
    });
  }

  return (
    <div className={styles.normal}>
      aiName: {aiName}
      <div>
        <Button onClick={signUp.bind(null,"fuck")}>callai</Button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { aiName } = state.ai;
  return {
    loading: state.loading.models.ai,
    aiName
  };
}

export default connect(mapStateToProps)(Tester);
