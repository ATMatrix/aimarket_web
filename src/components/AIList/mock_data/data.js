import styles from '../table.css'

const baiduParams = JSON.stringify({
  creator: '百度',
  logoSrc: 'https://zh.wikipedia.org/wiki/%E7%99%BE%E5%BA%A6#/media/File:Baidu.svg',
  title: '百度',
  host: 'https://ai.baidu.com/tech/ocr/general',
  tag: 'Medical',
  createAt: 'Created: April 2013',
  describe: `基于业界领先的深度学习技术，依托全网海量优质数据为您提供多场景、多语种、高精度的整图文字检测和识别服务.支持多场景下的文字检测识别，多项ICDAR指标世界第一
支持中、英、葡、法、德、意、西、俄、日、中英混合识别，整体识别准确率高达90%以上`,
});

const huaweiParams = JSON.stringify({
  creator: '华为',
  logoSrc: 'https://zh.wikipedia.org/wiki/%E7%99%BE%E5%BA%A6#/media/File:Baidu.svg',
  title: '华为',
  host: 'https://ai.baidu.com/tech/ocr/general',
  tag: 'Medical',
  createAt: 'Created: April 2013',
  describe: `基于业界领先的深度学习技术，依托全网海量优质数据为您提供多场景、多语种、高精度的整图文字检测和识别服务.支持多场景下的文字检测识别，多项ICDAR指标世界第一
支持中、英、葡、法、德、意、西、俄、日、中英混合识别，整体识别准确率高达90%以上`,
});

export default {
  tableData: [{
    key: '1',
    params: baiduParams,
    img: <img className={styles.image_style} src={require('../../../assets/images/baidu.png')}/>,
    name: '通用文字识别',
    author: '百度',
    intro: '基于业界领先的深度学习技术，依托全网海量优质数据为您提供多场景、多语种、高精度的整图文字检测和识别服务',
    price: 'FREE',
    developers: '3322',
    followers: '3034',
    uptime: '100%',
    isCollected: false,
  }, {
    key: '2',
    params: huaweiParams,
    img: <img className={styles.image_style} src={require('../../../assets/images/temp2.jpeg')}/>,
    name: 'Indian colleges and universities',
    author: 'orthosie',
    intro: 'An API for interesting facts about numbers. Provides trivia, math, date, and year...',
    price: 'FREE',
    developers: '383',
    followers: '363',
    uptime: '100%',
    isCollected: false,
  }, {
    key: '3',
    img: <img className={styles.image_style} src={require('../../../assets/images/temp3.jpeg')}/>,
    name: 'They Said So _ Say it with style',
    author: 'HealThruWords',
    intro: 'An API for interesting facts about numbers. Provides trivia, math, date, and year...',
    price: 'FREEMIUM',
    developers: '296',
    followers: '184',
    uptime: '100%',
    isCollected: false,
  }, {
    key: '4',
    img: <img className={styles.image_style} src={require('../../../assets/images/temp4.png')}/>,
    name: 'Universal Inspirational Quotes',
    author: 'qvoca',
    intro: 'An API for interesting facts about numbers. Provides trivia, math, date, and year...',
    price: 'PAID',
    developers: '395',
    followers: '379',
    uptime: '100%',
    isCollected: false,
  }, {
    key: '5',
    img: <img className={styles.image_style} src={require('../../../assets/images/temp5.png')}/>,
    name: 'Bestquotes',
    author: 'eyespy',
    intro: 'An API for interesting facts about numbers. Provides trivia, math, date, and year...',
    price: 'FREE',
    developers: '1007',
    followers: '980',
    uptime: '100%',
    isCollected: false,
  }, {
    key: '6',
    img: <img className={styles.image_style} src={require('../../../assets/images/temp6.jpeg')}/>,
    name: 'EyeSpy',
    author: 'bestApi',
    intro: 'An API for interesting facts about numbers. Provides trivia, math, date, and year...',
    price: 'FREEMIUM',
    developers: '572',
    followers: '504',
    uptime: '100%',
    isCollected: false,
  }],


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
