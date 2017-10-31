import React from 'react';
import { connect } from 'dva';
import { Layout, Button, Input, Card, Icon } from 'antd';
import { Row, Col } from 'antd';
import { PersonalHeader } from '../Header/PersonalHeader'
import styles from './PersonalAccount.css'
const { Content } = Layout;
import { Link } from 'dva/router';



function PersonalAccount ({ location }) {
  return (
    <Layout className={styles.layout_size}>
      <PersonalHeader/>
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
                <div >
                <Link to = '/list'>
                <Button type={"primary"} className={styles.button_style}><h3>SET</h3></Button>
                </Link>
                </div>
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
