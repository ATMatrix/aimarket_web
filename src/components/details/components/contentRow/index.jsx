import React from 'react'
import { Row, Col, Input, Button, Select, Icon, Tabs } from 'antd'
import { connect } from 'dva';

const { Group, TextArea } = Input
const { Option } = Select
const { TabPane } = Tabs

import AISteps from '../stepBar'
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
          <p style={{fontSize:'15px', fontWeight: '600'}}>{this.props.title.toUpperCase()}</p>
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
    this.props.dispatch({
      type: 'ai/callai',
      payload: '',
    })

    const params = {
      aiID: this.props.data.type,
      args: {},
    }
    const formFields = document.querySelectorAll('.CallAIInputData input')
    for (let i = 0; i < formFields.length; i++) {
      const field = formFields[i]
      params.args[field.name] = field.value
    }

    const socket = newSocket()
    socket.on('message', (msg) => {
      this.props.dispatch({
        type: 'ai/nextStep',
        payload: msg,
      })
    })
    socket.emit('callAI', params)
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
            <p style={{fontSize:'20px', fontWeight: '600'}}>{data.title}</p>
            <p>{data.describe}</p>
          </div>
          {forms}
        </div>
        <Button
          className={style.request_buttom}
          onClick={this.handleCallAI}
          loading={data.requesting}
        >Test EndPoint</Button>
      </Col>
    )
  }
}

class Response extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const result = this.props.data.result
    const log = this.props.data.log
    return (
      <Col span={12} className={style.response} type="flex">
          <div className="card-container">
						<Tabs type="card" style={{ whiteSpace: 'pre-wrap' }}>
              <TabPane
                tab="Result"
                key="1"
                style={{ whiteSpace: 'pre-wrap' }}
              >{result}</TabPane>
							<TabPane
                tab="Log"
                key="2"
                style={{ whiteSpace: 'pre-wrap' }}
              >{log}</TabPane>
						</Tabs>
					</div>
      </Col>
    )
  }
}

export default class ContentRow extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Row style={{height: '100%'}}>
        <AISteps data={this.props.step} />
        <Row style={{height: '100%'}}>
          <Request
            dispatch={this.props.dispatch}
            data={this.props.request}
          />
          <Response data={this.props.response} />
        </Row>
      </Row>
    )
  }
}
