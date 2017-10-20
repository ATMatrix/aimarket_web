import React from 'react'
import { Row, Col, Input, Button, Select, Icon } from 'antd'

const { Group, TextArea } = Input
const { Option } = Select

import style from './styles.css'

class Form extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const thisFields = this.props.fields.map((field, idx) => {
      return (
        <div
          className={style.field}
          key={idx}
        >
          <div style={{align: 'right'}}>
            <span className={style.name}>{field.name}</span>
            <span className={style.type}>{field.type}</span>
          </div>
          <div>
            <Input
              className={'CallAIInputData'}
              name={field.name}
              suffix={
                field.required
                  ? <span style={{color: "red"}}>*</span>
                  : ""
              }
              type="text"
              placeholder={field.place_holder}
            />
            <p>{field.describe}</p>
          </div>
        </div>
      )
    })

    return (
      <div>
        <div className={style.form_title}>
          <h2>{this.props.title.toUpperCase()}</h2>
        </div>
        <div>
          {thisFields}
        </div>
      </div>
    )
  }
}

class Request extends React.Component {
  constructor(props) {
    super(props)
    this.handleCallAI = this.handleCallAI.bind(this)
  }

  handleCallAI() {
    console.log(this.props)
    const params = {
      type: this.props.data.type,
    }
    const formFields = document.querySelectorAll('.CallAIInputData input')
    for (let i = 0; i < formFields.length; i++) {
      const field = formFields[i]
      params[field.name] = field.value
    }
    console.log(params)
    this.props.dispatch({
      type: 'ai/callai',
      payload: {params:JSON.stringify(params)}
    })
  }

  render() {
    const data = this.props.data
    const forms = data.forms.map((form, idx) => {
      return (
        <Form
          key={idx}
          title={form.title}
          fields={form.fields}
        />
      )
    })

    return (
      <Col span={12} className={style.request} type="flex">
        <div>
          <div>
            <h3>{data.title}</h3>
            <p>{data.describe}</p>
          </div>
          {forms}
        </div>
        <Button className={style.request_buttom} onClick={this.handleCallAI}>Test EndPoint</Button>
      </Col>
    )
  }
}

class Response extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const data = this.props.data
    return (
      <Col span={12} className={style.response} type="flex">
        <div className={
          style.container + ' ' + style[data.method.toUpperCase()]
        }>
          <h2>ENDPOINT DEFINITION</h2>
          <Input
            className={
              style.route_container + ' ' + style[data.method.toUpperCase()]
            }
            addonBefore={
              <span
                className={
                  style.verb + ' ' + style[data.method.toUpperCase()]
                }>
                {data.method.toUpperCase()}
              </span>
            }
            value={data.url}
            readOnly="readonly"
          />
        </div>
        <div className={style.container}>
          <h2>REQUEST EXAMPLE</h2>
          <TextArea
            rows='12'
            value={data.requestExample}
            readOnly="readonly"
          />
        </div>
        <div className={style.container}>
          <h2>RESPONSE BODY</h2>
          <div className={style.status_area}>
            <span
              className={
                style.status_container + ' ' + (/2..$/
                  .test(data.statusCode.toString())
                  ? style.success
                  : style.fail)
              }
            >
              {
                `${data.statusCode} / ${data.contentType}`
              }
            </span>
            {data.endPointTitle.split(' ').join('_')}
          </div>
          <TextArea
            rows='12'
            value={data.responseBody}
            readOnly="readonly"
          />
        </div>
      </Col>
    )
  }
}

export default class extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Row className={style.row2}>
        <Row className={style.row1}>
          <Request dispatch={this.props.dispatch} data={this.props.request} />
          <Response data={this.props.response} />
        </Row>
      </Row>
    )
  }
}
