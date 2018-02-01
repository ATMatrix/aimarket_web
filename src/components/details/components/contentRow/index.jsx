import React from 'react'
import { Row, Col, Input, Button, Select, Icon, Tabs, Table, InputNumber, message, Modal } from 'antd'
import { connect } from 'dva';

const { Group, TextArea } = Input
const { Option } = Select
const { TabPane } = Tabs

import AISteps from '../stepBar'
import style from './styles.css'


const confirm = Modal.confirm;

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

class Form extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const thisFields = this.props.fields.map((field, idx) => {
      return (
        <div
          className={style.field}
          key={idx}
        >
          <div style={{align: 'right'}}>
            <span className={style.name}>{field.name}</span>
            <span className={style.type}>{field.type}</span>
          </div>
          <div>
            <Input
              className={'CallAIInputData'}
              name={field.name}
              suffix={
                field.required
                  ? <span style={{color: "red"}}>*</span>
                  : ""
              }
              type="text"
              placeholder={field.place_holder}
            />
            <p>{field.describe}</p>
          </div>
        </div>
      )
    })

    return (
      <div>
        <div className={style.form_title}>
          <p style={{fontSize:'15px', fontWeight: '600'}}>{this.props.title.toUpperCase()}</p>
        </div>
        <div>
          {thisFields}
        </div>
      </div>
    )
  }
}

const attribute = {
  bordered: true,
  loading: false,
  pagination: false,
  size: 'default',
  showHeader: true,
  scroll: undefined
};

const columns = [
  {
    title: 'Deposit',
    dataIndex: 'deposit',
    key: 'deposit',
    width: 50
  }, {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
    width: 50
  }, {
    title: 'Remaining',
    dataIndex: 'remaining',
    key: 'remaining',
    width: 50
  }
]

class Request extends React.Component {

  constructor(props) {
    // console.log(web3.eth.accounts[0]);
    // console.log("fucker", uraiden.getChannelInfo("0x47d1ba802dca4c88871dc594249905c42b7d21b7", "0x9765E2D8467334198b402e4D4551Dd49e63327Ec", 5537346));
    super(props)
    this.handleCallAI = this.handleCallAI.bind(this)
    this.openChannel = this.openChannel.bind(this)
    this.topUpChannel = this.topUpChannel.bind(this)
    this.closeChannel = this.closeChannel.bind(this)
    this.raidenCallAI = this.raidenCallAI.bind(this)
    // this.handleCallAIRaiden = this.handleCallAIRaiden.bind(this)

    this.aiId = this.props.aiId;
    console.log("Request aiId", this.aiId);

    console.log("this.props.channel:", Object.keys(this.props.channel).length);

    // this.props.dispatch({
    //   type: 'ai/getChannel',
    //   payload: { params : JSON.stringify({account: web3.eth.accounts[0], aiId: +this.aiId}) },
    // })

    console.log("this.props.channel", this.props);

  }

  openChannel() {
    // console.log("this.aiId", this.aiId);
    // console.log("0000 uraiden", uraiden);
    // console.log("uraiden getchannel info", uraiden.getChannelInfo("0x47d1ba802dca4c88871dc594249905c42b7d21b7", "0x9765E2D8467334198b402e4D4551Dd49e63327Ec", 5537346));
    console.log("open channel start");
    if(!window.web3 || window.web3 === undefined) {
      message.error("Please install metamask extension first and unlock test account");
      return;
    }
    const deposit = document
    .getElementById("depositAmount")
    .value;
    if (deposit <= 0) {
      message.error("Please set deposit number, must > 0");
      return;
    }
      
    // console.log(web3.eth.accounts);

    const account = web3.eth.accounts[0];
    // web3.personal.unlockAccount(web3.eth.accounts[7], '123456');
    uraiden.openChannel(account, uRaidenParams.receiver, deposit, (err, channel) => {
      if (err) {
        console.error(err);
        message.error("An error ocurred trying to open a channel", err);
        return;
      }
      console.log("======Deposit channel: ======", channel);

      //在代码里设置好收款地址
      const receiver = uRaidenParams.receiver; 

      // console.log("this.aiId: ", this.aiId);
      Object.assign(channel, {aiId: this.aiId, account: channel.account, receiver: receiver, deposit: deposit, balance: channel.balance, remaining: parseFloat(deposit) - channel.balance, block: channel.block, state: "open"});    
      // console.log(">>>>>>>>channel: ", channel);

      this.props.dispatch({
        type: 'ai/openChannel',
        payload: {
          params: JSON.stringify(channel)
        }
      })
    });
  }

  topUpChannel() {

    if(!window.web3 || window.web3 === undefined) {
      message.error("Please install metamask extension first and unlock test account");
      return;
    }
    const topUpAmount = document.getElementById("topUpAmount").value;
    if(topUpAmount <= 0)return;

    console.log(this.props.channel);
    uraiden.setChannel(this.props.channel);
    uraiden.topUpChannel(topUpAmount, (err, deposit) => {
      if (err) {
        console.error(err);
        message.error("An error ocurred trying to deposit to channel", err);
      }
      console.log("deposit",deposit);
      // message.info(deposit);
      let channel = _.cloneDeep(this.props.channel);
      console.log("topupchannel channel", channel);
      channel.deposit = deposit;
      channel.remaining = channel.deposit - channel.balance;

      Object.assign(channel, {deposit: channel.deposit, remaining: channel.remaining, aiId: this.props.aiId, account: channel.account})

      this.props.dispatch({
        type: 'ai/topUpChannel',
        payload: {params: JSON.stringify(channel)}
      })
    })
  }

  closeChannel() {

    console.log(window.web3);
    if(!window.web3 || window.web3 === undefined) {
      message.error("Please install metamask extension first and unlock test account");
      return;
    }
    uraiden.setChannel(this.props.channel);
    let title = `Do you Want to close the channel?`;
    showConfirm(title, (flag) => {
      if (flag) {
        uraiden.signBalance(null, (err, sign) => {
          if (err) {
            console.log("An error occurred trying to get balance signature", err);
            message.error("An error occurred trying to get balance signature", err);
            return ;
          }
          let params = {};
          Object.assign(params,{ block: uraiden.channel.block, balance: uraiden.channel.balance, account:uraiden.channel.account, aiId: this.props.aiId});
          params = JSON.stringify(params);
          this.props.dispatch({
            type: 'ai/closeChannel',
            payload: {params}
          })
        });
      }
    });

  }

  raidenCallAI() {

    if(!window.web3 || window.web3 === undefined) {
      message.error("Please install metamask extension first and unlock test account");
      return;
    }
    console.log("raidenCallAI this.props", this.props);

    console.log("raidenCallAI price", this.props);
    let price = this.props.price;
    let title;
    let freeFlag = false;
    if(price && price !== undefined && price !== '0') {
      title = `this request will cost ${price} ATN`;
    }
    else if(price && price !== undefined && price === '0') {
      title = `this AI is free to use`;
      freeFlag = true;
    }
    else {
      message.error("can't get AI's price, please check the server!");
      return;
    }
    // console.log(title);
    if(!freeFlag) {
      showConfirm(title, (flag) => {
        if(flag){
          console.log("CallAI start uraiden: ", uraiden);
          // console.log("defaultChannel",defaultChannel);
          uraiden.channel = this.props.channel; 
          if(uraiden.channel.remaining < +price) {
            message.error("Tokens not enough!")
            return;
          }       
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
            let params = {};
            // let question = document.getElementById("question").value;
            // console.log("====question====", question);
            console.log("uraiden balance", uraiden.channel.balance);

            let tempParms = {input: {},};
            const formFields = document.querySelectorAll('.CallAIInputData input')
            for (let i = 0; i < formFields.length; i++) {
              const field = formFields[i]
              tempParms.input[field.name] = field.value
            }

            Object.assign(params,{input: tempParms.input, ai_id: this.props.aiNameEnShort, account: uraiden.channel.account, receiver: uRaidenParams.receiver,  block: uraiden.channel.block, balance_signature: sign, balance: uraiden.channel.balance, remaining: uraiden.channel.remaining, price: parseFloat(price), aiId: this.props.aiId});
            params = JSON.stringify(params);
            console.log("-----params: ", params);
            this.props.dispatch({
              type: 'ai/deduct',
              payload: {params}
            })
  

          }); 
        }
      })
    }
    else {
      showConfirm(title, (flag) => {
        if(flag) {
          let sign = "free";
          let params = {};
          let tempParms = {input: {},};
            const formFields = document.querySelectorAll('.CallAIInputData input')
            for (let i = 0; i < formFields.length; i++) {
              const field = formFields[i]
              tempParms.input[field.name] = field.value
            }
          Object.assign(params,{input: tempParms.input, ai_id: this.props.aiNameEnShort,  balance_signature: sign, aiId: this.props.aiId});
          params = JSON.stringify(params);
          console.log("-----params: ", params);
          this.props.dispatch({
            type: 'ai/deduct',
            payload: {params}
          })
        }
        
      })
    }
    

  } 

  handleCallAI() {
    console.log("this.props.aiNameEnShort", this.props.aiNameEnShort);

    this.props.dispatch({
      type: 'ai/callai',
      payload: 'default',
    })

    const params = {
      aiID: this.props.aiNameEnShort,
      args: {},
    }
    const formFields = document.querySelectorAll('.CallAIInputData input')
    for (let i = 0; i < formFields.length; i++) {
      const field = formFields[i]
      params.args[field.name] = field.value
    }

    const socket = newSocket()
    socket.on('message', (msg) => {
      this.props.dispatch({
        type: 'ai/nextStep',
        payload: msg,
      })
    })
    socket.emit('callAI', params)
  }

  // handleCallAIRaiden(sign) {
  //   this.props.dispatch({
  //     type: 'ai/callai',
  //     payload: 'raiden',
  //   })

  //   let params = {input: {},};
  //   const formFields = document.querySelectorAll('.CallAIInputData input')
  //   for (let i = 0; i < formFields.length; i++) {
  //     const field = formFields[i]
  //     params.input[field.name] = field.value
  //   }
  //   Object.assign(params,{ai_id: this.props.aiNameEnShort, input: params.input, sender_addr:uraiden.channel.account, opening_block:uraiden.channel.block, balance_signature: sign, balance: uraiden.channel.balance, price: parseFloat(this.props.price)});
  //   params = JSON.stringify(params);
  //   console.log("-----params: ", params);
  //   this.props.dispatch({
  //     type: 'ai/transfer',
  //     payload: {params}
  //   })

  //   // const params = {
  //   //   aiID: this.props.aiNameEnShort,
  //   //   args: {},
  //   // }
  //   // const formFields = document.querySelectorAll('.CallAIInputData input')
  //   // for (let i = 0; i < formFields.length; i++) {
  //   //   const field = formFields[i]
  //   //   params.args[field.name] = field.value
  //   // }

  //   // const socket = newSocket()
  //   // socket.on('message', (msg) => {
  //   //   this.props.dispatch({
  //   //     type: 'ai/nextStep',
  //   //     payload: msg,
  //   //   })
  //   // })
  //   // socket.emit('callAI', params)
  // }

  render() {

    const data = this.props.data;
    // console.log("this.props.raidenRequesting", this.props.raidenRequesting);
    //table's data need an array
    // console.log("========this.props====", this.props.openChannelBtn);
    // console.log("contentRow channel", this.props.channel)

    let channel = [];
    channel.push(this.props.channel);
    // console.log("------channel------", channel);

    const forms = data.forms.map((form, idx) => {
      return (
        <Form
          key={idx}
          title={form.title}
          fields={form.fields}
        />
      )
    })

    // console.log("forms:", forms);
    return (
      <Col span={12} className={style.request} type="flex">
        <div>
          <div>
            <p style={{fontSize:'20px', fontWeight: '600'}}>{data.title}</p>
            <p>{data.describe}</p>
          </div>
          {forms}
        </div>
        <Button
          className={style.request_buttom}
          onClick={this.handleCallAI}
          loading={data.requesting}
        >Test EndPoint</Button>
        <br/><br/><br/><br/><br/><br/>
        <div className={style.raiden}> 
          <p>雷电通道:</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <br/>
          <Table {...attribute} className={style.table} columns={columns} dataSource={channel}/>
          <br/><br/><br/>
        </div>
        <br/><br/><br/>
        <div className={style.raiden_operate}>
          <InputNumber
              style={{width: 200, height: 34}}
              id="depositAmount"
              min={0}
              max={100000000}
              defaultValue={10}/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            type={"primary"}
            onClick={this.openChannel}
            className={style.button}
            id="openButton"
            disabled={this.props.openChannelBtn}>Open Channel</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            type={"primary"}
            className={style.button}
            onClick={this.raidenCallAI}
            disabled={this.props.callAIBtn}
            loading={this.props.raidenRequesting}
            id="callAIButton">Call AI</Button>
        </div>
        <br/><br/>
        <div className={style.raiden_operate}>
          <InputNumber
            style={{width: 200, height: 34}}
            id="topUpAmount"
            min={0}
            max={100000000}
            defaultValue={1}/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            type={"primary"}
            onClick={this.topUpChannel}
            className={style.button}
            disabled={this.props.topUpBtn}
            id="topUpButton">TopUp</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            type={"primary"}
            onClick={this.closeChannel}
            className={style.button}
            disabled={this.props.closeChannelBtn}
            id="closeButton">Close Channel</Button>
        </div>
      </Col>
      
    )
  }
}

class Response extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const result = this.props.data.result
    const log = this.props.data.log
    return (
      <Col span={12} className={style.response} type="flex">
          <div className="card-container">
						<Tabs type="card" style={{ whiteSpace: 'pre-wrap' }}>
              <TabPane
                tab="Result"
                key="1"
                style={{ whiteSpace: 'pre-wrap' }}
              >{result}</TabPane>
							<TabPane
                tab="Log"
                key="2"
                style={{ whiteSpace: 'pre-wrap' }}
              >{log}</TabPane>
						</Tabs>
					</div>
      </Col>
    )
  }
}

export default class ContentRow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Row style={{height: '100%'}}>
        <AISteps data={this.props.step} />
        <Row style={{height: '100%'}}>
          <Request
            dispatch={this.props.dispatch}
            data={this.props.request}
            channel={this.props.channel}
            aiId={this.props.aiId}
            openChannelBtn={this.props.openChannelBtn}
            callAIBtn={this.props.callAIBtn}
            topUpBtn={this.props.topUpBtn}
            closeChannelBtn={this.props.closeChannelBtn}
            price={this.props.price}
            aiNameEnShort={this.props.aiNameEnShort}
            raidenRequesting={this.props.raidenRequesting}
          />
          <Response data={this.props.response} />
        </Row>
      </Row>
    )
  }
}
