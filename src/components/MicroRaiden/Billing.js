'use strict';
import React from 'react';
import {connect} from 'dva';
import {
  Layout,
  Button,
  Input,
  InputNumber,
  Card,
  Dropdown,
  Menu,
  Icon,
  message,
  Modal
} from 'antd';
import {
  Table,
  Row,
  Col,
  Spin,
  Alert,
  Select
} from 'antd';
import {HomeHeader} from '../Header/HeaderDark'
const {Content} = Layout;
import {Link} from 'dva/router';
import styles from './Billing.css';

function Billing({dispatch, accounts, balance, channels}) {

  const TOPUP = 'TopUP';
  const CLOSE = 'Close';
  const FORGET = 'Forget';

  const confirm = Modal.confirm;

  const showConfirm = (action, callback) => {
    confirm({
      title: `Do you Want to ${action} the channel?`,
      content: 'Some descriptions',
      onOk() {
        console.log('OK');
        callback(true);
      },
      onCancel() {
        console.log('Cancel');
        callback(false);
      },
    });
  }

  const Actions = ({ item, key, keyPath }) => {
    console.log(key)
    if (key.indexOf(TOPUP) >= 0){
      let index = key.replace(TOPUP,'');
      let channel = channels[index];
      TopUp(channel); 
    } else if (key.indexOf(CLOSE) >= 0) {
      let index = key.replace(CLOSE,'');
      let channel = channels[index];
      Close(channel); 
    } else if (key.indexOf(FORGET) >= 0) {
      let index = key.replace(FORGET,'');
      let channel = channels[index];
      Forget(channel); 
    } else {
      console.log("Unknown key");
      message.error("Unknown key");
    }
  }

  const TopUp = (channel) => {
    const deposit = document
      .getElementById("depositAmount")
      .value;
    if (deposit <= 0)
      return;
    uraiden.topUpChannel(deposit, (err, block) => {
      if (err) {
        console.error(err);
        message.error("An error ocurred trying to deposit to channel", err);
      }
      console.log(block);
      message.info(block);
    });
  }

  const Forget = (channel) => {
    showConfirm(FORGET, (flag) => {
      if(flag){
        // Cookies.delete("RDN-Sender-Address");
        // Cookies.delete("RDN-Open-Block");
        // Cookies.delete("RDN-Sender-Balance");
        // Cookies.delete("RDN-Balance-Signature");
        // Cookies.delete("RDN-Nonexisting-Channel");
        // uraiden.forgetStoredChannel();
      }
    });
  }

  const closeChannel = (closeSign) => {
    uraiden.closeChannel(closeSign, (err, res) => {
      if (err) {
        console.log("An error occurred trying to close the channel", err)
        message.error("An error occurred trying to close the channel", err);
        return;
      }
      console.log("CLOSED", res);
      message.info("CLOSED", res);
    });
  }

  const Close = (channel) => {
    showConfirm(CLOSE, (flag) => {
      // if(flag){
      //   uraiden.signBalance(null, (err, sign) => {
      //     if (err) {
      //       console.log("An error occurred trying to get balance signature", err);
      //       message.error("An error occurred trying to get balance signature", err);
      //       return ;
      //     }
      //     // call cooperative-close URL, and closeChannel with close_signature data
      //     $.ajax({
      //       url: `/api/1/channels/${uraiden.channel.account}/${uraiden.channel.block}`,
      //       method: 'DELETE',
      //       contentType: 'application/json',
      //       dataType: 'json',
      //       data: JSON.stringify({ 'balance': uraiden.channel.balance }),
      //       success: (result) => {
      //         let closeSign = null;
      //         if (result && typeof result === 'object' && result['close_signature']) {
      //           closeSign = result['close_signature'];
      //         } else {
      //           console.warn('Invalid cooperative-close response', result);
      //         }
      //         closeChannel(closeSign);
      //       },
      //       error: (request, msg, error) => {
      //         console.warn('Error calling cooperative-close', request, msg, error);
      //         closeChannel(null);
      //       }
      //     });
      //   });
      // }
    });
  }

  const Deposit = () => {
    const deposit = document
      .getElementById("depositAmount")
      .value;
    if (deposit <= 0) 
      return;
    const account = accounts[0];
    uraiden.openChannel(account, uRaidenParams.receiver, deposit, (err, channel) => {
      if (err) {
        console.error(err);
        message.error("An error ocurred trying to open a channel", err);
      }
      console.log(Cookies)
      Cookies.delete("RDN-Nonexisting-Channel");
      console.log(channel);
      message.info(channel);
    });
  }

  const Mint = () => {
    const account = accounts[0];
    uraiden.buyToken(account, (err, res) => {
      if (err) {
        console.error(err);
        message.error("An error ocurred trying to buy tokens", err);
      }
      console.info(res);
      message.info(res);
    });
  }


  const attribute = {
    bordered: true,
    loading: false,
    pagination: false,
    size: 'default',
    showHeader: true,
    scroll: undefined
  };

  const menu = (record) => (
    <Menu onClick={Actions.bind()}>
      <Menu.Item key={record.key + TOPUP}>
        <a >TopUP</a>
      </Menu.Item>
      <Menu.Item key={record.key + CLOSE}>
        <a >Close</a>
      </Menu.Item>
      <Menu.Item key={record.key + FORGET}>
        <a >Forget</a>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      width: 100
    },
    {
      title: 'Account',
      dataIndex: 'account',
      key: 'account',
      width: 200
    }, {
      title: 'Receiver',
      dataIndex: 'receiver',
      key: 'receiver',
      width: 200
    },{
      title: 'Deposit',
      dataIndex: 'deposit',
      key: 'deposit',
      width: 100  
    },{
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      width: 100
    },{
      title: 'Remaining',
      dataIndex: 'remaining',
      key: 'remaining',
      width: 100
    }, {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      width: 100
    }, {
      title: 'Block',
      dataIndex: 'block',
      key: 'block',
      width: 100
    }, {
      title: 'Action',
      key: 'actions',
      width: 100,
      render:(text, record) => (
        <Dropdown overlay={menu(record)}>
          <a className="ant-dropdown-link" >
            Hover me
            <Icon type="down"/>
          </a>
        </Dropdown>
      )
    }
  ];

 
  return (
    <Layout className={styles.layout_size}>
      <HomeHeader/>
      <Layout>
        <Content className={styles.content_style}>
          <div className={styles.padding_style}>
            <Card title="Transfer Requested" bordered={false} className={styles.card_style}>
              <p>
                <span className={styles.icon}>
                  <Icon type="user"/>&nbsp;&nbsp;address
                </span>
              </p>
              <br/>
              <p className={styles.p_style1}>
                <Input
                  className={styles.input}
                  placeholder="account address"
                  disabled={true}
                  value={accounts}/>&nbsp;
              </p>
              <br/>
              <br/>
              <p>
                <span className={styles.icon}>
                  <Icon type="bank"/>&nbsp;&nbsp;balance
                </span>
              </p>
              <br/>
              <p className={styles.p_style1}>
                <Input
                  className={styles.input_disabled}
                  placeholder=""
                  disabled={true}
                  value={balance}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className={styles.ether}>ATT</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button
                  type={"primary"}
                  onClick={Mint.bind()}
                  className={styles.button_style}
                  id="mintButton">Mint</Button>
              </p>
            </Card>
            <br/>
            <br/>
            <Card title="Channel" bordered={false} className={styles.card_style}>
              <Table {...attribute} columns={columns} dataSource={channels}/>
              <br/>
              <br/>
              <br/>
              <p>
                <span className={styles.icon}>
                  <Icon type="global"/>&nbsp;&nbsp;Deposit
                </span>
              </p>
              <br/>
              <InputNumber
                className={styles.input}
                id="depositAmount"
                min={0}
                max={100000000}
                defaultValue={0}/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                type={"primary"}
                onClick={Deposit.bind()}
                className={styles.button_style}
                id="depositButton">Deposit</Button>
            </Card>
            <br/>
            <br/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

function mapStateToProps(state) {
  const {accounts, balance, channels} = state.bill;
  return {accounts, balance, channels}
}

export default connect(mapStateToProps)(Billing);