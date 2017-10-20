import styles from '../../AIList/table.css'

const profile = {
  title: '小i机器人',
  logoSrc: <img className={styles.image_style} src={require('../../../assets/images/temp6.jpeg')}/>,
  creator: '小 i',
  host: 'http://www.xiaoi.com/solution/service/vca.shtml',
  tag: 'Medical',
  createAt: 'Created: April 2015',
  describe: '以人工智能技术为基础，通过网页、即时通讯工具、社交媒体工具等形式，实现一对多7X24小时服务',
}

const fields = [
  {
    name: 'question',
    type: 'STRING',
    describe: '对话内容',
    required: true,
    place_holder: '今天是多少号？',
  },
]

const apis = {
  items: [
    {
      method: 'get',
      title: '对话机器人',
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
  title: '对话机器人',
  describe: '以人工智能技术为基础，通过网页、即时通讯工具、社交媒体工具等形式，实现一对多7X24小时服务',
  type: 'xiaoi',
  forms,
}

export default {
  apis,
  request,
  profile,
}
