'use strict';
import styles from '../table.css'

// console.log("data.js baidu: ", baidu);
let imgArray = [<img className={styles.image_style} src={require("../../../assets/images/baidu2.jpg")}/>, <img className={styles.image_style} src={require("../../../assets/images/aliyun2.jpg")}/>,
<img className={styles.image_style} src={require('../../../assets/images/xunfei2.png')}/>,<img className={styles.image_style} src={require('../../../assets/images/hanwuji.png')}/>,
<img className={styles.image_style} src={require('../../../assets/images/tencent.png')}/>, <img className={styles.image_style} src={require('../../../assets/images/huawei.jpg')}/>]
let arr1 = [{
  key: '1',
  params: 'baiduOcr',
  img: imgArray[0],
  name: '通用文字识别',
  author: '百度',
  url: 'https://ai.baidu.com/tech/ocr/general',
  intro: '基于业界领先的深度学习技术，依托全网海量优质数据为您提供多场景、多语种、高精度的整图文字检测和识别服务',
  price: 'FREE',
  developers: '3322',
  followers: '3034',
  uptime: '100%',
  isCollected: false,
},
{
  key: '2',
  params: 'baiduNlp',
  img: imgArray[0],
  name: '百度情感倾向分析',
  author: '百度',
  url: 'https://ai.baidu.com/tech/nlp/sentiment_classify',
  intro: '自动对包含主观信息的文本进行情感倾向性判断，为口碑分析、话题监控、舆情分析等应用提供基础技术支持',
  price: 'FREE',
  developers: '1007',
  followers: '980',
  uptime: '100%',
  isCollected: false,
},

  {
    key: '3',
    params: 'xunFei',
    img: imgArray[2],
    name: 'AIUI',
    author: '讯飞科大',
    url: 'http://aiui.xfyun.cn/default/index',
    intro: '人工智能语义理解能力，例如天气、音乐、闲聊、智能家居等',
    price: 'PAID',
    developers: '395',
    followers: '379',
    uptime: '100%',
    isCollected: false,
},
  {
    key: '4',
    params: 'xiaoI',
    img: <img className={styles.image_style} src={require('../../../assets/images/temp6.jpeg')}/>,
    name: '小i机器人',
    author: '小 i',
    url: 'http://www.xiaoi.com/solution/service/vca.shtml',
    intro: '以人工智能技术为基础，通过网页、即时通讯工具、社交媒体工具等形式，实现一对多7X24小时服务',
    price: 'FREE',
    developers: '383',
    followers: '363',
    uptime: '100%',
    isCollected: false,
  },
  {
    key: '5',
    params: 'aliFace',
    img: imgArray[1],
    name: '人脸分析AI',
    author: '阿里AI云',
    url: 'https://www.faceplusplus.com.cn/beauty/',
    intro: '本 API 支持对检测到的人脸直接进行分析，获得人脸的关键点和各类属性信息',
    price: 'FREE',
    developers: '296',
    followers: '184',
    uptime: '100%',
    isCollected: false,
},
  ]

  let arr2 = [];
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
  const nameArray = ['Random Famous Quotes', 'Faceplusplus face detection', 'Sentimen',  'Hearthstone', 'Weather'];
  const authorArray = ['andruxnet', 'loudelement', 'faceplusplus', 'vivekn', 'omgvamp', 'fyhao'];
  const introArray = ['Get a random quote in JSON format. Current categories are: - famous - movies',
  '100% free service including sentiment analysis, content extraction, and language',
  'Detect the information of the given photo(e.g. face location, age, race, gender etc.)',
  'This tool works by examining individual words and short sequences of words',
  'This API provides up to date Hearthstone data pulled directly from the game.',
  'Display Weather forecast data by latitude and longitude. '];
  const priceArray = ['FREE', 'FREEMIUM', 'PAID'];
  const developersArray = ['318', '259', '672', '189', '209', '780']
  const followersArray = ['201', '109', '100', '230', '300', '310']

  for(let i = 0; i < 20; i++) {
    let object = {
          key: i+6,
          params: 'baiduVoice',
          img: imgArray[getRandomInt(0, imgArray.length)],
          name: nameArray[getRandomInt(0, nameArray.length)],
          author: authorArray[getRandomInt(0, authorArray.length)],
          url: 'https://ai.baidu.com/tech/speech/tts',
          intro: introArray[getRandomInt(0, introArray.length)],
          price: priceArray[getRandomInt(0, priceArray.length)],
          developers: developersArray[getRandomInt(0, developersArray.length)],
          followers: followersArray[getRandomInt(0, followersArray.length)],
          uptime: '100%',
          isCollected: false,
    }
    arr2.push(object);
  }
  // console.log(arr2);
  // console.log(arr);
const size = arr1.length + arr2.length;
let tableData = arr1;
// console.log(size)
// let j = 0;
// for(let i = 0; i < size; i++) {
//   if(i < arr1.length) {
//     tableData[i] = arr1[i];
//   }
//   else {
//     tableData[i] = arr2[j];
//     j++;
//   }
// }
// tableData = arr1;
export default {

tableData,


categories: {
  items: [
    {
      title: 'Tools',
    },
    {
      title: 'Education',
    },
    {
      title: 'Devices',
    },
    {
      title: 'Finance',
    },
    {
      title: 'Advertising',
    },
    {
      title: 'Commerce',
    },
    {
      title: 'Other',
    },
    {
      title: 'Location',
    },
    {
      title: 'Business',
    },
    {
      title: 'Social',
    },
    {
      title: 'Communication',
    },

  ]
}
}
