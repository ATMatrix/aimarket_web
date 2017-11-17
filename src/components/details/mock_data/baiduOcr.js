import styles from '../../AIList/table.css'

const profile = {
  creator: '百度',
  logoSrc: <img classname={styles.image_style} src={require('../../../assets/images/baidu2.jpg')}/>,
  title: '通用文字识别',
  host: 'https://ai.baidu.com/tech/ocr/general',
  tag: 'Medical',
  createAt: 'Created: April 2015',
  describe: '基于业界领先的深度学习技术，依托全网海量优质数据为您提供多场景、多语种、高精度的整图文字检测和识别服务.支持多场景下的文字检测识别，多项ICDAR指标世界第一, 支持中、英、葡、法、德、意、西、俄、日、中英混合识别，整体识别准确率高达90%以上',
};

const fields = [
  {
    name: 'url',
    type: 'STRING',
    describe: '图片地址',
    required: true,
    place_holder: 'http://imgs4.iaweg.com/pic/HTTP2ltZzIuM2xpYW4uY29tLzIwMTQvZjIvMTY5L2QvMTA0LmpwZwloglog.jpg',
  },
]

const apis = {
  items: [
    {
      method: 'get',
      title: '文字识别',
    },
  ],
}

const forms = [
  {
    title: '请求参数',
    fields,
  },
]

const request = {
  title: '文字识别',
  describe: '提供多种场景下精准的图像文字识别技术服务, 让您的应用看图识字，提升输入效率，优化用户体验',
  type: 'baiduOcr',
  forms,
}

const response = ''

export default {
  apis,
  request,
  response,
  profile,
}
