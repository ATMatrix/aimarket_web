import styles from '../../AIList/table.css'

const profile = {
  creator: '百度',
  logoSrc: <img classname={styles.image_style} src={require('../../../assets/images/baidu2.jpg')}/>,
  title: '百度情感倾向分析',
  host: 'https://ai.baidu.com/tech/nlp/sentiment_classify',
  tag: 'Medical',
  createAt: 'Created: April 2015',
  describe: '自动对包含主观信息的文本进行情感倾向性判断，为口碑分析、话题监控、舆情分析等应用提供基础技术支持',
};

const fields = [
  {
    name: 'text',
    type: 'STRING',
    describe: '句子',
    required: true,
    place_holder: '今天心情真好！',
  },
]

const apis = {
  items: [
    {
      method: 'get',
      title: '情感倾向分析',
    },
  ],
}

const forms = [
  {
    title: '情感倾向分析',
    fields,
  },
]

const request = {
  title: '情感倾向分析',
  describe: '自动对包含主观信息的文本进行情感倾向性判断，为口碑分析、话题监控、舆情分析等应用提供基础技术支持',
  type: 'BAIDU_NLP',
  forms,
}

const response = ''

export default {
  apis,
  request,
  response,
  profile,
}
