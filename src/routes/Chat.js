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
const { TextArea } = Input;
// var username =  prompt('请输入昵称');
// $('.name').html(username)
// var input = $('.inputMessage');
// // 默认链接到渲染页面的服务器
// var socket = io();
// function scrollToBottom () {
//     $('#chat-area').scrollTop($('#chat-area')[0].scrollHeight);
// };

let socket;

function Chat({ dispatch, messages, username, isInit, windowWidth, windowHeight, isLoggedIn }) {

    // console.log("===windowWidth", windowWidth);
    // console.log("===windowHeight", windowHeight);
    // socket.on('xiaoi message', (msg,user) => {
    //     $('.messages').append('<tr><td>'+user+'说：'+msg+'</td></tr>');
    //     // 滚动条滚动到底部
    //     scrollToBottom();
    // });

  function createMarkup(str) {
    return {__html: str};
  }

  function transfer(str) {
    return <div dangerouslySetInnerHTML={createMarkup(str)} />;
}
  // const room = '/room1';
  // let socket = roomSocket(room);

  // window.addEventListener('load', function() {
  //   init();
  // })
  let socke

  if(username !== "" && !isLoggedIn) {
    dispatch({
      type: 'chat/setIsLoggedIn',
      payload: true
    });
    console.log("log in!");
    init();
  }

  function init() {
    if(!isInit) {
      socket = newSocket();
      socket.on('connect', () => {
        console.log("socket connect !");
        const name = username ||'匿名';
        socket.emit('join',name);
      })

      socket.on('new message', msg => {
        // msg = transfer(msg);
        // console.log("new message:", msg);
        msg = JSON.parse(msg);
        const user = msg.user;
        const input = msg.input;
        const result = msg.result;
        let emotion = <img className={styles.image_style} src={require('../assets/images/happy.jpg')}/>;
        if(result === 0) emotion = <img className={styles.image_style} src={require('../assets/images/angry.jpg')}/>
        else if(result === 1)emotion = <img className={styles.image_style} src={require('../assets/images/mid.jpg')}/>;
        else emotion = <img className={styles.image_style} src={require('../assets/images/happy.jpg')}/>;
        // + '说: ' + input + " (AI情感分析结果：" + img + ")";
        let value = <tr><td><span className={styles.input_style}><span className={styles.name_style}>{user}</span>: {input}</span> [AI情感分析结果：{emotion}]</td></tr>
        console.log("value: ", value);
        dispatch({
          type: 'chat/setMessages',
          payload: value
        });
      });
      socket.on('xiaoi message', function (msg,user) {
        let response = user + "说： " + msg;
        let value = <tr><td className={styles.xiaoi_style}><span className={styles.name_style}>{user}</span>: {msg}</td></tr>
        console.log("response: ", response);
        dispatch({
          type: 'chat/setMessages',
          payload: value
        });
      });

      socket.on('sys', (msg) => {
        // console.log("sys msg: ", msg);
        let value = <tr><td>{msg}</td></tr>

        // msg = transfer('a');
        // console.log("transfer msg: ", msg);
        dispatch({
          type: 'chat/setMessages',
          payload: value
        });
          // $('.messages').append('<tr><td>'+msg+'</td></tr>');
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

    console.log(socket.id)

    const input = document.getElementById("input");
    let data = {};
    data.input = input.value;
    data.username = username;
    console.log("inputValue: ", data);
    socket.emit('clientMsg', data)

    input.value = "";
  }

  const columns = [{
    title: '',
    dataIndex: 'img',
    key: 'img',
    render: (text, record) =>
      <span className={styles.image_layout}><span className={styles.image_style2}>{text}</span></span>
  }]

  const attribute = {
    bordered: false,
    loading: false,
    pagination: false,
    size: 'small',
    showHeader: false,
    scroll: undefined,
  };

  return (
    <Layout styles={{width:windowWidth*0.6,height:windowHeight*0.57}}>
      <Content className={styles.content_style}>
        <div>
        <Content >
          <table style={{ width: 300, height: windowHeight*0.56, background: '#FFFFFF' }} className={styles.table} >
            {messages}
          </table>
        </Content>
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

// <TextArea style={{ width: 300, height: windowHeight*0.56 }} value={messages}>
// </TextArea>
// 
function mapStateToProps(state) {
  const { messages } = state.chat;
  const { username } = state.login;
  const { isInit } = state.chat;
  const { isLoggedIn } = state.chat
  return {
    messages,
    username,
    isInit,
    isLoggedIn
  };
}

export default {
  Chat: connect(mapStateToProps)(Chat)
}
