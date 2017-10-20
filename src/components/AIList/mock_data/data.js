import styles from '../table.css'

const baiduProfiles = {
  creator: '百度',
  logoSrc: 'https://zh.wikipedia.org/wiki/%E7%99%BE%E5%BA%A6#/media/File:Baidu.svg',
  title: '百度',
  host: 'https://ai.baidu.com/tech/ocr/general',
  tag: 'Medical',
  createAt: 'Created: April 2015',
  describe: `基于业界领先的深度学习技术，依托全网海量优质数据为您提供多场景、多语种、高精度的整图文字检测和识别服务.支持多场景下的文字检测识别，多项ICDAR指标世界第一
支持中、英、葡、法、德、意、西、俄、日、中英混合识别，整体识别准确率高达90%以上`,
};

const xiaoiParams = JSON.stringify({
  creator: 'xiaoi',
  logoSrc: 'http://nlp.xiaoi.com/ask.do',
  title: 'xiaoi',
  host: 'http://nlp.xiaoi.com/ask.do',
  tag: 'Medical',
  createAt: 'Created: April 2013',
  describe: `智能客服机器人以人工智能技术为基础，通过网页、即时通讯工具、社交媒体工具等形式，实现一对多7X24小时服务，大幅降低服务成本，增强用户体验，提升服务质量和企业创新形象`,
});

const baiduFields = [
  {
    name: 'url',
    type: 'STRING',
    describe: '图片地址',
    required: true,
    place_holder: 'http://imgs4.iaweg.com/pic/HTTP2ltZzIuM2xpYW4uY29tLzIwMTQvZjIvMTY5L2QvMTA0LmpwZwloglog.jpg',
  },

]

const baiduApis = {
  items: [
    {
      method: 'get',
      title: '文字识别',
    },

  ]
}

const baiduForms = [
  {
    title: '请求参数',
    fields: baiduFields,
  },

]


const baiduRequest = {
  title: '文字识别',
  describe: '提供多种场景下精准的图像文字识别技术服务\n' +
  '让您的应用看图识字，提升输入效率，优化用户体验',
  type: 'baiduOcr',
  forms: baiduForms,
}

const baiduResponse = {
  method: 'put',
  url: 'www.google.com',
  requestExample: `// These code snippets use an open-source library. http://unirest.io/php
  $response = Unirest.Request::get("https://23andme-23andme.p.mashape.com/names/a42e94634e3f7683/",
    array(
        "X-Mashape-Key" => "<required>",
        "Authorization" => "<required>",
        "Accept" => "text/plain"
      )
  );`,
    statusCode: 200,
    contentType: 'TEXT',
    endPointTitle: 'publish get by link',
    responseBody: 'No sample was provided with this model.'
}

const baiduParams = {
  apis: baiduApis,
  request: baiduRequest,
  profile: baiduProfiles,
  response: baiduResponse
}

export default {
  tableData: [{
    key: '1',
    params: baiduParams,
    img: <img className={styles.image_style} src={require('../../../assets/images/baidu.png')}/>,
    name: '通用文字识别',
    author: 'baidu',
    intro: '基于业界领先的深度学习技术，依托全网海量优质数据为您提供多场景、多语种、高精度的整图文字检测和识别服务',
    price: 'FREE',
    developers: '3322',
    followers: '3034',
    uptime: '100%',
    isCollected: false,
  }, {
    key: '2',
    params: xiaoiParams,
    img: <img className={styles.image_style} src={require('../../../assets/images/xiaoi.jpg')}/>,
    name: '小i机器人',
    author: 'xiaoi',
    intro: '全球领先的智能机器人平台和架构提供者',
    price: 'FREE',
    developers: '383',
    followers: '363',
    uptime: '100%',
    isCollected: false,
  },
    // {
  //   key: '3',
  //   img: <img className={styles.image_style} src={require('../../../assets/images/temp3.jpeg')}/>,
  //   name: 'They Said So _ Say it with style',
  //   author: 'HealThruWords',
  //   intro: 'An API for interesting facts about numbers. Provides trivia, math, date, and year...',
  //   price: 'FREEMIUM',
  //   developers: '296',
  //   followers: '184',
  //   uptime: '100%',
  //   isCollected: false,
  // }, {
  //   key: '4',
  //   img: <img className={styles.image_style} src={require('../../../assets/images/temp4.png')}/>,
  //   name: 'Universal Inspirational Quotes',
  //   author: 'qvoca',
  //   intro: 'An API for interesting facts about numbers. Provides trivia, math, date, and year...',
  //   price: 'PAID',
  //   developers: '395',
  //   followers: '379',
  //   uptime: '100%',
  //   isCollected: false,
  // }, {
  //   key: '5',
  //   img: <img className={styles.image_style} src={require('../../../assets/images/temp5.png')}/>,
  //   name: 'Bestquotes',
  //   author: 'eyespy',
  //   intro: 'An API for interesting facts about numbers. Provides trivia, math, date, and year...',
  //   price: 'FREE',
  //   developers: '1007',
  //   followers: '980',
  //   uptime: '100%',
  //   isCollected: false,
  // }, {
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
