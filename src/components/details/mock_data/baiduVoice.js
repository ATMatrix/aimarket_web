import styles from '../../AIList/table.css'

const profile = {
  creator: '百度',
  logoSrc: <img classname={styles.image_style} src={require('../../../assets/images/baidu.jpg')}/>,
  title: '百度语音合成',
  host: 'https://ai.baidu.com/tech/speech/tts',
  tag: 'Medical',
  createAt: 'Created: April 2015',
  describe: '基于业界领先的深度神经网络技术，提供流畅自然的语音合成服务, 让您的应用开口说话',
};

const fields = [
  {
    name: 'word',
    type: 'STRING',
    describe: '用于合成语音的文字',
    required: true,
    place_holder: '张鋆去吃饭',
  },
]

const apis = {
  items: [
    {
      method: 'get',
      title: '语音合成',
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
  title: '语音合成',
  describe: '基于业界领先的深度神经网络技术，提供流畅自然的语音合成服务, 让您的应用开口说话',
  type: 'baiduVoice',
  forms,
}

const response = ''

export default {
  apis,
  request,
  response,
  profile,
}
