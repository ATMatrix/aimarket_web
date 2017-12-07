import styles from '../../AIList/table.css'

const profile = {
  creator: '科大讯飞',
  logoSrc: <img className={styles.image_style} src={require('../../../assets/images/xunfei.png')}/>,
  title: 'AIUI',
  host: 'http://aiui.xfyun.cn/default/index',
  tag: 'Medical',
  createAt: 'Created: April 2015',
  describe: '人工智能语义理解能力，例如天气、音乐、闲聊、智能家居等',
};

const fields = [
  {
    name: 'question',
    type: 'STRING',
    describe: '对话内容',
    required: true,
    place_holder: '你好！',
  },
]

const apis = {
  items: [
    {
      method: 'get',
      title: '语义理解',
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
  title: '语义理解',
  describe: '人工智能语义理解能力，例如天气、音乐、闲聊、智能家居等',
  type: 'xunfei',
  forms,
}

const response = ''

export default {
  apis,
  request,
  response,
  profile,
}
