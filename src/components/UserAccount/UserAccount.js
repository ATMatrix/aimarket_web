'use strict';
import React from 'react';
import { connect } from 'dva';
import { Layout, Button, Input, Card, Icon, message } from 'antd';
import { Row, Col, Spin, Alert, Select } from 'antd';
import { HomeHeader } from '../Header/HeaderDark'
import styles from './UserAccount.css'
const { Content } = Layout;
import { Link } from 'dva/router';
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import att_artifacts from './ATT.json'
import register_artifacts from './Register.json'

window.addEventListener('load', function() {
  
    if (typeof web3 !== 'undefined') {
      window.web3 = new Web3(web3.currentProvider);
      // console.log("endpoint web3: ", web3);
    } else {
      console.log('No web3? You should consider trying MetaMask!')
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
  })

let isInit = false;
const InputGroup = Input.Group;

function UserAccount ({ dispatch, username, account, balance, accountFlag, sendLoading, sendValue }) {


    console.log("UserAccount account: ", account);
    console.log("sendLoading: ", sendLoading);
    console.log("sendValue: ", sendValue);

    const ATT = contract(att_artifacts);
    ATT.setProvider(web3.currentProvider);
    const att = ATT.at('0xde6430355bfabd038e93f6f5aa9ccbf18925fc84');

    //0xcA9f427df31A1F5862968fad1fE98c0a9eE068c4
    //0xbd2d69e3e68e1ab3944a865b3e566ca5c48740da
    //{from: owner, gas: 700000},
    const getBalance = () => {
      if(username == "") {
        message.error("You must login!", 2);
        return;
      }
      // web3.personal.unlockAccount(owner, '123456' , function(err, res){
        // console.log("unlock err: ", err);
        // console.log("unlock res: ", res);
      // });      

      const e = document.getElementById("account").value;
      let user = {};
      user.username = username;
      user.address = e;
      dispatch({
        type: 'userAccount/setAccountDb',
        payload: {
          params: JSON.stringify({user:user})
        }
      });

      if(accountFlag == "accountFlag_true") {
        dispatch({
          type: 'userAccount/saveAccountFlag',
          payload: 'accountFlag_null'
        })
        message.success("Account set success! ", 2);   
      }
      att.balanceOf(e).then(function(res) {
        dispatch({
          type: 'userAccount/setAccount',
          payload: e
        })

        dispatch({
          type: 'userAccount/setBalance',
          payload: res
        })
      });
    }
    const transfer = () => {
      if(username == "") {
        message.error("You must login!", 2);
        return;
      }

      dispatch({
        type: 'userAccount/setSendLoading',
        payload: true
      });
      dispatch({
        type: 'userAccount/setSendValue',
        payload: "SENDING"
      });
      const toAddress = document.getElementById("transferToAddress").value;
      const transferAmount = document.getElementById("transferAmount").value;
      att.transfer(toAddress, transferAmount, {from: account, gas: 700000}).then(function(res) {
        console.log("transfer success:", res);
        dispatch({
          type: 'userAccount/setSendLoading',
          payload: false
        });
        dispatch({
          type: 'userAccount/setSendValue',
          payload: "SEND"
        });
        att.balanceOf(account).then(function(res) {
          dispatch({
            type: 'userAccount/setBalance',
            payload: res
          }).then(res => {
            message.success("transfer success!", 1.5);
            sendButton.removeAttribute("disabled");            
          })
        });
      })
    }

    let approveAIName = "xiaoi";
    const handleChange = (e) => {
      // console.log("approveToName", e);
      approveAIName = e;
    }

    const approve = () => {
      if(username == "") {
        message.error("You must login!", 2);
        return;
      }
      // const toAddress = document.getElementById("approveToName");
      const approveAmount = document.getElementById("approveAmount").value;

      const registerContract = contract(register_artifacts);
      registerContract.setProvider(web3.currentProvider);
      const register = registerContract.at('0xac78e13cfdbaea22f34eb10ec167ee3d0038fa58');

      let toAddress = "";
      register.getBillingAddr(approveAIName).then(function(res) {
        toAddress = res.toString();
        if(toAddress === "" || toAddress === "0x0000000000000000000000000000000000000000") {
          message.error("AI has not been registered!", 2);
          return;
        }
        console.log("toAddress: ", toAddress);

        att.approve(toAddress, approveAmount, {from: account, gas: 4476767}).then(function(res) {
          console.log("approve success:", res);
          att.balanceOf(account).then(function(res) {
            // console.log("-----att balance: ", res.toString());
            dispatch({
              type: 'userAccount/setBalance',
              payload: res
            }).then(res => {
              message.success("approve success!", 1.5);
              sendButton.removeAttribute("disabled");            
            })
          });
        })
      })

    }
    

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
              <Input className={styles.input} placeholder="account address" id="account"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type={"primary"} onClick={getBalance.bind()} className={styles.button_style}>SET</Button>
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
              <Input className={styles.input_disabled} placeholder="" disabled={true} value={account} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Input className={styles.input_balance} placeholder="" disabled={true} value={balance} />&nbsp;&nbsp;&nbsp;&nbsp;
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
              <Input className={styles.input} placeholder="to address" id="transferToAddress" /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Input className={styles.input} placeholder="amount" id="transferAmount" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type={"primary"} onClick={transfer.bind()} className={styles.button_style} id="sendButton" loading={sendLoading}>{sendValue}</Button>
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
              <Select defaultValue="xiaoi" size="large" className={styles.select} id="approveToName" onChange={handleChange}>
                <Option value="xiaoi">xiaoi</Option>
              </Select>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Input className={styles.input} placeholder="amount" id="approveAmount" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button type={"primary"} onClick={approve.bind()} className={styles.button_style} id="approveButtion">APPROVE</Button>
            </p>

            </Card>
            </div>
          
        </Content>
          

        </Layout>
      </Layout>
      );

}

function mapStateToProps(state) {
  const { account } = state.userAccount;
  const { balance } = state.userAccount;
  const { accountFlag } = state.userAccount;
  const { username } = state.login;
  const { sendLoading } = state.userAccount;
  const { sendValue } = state.userAccount;
  return {
    account,
    balance,
    username,
    accountFlag,
    sendLoading,
    sendValue
  };
}
export default {
  // : Form.create()(Register),
  UserAccount: connect(mapStateToProps)(UserAccount)
}