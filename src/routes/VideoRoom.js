/**
 * Created by zhubg on 2017/11/4.
 */

'use strict';

import React from 'react';
import {connect} from 'dva';
import {message, Layout, Button} from 'antd';
import {HomeHeader} from '../components/Header/HeaderDark';
import {CensorModal} from '../components/CensorModal';
const {Content} = Layout;
import {Link} from 'dva/router';
import VoiceInput from './VoiceInput';
import { Chat } from './Chat'


function VideoRoom({dispatch, windowWidth, windowHeight, censorResult, censorDisplay}) {

    message.warning(censorResult);

  var width = 120;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

  var streaming = false;

  var video = null;
  // var canvas = null;
  // var photo = null;
  var startbutton = null;
  var clearbutton = null;

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

  window.onload = function () {
    video = document.getElementById('video');
    clearbutton = document.getElementById('clearbutton');
    startbutton = document.getElementById('startbutton');

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);

        // video.setAttribute('width', width);
        // video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);
    //
    startbutton.addEventListener('click', function(ev){
      setInterval(takepicture, 5000);
      ev.preventDefault();
    }, false);
    //
    // clearbutton.addEventListener('click', function(ev){
    //   clearphoto();
    //   ev.preventDefault();
    // }, false);

    getMedia();
  };

  function getMedia() {

    navigator.mediaDevices.getUserMedia({video: true, audio: false})
      .then(function (stream) {
        video.srcObject = stream;
        video.play();
      })
      .catch(function (err) {
        console.log("An error occured! " + err);
      });
  }

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  function takepicture() {
    const canvas = document.getElementById('canvas');
    const photo = document.getElementById('photo');
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/png');

      if (data) {
        const image = data.replace('data:image/png;base64,', '')
        dispatch({
          type: 'censor/censorImage',
          payload: {params:JSON.stringify({
            type: 'censor',
            image,
          })}
        })
      } else {
        console.log('takepicture error')
      }
    } else {
      // clearphoto();
    }
  }

  function censor() {
    const image = takepicture()
    if (image) {
      dispatch({
        type: 'censor/censorImage',
        payload: {params:JSON.stringify({
          image,
        })}
      })
    } else {
      console.log('takepicture error')
    }
  }

  const warning = (msg) => {
    message.warning(msg);
  }

  return (
    <Layout style={[styles.layout_size,{width:windowWidth,height:windowHeight}]}>
      <HomeHeader/>

      <Layout>


        <Content style={styles.content_style}>
          <div style={styles.top}>
          </div>
          <div style={styles.center}>
            <div style={[styles.center_left,{flex: 8,height:windowHeight*0.6}]}>
              <video  id="video" style={{objectFit:'fill',height:windowHeight*0.6}}>
                Video stream not available.
              </video>
            </div>
            <div style={[styles.center_right,{width:windowWidth*0.3}]}></div>
          </div>
          <div >
            <div style={{marginLeft: 200}}>
              <VoiceInput windowWidth={windowWidth} windowHeight={windowHeight}/>
              <span id="startbutton" style={{fontSize:20}}><div style={{marginLeft: 400}}>同声字幕</div></span>
            </div>

            <canvas id="canvas" style={{display: 'none'}}/>
          </div>

        </Content>

      </Layout>
    </Layout>
  );

}

function mapStateToProps(state) {
  const censorResult = state.censor.result;
  const censorDisplay = state.censor.display;
  const {windowWidth, windowHeight} = state.windowSize;

  return {
    loading: state.loading.models.windowSize,
    windowWidth,
    windowHeight,
    censorResult,
    censorDisplay,
  };
}

export default connect(mapStateToProps)(VideoRoom);


const styles = {
  content_style: {
    background: '#FFFFFF',
    display: 'flex',
    flexDirection: 'column'
    // alignItems: 'center',
    // justifyContent: 'center'
  }
  ,
  layout_size: {
    margin: 0
  }
  ,
  header: {
    margin: 0
  }
  ,
  top: {
    // flex: 0.5,
    // alignItems: 'center',
    // justifyContent: 'center',
    // display: 'flex',
    fontStyle: 'Open Sans',
    borderWidth: 2,
    borderColor: 'black'
  }
  ,
  center: {
    flex: 19,
    // backgroundColor: 'silver',
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    display: 'flex',
    margin: 200,
    marginTop: 50,
    marginBottom: 0
  }
  ,
  center_left: {
    flex: 6,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'black',
    // objectFit:'fill',
    alignItems: 'center',
    justifyContent: 'center'
  }
  ,
  center_right: {
    flex: 4,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
    display: 'flex'
  }
};
