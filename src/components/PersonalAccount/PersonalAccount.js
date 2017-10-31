'use strict';
import React from 'react';
import { connect } from 'dva';
import { Layout, Button, Input, Card, Icon } from 'antd';
import { Row, Col } from 'antd';
import { PersonalHeader } from '../Header/PersonalHeader'
import { HomeHeader } from '../Header/HeaderDark'
import styles from './PersonalAccount.css'
const { Content } = Layout;
import { Link } from 'dva/router';



function PersonalAccount ({ location }) {
  return (
    <Layout className={styles.layout_size}>
    <HomeHeader/>    
      <Layout>

        <Content className={styles.content_style}>
          <div className={styles.padding_style}>
          <Card title="ACCOUNT SETTINGS" bordered={false} className={styles.card_style}>
          <p>
            <span className={styles.icon}>
            <Icon type="user" />&nbsp;&nbsp;address
            </span>
          </p>
            <br/>
          <p className={styles.p_style1}>
            <Input className={styles.input} placeholder="account address" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type={"primary"} className={styles.button_style}><h3>SET</h3></Button>
          </p>
          </Card>

          <br/>
          <br/>

          <Card title="ACCOUNT BALANCE" bordered={false} className={styles.card_style}>
          <p>
            <span className={styles.icon}>
            <Icon type="bank" />&nbsp;&nbsp;balance
            </span>
          </p>
            <br/>
          <p className={styles.p_style1}>
            <Input className={styles.input} placeholder="account address" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Input className={styles.input_balance} placeholder="" disabled={true}/>&nbsp;&nbsp;&nbsp;&nbsp;
            <span className={styles.ether}>ATT</span>
          </p>
          </Card>
          <br/>
          <br/>
          
          <Card title="TRANSFER" bordered={false} className={styles.card_style}>
          <p>
            <span className={styles.icon}>
            <Icon type="global" />&nbsp;&nbsp;transfer
            </span>
          </p>
            <br/>
          <p className={styles.p_style1}>
            <Input className={styles.input} placeholder="to address"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Input className={styles.input} placeholder="amount"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type={"primary"} className={styles.button_style}><h3>SEND</h3></Button>
          </p>
          </Card>
          <br/>
          <br/>

          <Card title="APPROVE" bordered={false} className={styles.card_style}>
          <p>
            <span className={styles.icon}>
            <Icon type="check-circle-o" />&nbsp;&nbsp;approve
            </span>
          </p>
            <br/>
          <p className={styles.p_style1}>
            <Input className={styles.input} placeholder="to address"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Input className={styles.input} placeholder="amount"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type={"primary"} className={styles.button_style}><h3>APPROVE</h3></Button>
          </p>
          </Card>

          </div>
        
      </Content>
        

      </Layout>
    </Layout>
    );

}
// <Content className={styles.content_style}>
// <div>
 
//   <div className={styles.button_center}>
//     <Link to = '/list'>
//     <Button type={"primary"} className={styles.button_style}><h3>EXPLORE AIS</h3></Button>
//     </Link>
//   </div>

// </div>
// </Content>
// <Card className={styles.card_style}>
// <span>address: <Input placeholder="account address"/></span>       
// <div className={styles.button_center}>
//   <Link to = '/list'>
//   <Button type={"primary"} className={styles.button_style}><h3>SET</h3></Button>
//   </Link>
// </div>
// </Card> 
export default connect()(PersonalAccount);
