/**
 * Created by zhubg on 2017/11/4.
 */

'use strict';

import React from 'react';
import {connect} from 'dva';
import {Layout, Button} from 'antd';
import {HomeHeader} from '../components/Header/HeaderDark';
import {CensorModal} from '../components/CensorModal';
const {Content} = Layout;
import {Link} from 'dva/router';


function VideoRoom({dispatch, windowWidth, windowHeight, stream, censorResult, censorDisplay}) {

  var width = 320;    // We will scale the photo width to this
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

    function isEmpty(obj)
    {
      for (var name in obj)
      {
        return false;
      }
      return true;
    };

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

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);

    // clearbutton.addEventListener('click', function(ev){
    //   clearphoto();
    //   ev.preventDefault();
    // }, false);

    getMedia();
  };

    setInterval(censor, 3)

  async function getMedia() {

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
      return data;
    } else {
      clearphoto();
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

  return (
    <Layout style={[styles.layout_size,{width:windowWidth,height:windowHeight}]}>
      <HomeHeader/>

      <Layout>

        <canvas  id="canvas" style={{display: 'none'}} />
        <CensorModal result={censorResult} display={censorDisplay} dispatch={dispatch}/>

        <Content style={styles.content_style}>
          <div style={styles.top}>
            <div style={{height:windowHeight*0.1,fontSize: 50}} >直播场景</div>
          </div>
          <div style={styles.center}>
            <div style={[styles.center_left,{flex: 8,height:windowHeight*0.6}]}>
              <video  id="video" style={{objectFit:'fill',width:windowHeight*0.6*4/3,height:windowHeight*0.6}}>
                Video stream not available.
              </video>
            </div>
            <div style={[styles.center_right,{width:windowWidth*0.3}]}>中文字幕</div>
          </div>
          <div style={styles.top}>
            <div style={{height:windowHeight*0.1,fontSize: 30}}>
              直播场景
            </div>

            <canvas id="canvas" style={{display:'none'}} />

          </div>
        </Content>

      </Layout>
    </Layout>
  );

}

function mapStateToProps(state) {
  const censorResult = state.censor.result;
  const censorDisplay = state.censor.display;
  const {windowWidth, windowHeight, stream} = state.windowSize;

  return {
    loading: state.loading.models.windowSize,
    windowWidth,
    windowHeight,
    censorResult,
    censorDisplay,
    stream
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    fontStyle: 'Open Sans',
    borderWidth: 2,
    borderColor: 'black'
  }
  ,
  center: {
    flex: 19,
    backgroundColor: 'silver',
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    display: 'flex',
    margin: 200,
    marginTop: 0,
    marginBottom: 0
  }
  ,
  center_left: {
    flex: 6,
    backgroundColor: 'red',
    borderWidth: 2,
    borderColor: 'black',
    objectFit:'fill',
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
