import React from 'react'
import { Row, Col, Input, Button, Select, Icon } from 'antd'

const { Group, TextArea } = Input
const { Option } = Select

import './styles.css'

class Form extends React.Component {
  constructor(props) {
    super()
    this.state = props
  }

  render() {
    const thisFields = this.state.fields.map((field, idx) => {
      return (
        <div
          className="field"
          key={idx}
        >
          <div style={{align: 'right'}}>
            <span className="name">{field.name}</span>
            <span className="type">{field.type}</span>
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
        <div className="form-title">
          <h2>{this.state.title.toUpperCase()}</h2>
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
    this.state = props.data
  }

  render() {
    const forms = this.state.forms.map((form, idx) => {
      return (
        <Form
          key={idx}
          title={form.title}
          fields={form.fields}
        />
      )
    })

    return (
      <Col span={12} className="request" type="flex">
        <div>
          <div>
            <h3>{this.state.title}</h3>
            <p>{this.state.describe}</p>
          </div>
          {forms}
        </div>
        <Button className="request_buttom">Test EndPoint</Button>
      </Col>
    )
  }
}

class Response extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.data
  }

  render() {
    return (
      <Col span={12} className="response" type="flex">
        <div className={"container " + this.state.method.toUpperCase()}>
          <h2>ENDPOINT DEFINITION</h2>
          <Input
            className={
              "route-container " + this.state.method.toUpperCase()
            }
            addonBefore={
              <span
                className={"verb " + this.state.method.toUpperCase()}
              >
                {this.state.method.toUpperCase()}
              </span>
            }
            value={this.state.url}
            readOnly="readonly"
          />
        </div>
        <div className="container">
          <h2>REQUEST EXAMPLE</h2>
          <TextArea
            rows='12'
            value={this.state.requestExample}
            readOnly="readonly"
          />
        </div>
        <div className="container">
          <h2>RESPONSE BODY</h2>
          <div className="status_area">
            <span
              className={
                "status_container " + (/2..$/
                  .test(this.state.statusCode.toString())
                  ? "success"
                  : "fail")
              }
            >
              {
                `${this.state.statusCode} / ${this.state.contentType}`
              }
            </span>
            {this.state.endPointTitle.split(' ').join('_')}
          </div>
          <TextArea
            rows='12'
            value={this.state.responseBody}
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
    this.state = props
  }

  render() {
    return (
      <Row className="row2">
        <Row className='row1'>
          <Request data={this.state.request} />
          <Response data={this.state.response} />
        </Row>
      </Row>
    )
  }
}
