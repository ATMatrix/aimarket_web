import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import styles from './Tester.css';

function Tester({ dispatch}) {
  function signUp(user) {
    dispatch({
      type: 'signup/signup',
      payload: {user:user}
    });
  }

  return (
    <div className={styles.normal}>
      Route Component: Tester
      <div>
        <Button onClick={signUp.bind(null, {username:"username1",email:"email",password:"password"})}>test</Button>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  return { };
}

export default connect(mapStateToProps)(Tester);
