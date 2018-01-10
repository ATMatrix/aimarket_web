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
import {remove} from '../../services/users';
import { query } from '../../services/example';

function Billing({
  dispatch,
  accounts,
  balance,
  channels,
  price,
  defaultChannel,
  xiaoiResult,
  windowWidth,
  windowHeight,
  messages
}) {

  const TOPUP = 'TopUP';
  const CLOSE = 'Close';
  const SETTLE = 'Settle';
  const DEFAULT = 'Set Default';
  const confirm = Modal.confirm;


  window.addEventListener('resize', handleResize);

  function handleResize(e) {
    window.removeEventListener('resize', handleResize);

    dispatch({
      type: 'windowSize/saveWindowSize',
      payload: {
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
      }
    });
    console.log("windowWidth: ", windowWidth);
    console.log("windowHeight: ", windowHeight);
  }

  const showConfirm = (title, callback) => {
    confirm({
      title,
      content: 'Some descriptions',
      onOk() {
        console.log('OK');
        callback(true);
      },
      onCancel() {
        console.log('Cancel');
        callback(false);
      }
    });
  }

  const Actions = ({item, key, keyPath}) => {
    console.log(key)
    if (key.indexOf(TOPUP) >= 0) {
      let index = key.replace(TOPUP, '');
      let channel = channels[index];
      TopUp(channel);
    } else if (key.indexOf(CLOSE) >= 0) {
      let index = key.replace(CLOSE, '');
      let channel = channels[index];
      Close(channel);
    } else if (key.indexOf(SETTLE) >= 0) {
      let index = key.replace(SETTLE, '');
      let channel = channels[index];
      Settle(channel);
    } else if (key.indexOf(DEFAULT) >= 0) {
      let index = key.replace(DEFAULT, '');
      let channel = channels[index];
      SetDefault(channel);
    } else {
      console.log("Unknown key");
      message.error("Unknown key");
    }
  }

  const SetDefault = (channel) => {
    defaultChannel = channel;
    uraiden.setChannel(defaultChannel);
    console.log(defaultChannel);
  }

  const TopUp = (channel) => {
    const deposit = document
      .getElementById("depositAmount")
      .value;
    if (deposit <= 0) 
      return;
    
      uraiden.topUpChannel(deposit, (err, deposit) => {
        if (err) {
          console.error(err);
          message.error("An error ocurred trying to deposit to channel", err);
        }
        console.log("deposit",deposit);
        message.info(deposit);
        uraiden.channel.deposit = deposit;
        uraiden.channel.remaining = deposit - uraiden.channel.balance;
        let channels = [uraiden.channel];
        console.log(channels)
        dispatch({
          type: 'bill/saveChannels',
          payload: {channels}
        })
      });

  }

  const Settle = (channel) => {
    let title = `Do you Want to ${SETTLE} the channel?`;
    showConfirm(title, (flag) => {
      if (flag) {
        let params = {};
        Object.assign(params, {
          receiver_addr: channel.receiver,
          block_number: channel.block
        });
        params = JSON.stringify(params);
        dispatch({type: 'bill/settleChannel', payload: {
            params
          }});
      }
    });
  }

  const Close = (channel) => {
    uraiden.setChannel(channel)
    let title = `Do you Want to ${CLOSE} the channel?`;
    showConfirm(title, (flag) => {
      if (flag) {
        uraiden.signBalance(null, (err, sign) => {
          if (err) {
            console.log("An error occurred trying to get balance signature", err);
            message.error("An error occurred trying to get balance signature", err);
            return ;
          }
          let params = {};
          Object.assign(params,{receiver_addr:uraiden.channel.account, block_number:uraiden.channel.block, balance: uraiden.channel.balance, key: channel.key});
          params = JSON.stringify(params);
          dispatch({
            type: 'bill/closeChannel',
            payload: {params}
          })
        });
      }
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
      // Cookies.delete("RDN-Nonexisting-Channel");
      // console.log(Cookies)
      console.log("======Deposit channel: ======", channel);
      let newKey = 0; 
      console.log(">>>>channels: ", channels);
      if(channels !== null && channels !== undefined)
        newKey = channels.length;
      let temp = channels;
      Object.assign(channel, {sender_address: channel.account, open_block: channel.block, key: newKey, state: "open", deposit: deposit, remaining: parseFloat(deposit) - channel.balance});    
      // console.log(">>>>>>>>channel: ", channel);                          
      temp.push(channel);
      console.log("------Deposit channels: ------", temp)
      // channel = JSON.stringify(channel)
      // console.log("~~~~~~channel: ", channel);
      dispatch({
        type: 'bill/addChannel',
        payload: {
          channel
        }
      })
    });
  }

  // const Deposit = () => {
  //   const deposit = document
  //     .getElementById("depositAmount")
  //     .value;
  //   if (deposit <= 0) 
  //     return;
  //   const account = accounts[0];
  //   let params = {};
  //   Object.assign(params, {
  //     receiver_addr: uRaidenParams.receiver,
  //     deposit
  //   });
  //   params = JSON.stringify(params);
  //   dispatch({type: 'bill/openChannel', payload: {
  //       params
  //     }});
  // }

  const CallAI = () => {
    let title = `this request will cost ${price} ATN`;
    showConfirm(title, (flag) => {
      if(flag){
        console.log("CallAI start uraiden: ", uraiden);
        uraiden.incrementBalanceAndSign(price, (err, sign) => {//消费token并签名
          console.log("CallAI err: ", err);
          if (err && err.message && err.message.includes('Insuficient funds')) {
            console.error("CallAI err", err);
            const current = +(err.message.match(/current ?= ?([\d.,]+)/i)[1]);
            const required = +(err.message.match(/required ?= ?([\d.,]+)/i)[1]) - current;
            console.log("current",current);
            console.log("required",required);
            console.log("remaining",current - uraiden.channel.balance);
            return;
          } else if (err && err.message && err.message.includes('User denied message signature')) {
            console.error(err);
            return;
          } else if (err) {
            console.error(err);
            return;
          }
          console.log("SIGNED!", sign);
          // Cookies.set("RDN-Sender-Address", uraiden.channel.account);
          // Cookies.set("RDN-Open-Block", uraiden.channel.block);
          // Cookies.set("RDN-Sender-Balance", uraiden.channel.balance);
          // Cookies.set("RDN-Balance-Signature", sign);
          // Cookies.delete("RDN-Nonexisting-Channel");
          let params = {};
          let question = document.getElementById("question").value;
          console.log("====question====", question);
          Object.assign(params,{ai_id:"xiaoi", input:question, sender_addr:uraiden.channel.account, opening_block:uraiden.channel.block, balance_signature: sign, balance: uraiden.channel.balance, price: parseFloat(price)});
          params = JSON.stringify(params);
          console.log("-----params: ", params);
          dispatch({
            type: 'bill/transfer',
            payload: {params}
          })

          console.log("~~~getinfo~~~");
          dispatch({
            type: 'bill/getInfo'
          })
        }); 
      }
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
      <Menu.Item key={record.key + DEFAULT}>
        <a >Set Default</a>
      </Menu.Item>
      <Menu.Item key={record.key + TOPUP}>
        <a >TopUP</a>
      </Menu.Item>
      <Menu.Item key={record.key + CLOSE}>
        <a >Close</a>
      </Menu.Item>
      <Menu.Item key={record.key + SETTLE}>
        <a >Settle</a>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
      width: 100
    }, {
      title: 'Account',
      dataIndex: 'account',
      key: 'account',
      width: 200
    }, {
      title: 'Receiver',
      dataIndex: 'receiver',
      key: 'receiver',
      width: 200
    }, {
      title: 'Deposit',
      dataIndex: 'deposit',
      key: 'deposit',
      width: 100
    }, {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      width: 100
    }, {
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
      render: (text, record) => (
        <Dropdown overlay={menu(record)}>
          <a className="ant-dropdown-link">
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
                <span className={styles.ether}>ATN</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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

              <div>
              <Content className={styles.table_style}>
                <table style={{ width: windowWidth * 0.25, height: windowHeight*0.30, background: '#FFFFFF' }} className={styles.table} >
                  {messages}
                </table>
              
                <div className={styles.callai_style}>
                  <Input id="input" className={styles.callai_input} >
                  
                  </Input>
                  
                    <Button type={"primary"} id="sendButton" onClick={CallAI.bind()} >Send</Button>
                </div>
              </Content>
            </div>

             
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
  const {accounts, balance, channels, price, defaultChannel, xiaoiResult, messages} = state.bill;
  const {windowWidth, windowHeight} = state.windowSize;
  return {accounts, balance, channels, price, defaultChannel, xiaoiResult, windowWidth, windowHeight, messages}
}

export default connect(mapStateToProps)(Billing);