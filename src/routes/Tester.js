import React from 'react';
import { connect } from 'dva';
import styles from './Tester.css';

function Tester() {
  return (
    <div className={styles.normal}>
      Route Component: Tester
    </div>
  );
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(Tester);
