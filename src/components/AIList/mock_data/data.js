import styles from '../table.css'

export default {
  tableData: [{
    key: '1',
    params: 'baidu',
    img: <img className={styles.image_style} src={require('../../../assets/images/baidu2.jpg')}/>,
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
      params: 'ali',
      img: <img className={styles.image_style} src={require('../../../assets/images/aliyun2.jpg')}/>,
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
    {
      key: '3',
      params: 'xunfei',
      img: <img className={styles.image_style} src={require('../../../assets/images/xunfei2.png')}/>,
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
      params: 'xiaoi',
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
      img: <img className={styles.image_style} src={require('../../../assets/images/baidu2.jpg')}/>,
      name: '百度语音合成',
      author: '百度',
      url: 'https://ai.baidu.com/tech/speech/tts',
      intro: '基于业界领先的深度神经网络技术，提供流畅自然的语音合成服务\n' +
      '让您的应用开口说话',
      price: 'FREE',
      developers: '1007',
      followers: '980',
      uptime: '100%',
      isCollected: false,
  },
    // {
  //   key: '6',
  //   img: <img className={styles.image_style} src={require('../../../assets/images/temp6.jpeg')}/>,
  //   name: 'EyeSpy',
  //   author: 'bestApi',
  //   intro: 'An API for interesting facts about numbers. Provides trivia, math, date, and year...',
  //   price: 'FREEMIUM',
  //   developers: '572',
  //   followers: '504',
  //   uptime: '100%',
  //   isCollected: false,
  // }
    ],


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
