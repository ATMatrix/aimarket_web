import styles from '../../AIList/table.css'

const profile = {
  creator: '阿里巴巴',
  logoSrc: <img classname={styles.image_style} src={require('../../../assets/images/aliyun.jpg')}/>,
  title: '阿里巴巴',
  host: 'https://www.faceplusplus.com.cn/beauty/',
  tag: 'Medical',
  createAt: 'Created: April 2015',
  describe: ' 本 api 支持对检测到的人脸直接进行分析，获得人脸的关键点和各类属性信息',
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
      title: '人脸分析',
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
  title: '人脸分析',
  describe: '本 api 支持对检测到的人脸直接进行分析，获得人脸的关键点和各类属性信息',
  type: 'aliface',
  forms,
}

const response = ''

export default {
  apis,
  request,
  response,
  profile,
}
