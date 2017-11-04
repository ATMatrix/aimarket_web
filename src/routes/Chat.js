/**
 * Created by zhubg on 2017/10/20.
 */

import React from 'react';
import { Button, Layout, Input, Card } from 'antd';
import { connect } from 'dva';
import { HomeHeader } from '../components/Header/HeaderLight'
import styles from './Chat.css'
const http = require('http');
import io from 'socket.io-client'



const {
  Sider,
  Content,
  Header
} = Layout

// var username =  prompt('请输入昵称');
// $('.name').html(username)
// var input = $('.inputMessage');
// // 默认链接到渲染页面的服务器
// var socket = io();
// function scrollToBottom () {
//     $('#chat-area').scrollTop($('#chat-area')[0].scrollHeight);
// };



function Chat({ dispatch, messages, username, isInit, windowWidth, windowHeight }) {

    console.log("===windowWidth", windowWidth);
    console.log("===windowHeight", windowHeight);
    // socket.on('xiaoi message', (msg,user) => {
    //     $('.messages').append('<p>'+user+'说：'+msg+'</p>');
    //     // 滚动条滚动到底部
    //     scrollToBottom();
    // });

  function createMarkup(str) {
    return {__html: str};
  }

  function transfer(str) {  
    return <div dangerouslySetInnerHTML={createMarkup(str)} />;  
}
  let socket = io('http://localhost:4000',  {transports: ['websocket']});

  const init = () => {
    if(!isInit) {
      socket = io('http://localhost:4000',  {transports: ['websocket']})
      console.log("socket: ", socket);
      socket.on('connect', () => {
        console.log("socket connect !");
        const name = username ||'匿名';
        socket.emit('join',name);
      })
      
      socket.on('sys', (msg) => {
        console.log("sys msg: ", msg);
        // msg = transfer('a');
        // console.log("transfer msg: ", msg);
        dispatch({
          type: 'chat/setMessages',
          payload: msg
        });
          // $('.messages').append('<p>'+msg+'</p>');
          // // 滚动条滚动到底部
          // scrollToBottom();
      });
      dispatch({
        type: 'chat/setIsInit',
        payload: true
      });
    }
  }


  const send = () => {
    const input = document.getElementById("input");
    const inputValue = input.value;
    console.log("inputValue: ", inputValue);
    socket.emit('message', inputValue)
    socket.on('new message', msg => {
      msg = transfer(msg);
      console.log(msg);
      dispatch({
        type: 'chat/setMessages',
        payload: msg
      });
        // $('.messages').append('<p>'+user+'说：'+msg+'</p>');
        // 滚动条滚动到底部
        // scrollToBottom();
    });
    socket.on('xiaoi message', function (msg,user) {
      let response = user + "说： " + msg;
      console.log("response: ", response);
      dispatch({
        type: 'chat/setMessages',
        payload: response
      });
    });
    input.value = "";
  }
  let jj = 1;
  // let temp = ["2","3"]
  return (
    <Layout styles={{width:windowWidth*0.6,height:windowHeight*0.6}}>
      <Content className={styles.content_style}>
        <div>
        <span id="init" onClick={init} disabled={true}><div className={styles.lucency}>test</div></span>
        <Card style={{ width: 300, height: windowHeight*0.6 }} >

          {messages.map((ii) => (
            <div key={jj++} >
              <div>{ii}</div>
            </div>
        ))}

        </Card>
          <p className={styles.p_style1}>
        <Input id="input" >
          
        </Input>
          <Button type={"primary"} id="sendButton" onClick={send} >Send</Button>
        </p>

      </div>
      </Content>
    </Layout>
  )
}

function mapStateToProps(state) {
  const { messages } = state.chat;
  const { username } = state.login;
  const { isInit } = state.chat;
  return {
    messages,
    username,
    isInit
  };
}

export default {
  Chat: connect(mapStateToProps)(Chat)
}
