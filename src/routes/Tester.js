import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import styles from './Tester.css';

function Tester({ dispatch ,signupFlag}) {
  function signUp(user) {
    dispatch({
      type: 'signup/signup',
      payload: {user:user}
    });
  }

  return (
    <div className={styles.normal}>
      signupFlag: {signupFlag}
      <div>
        <Button onClick={signUp.bind(null, {username:"username1",email:"email",password:"password"})}>test</Button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { signupFlag } = state.signup;
  return {
    loading: state.loading.models.signup,
    signupFlag
  };
}

export default connect(mapStateToProps)(Tester);
