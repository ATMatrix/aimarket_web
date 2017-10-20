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
    this.props = props.data
  }

  render() {
    const forms = this.props.forms.map((form, idx) => {
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
            <h3>{this.props.title}</h3>
            <p>{this.props.describe}</p>
          </div>
          {forms}
        </div>
        <Button className={style.request_buttom}>Test EndPoint</Button>
      </Col>
    )
  }
}

class Response extends React.Component {
  constructor(props) {
    super(props)
    this.props = props.data
  }

  render() {
    return (
      <Col span={12} className={style.response} type="flex">
        <div className={
          style.container + ' ' + style[this.props.method.toUpperCase()]
        }>
          <h2>ENDPOINT DEFINITION</h2>
          <Input
            className={
              style.route_container + ' ' + style[this.props.method.toUpperCase()]
            }
            addonBefore={
              <span
                className={
                  style.verb + ' ' + style[this.props.method.toUpperCase()]
                }>
                {this.props.method.toUpperCase()}
              </span>
            }
            value={this.props.url}
            readOnly="readonly"
          />
        </div>
        <div className={style.container}>
          <h2>REQUEST EXAMPLE</h2>
          <TextArea
            rows='12'
            value={this.props.requestExample}
            readOnly="readonly"
          />
        </div>
        <div className={style.container}>
          <h2>RESPONSE BODY</h2>
          <div className={style.status_area}>
            <span
              className={
                style.status_container + ' ' + (/2..$/
                  .test(this.props.statusCode.toString())
                  ? style.success
                  : style.fail)
              }
            >
              {
                `${this.props.statusCode} / ${this.props.contentType}`
              }
            </span>
            {this.props.endPointTitle.split(' ').join('_')}
          </div>
          <TextArea
            rows='12'
            value={this.props.responseBody}
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
          <Request data={this.props.request} />
          <Response data={this.props.response} />
        </Row>
      </Row>
    )
  }
}
