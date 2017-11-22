'use strict';
import React from 'react';
import { connect } from 'dva';
import { Layout, Button } from 'antd';
import { HomeHeader } from '../components/Header/HeaderDark'
import styles from './HomePage.css'
const { Content } = Layout;
import { Link } from 'dva/router';



function HomePage ({ location }) {
  return (
    <Layout className={styles.layout_size}>
      <HomeHeader/>

      <Layout>

        <Content className={styles.content_style}>
          <div>
            <h1>
            AIs Market
            
            </h1>

            <h2>
            First AI Marketplace Powered by Blockchain.
            </h2>
            <br/>
            <div className={styles.button_center}>
              <Link to = '/list'>
              <Button type={"primary"} className={styles.button_style}><h3>EXPLORE AIS</h3></Button>
              </Link>
            </div>

          </div>
        </Content>

      </Layout>
    </Layout>
    );

}


export default connect()(HomePage);
