'use strict';
import React from 'react';
import { connect } from 'dva';
import { Layout, Button, Input, Card, Icon, message } from 'antd';
import { Row, Col } from 'antd';
import { HomeHeader } from '../Header/HeaderDark'
import styles from './UserAccount.css'
const { Content } = Layout;
import { Link } from 'dva/router';
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import att_artifacts from './ATT.json'

window.addEventListener('load', function() {
  
    if (typeof web3 !== 'undefined') {
      window.web3 = new Web3(web3.currentProvider);
      // console.log("endpoint web3: ", web3);
    } else {
      console.log('No web3? You should consider trying MetaMask!')
      window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
  })

function UserAccount ({ dispatch, accountAddress, accountBalance }) {

    console.log("accountBalance: ", accountBalance.toString());
    const ATT = contract(att_artifacts);
    ATT.setProvider(web3.currentProvider);
    let att = ATT.at('0xe1cfa4728a454a22dd4033321b0a33a80caa3158');

    //0xcA9f427df31A1F5862968fad1fE98c0a9eE068c4
    //0xbd2d69e3e68e1ab3944a865b3e566ca5c48740da
    //{from: owner, gas: 700000},
    const getBalance = () => {
      const owner = '0xcA9f427df31A1F5862968fad1fE98c0a9eE068c4';
      // web3.personal.unlockAccount(owner, '123456' , function(err, res){
        // console.log("unlock err: ", err);
        // console.log("unlock res: ", res);
      // });      
      const e = document.getElementById("account").value;
      att.balanceOf(e).then(function(res) {
        dispatch({
          type: 'userAccount/setAccountAddress',
          payload: e
        });
        dispatch({
          type: 'userAccount/setAccountBalance',
          payload: res
        })
      });
    }

    const transfer = () => {
      const sendButton = document.getElementById("sendButton");
      sendButton.setAttribute("disabled", true);
      const toAddress = document.getElementById("transferToAddress").value;
      const transferAmount = document.getElementById("transferAmount").value;

      att.transfer(toAddress, transferAmount, {from: accountAddress, gas: 7000000}).then(function(res) {
        console.log("transfer success:", res);

        att.balanceOf(accountAddress).then(function(res) {
          dispatch({
            type: 'userAccount/setAccountBalance',
            payload: res
          }).then(res => {
            message.success("transfer success!", 1.5);
            sendButton.removeAttribute("disabled");            
          })
        });
      })
    }

    const approve = () => {
      const toAddress = document.getElementById("approveToAddress").value;
      const approveAmount = document.getElementById("approveAmount").value;
      att.approve(toAddress, approveAmount, {from: accountAddress, gas: 7000000}).then(function(res) {
        console.log("approve success:", res);
        att.balanceOf(accountAddress).then(function(res) {
          // console.log("-----att balance: ", res.toString());
          dispatch({
            type: 'userAccount/setAccountBalance',
            payload: res
          }).then(res => {
            message.success("approve success!", 1.5);
            sendButton.removeAttribute("disabled");            
          })
        });
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
              <Button type={"primary"} onClick={getBalance.bind()} className={styles.button_style}><h3>SET</h3></Button>
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
              <Input className={styles.input_disabled} placeholder="" disabled={true} value={accountAddress} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Input className={styles.input_balance} placeholder="" disabled={true} value={accountBalance} />&nbsp;&nbsp;&nbsp;&nbsp;
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
              <Button type={"primary"} onClick={transfer.bind()} className={styles.button_style} id="sendButton" ><h3>SEND</h3></Button>
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
              <Input className={styles.input} placeholder="to address" id="approveToAddress" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Input className={styles.input} placeholder="amount" id="approveAmount" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button type={"primary"} onClick={approve.bind()} className={styles.button_style} id="approveButtion"><h3>APPROVE</h3></Button>
            </p>
            </Card>

            </div>
          
        </Content>
          

        </Layout>
      </Layout>
      );

}

function mapStateToProps(state) {
  const { accountAddress } = state.userAccount;
  const { accountBalance } = state.userAccount;
  return {
    accountAddress,
    accountBalance
  };
}
export default {
  // : Form.create()(Register),
  UserAccount: connect(mapStateToProps)(UserAccount)
}