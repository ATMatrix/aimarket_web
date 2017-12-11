import styles from '../../AIList/table.css'

const profile = {
  creator: '',
  logoSrc: '',
  title: '',
  host: '',
  tag: '',
  createAt: '',
  describe: '',
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
  ],
}

const forms = [
  {
    title: '请求参数',
    fields,
  },
]


const request = {
  title: '',
  describe: '',
  type: '',
  forms: [],
}

const response = ''

export default {
  apis,
  request,
  profile,
}
