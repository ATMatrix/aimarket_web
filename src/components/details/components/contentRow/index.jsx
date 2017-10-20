import React from 'react'
import { Row, Col, Input, Button, Select, Icon } from 'antd'
import { connect } from 'dva';

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
    console.log({
      type: 'ai/callai',
      payload: {params:JSON.stringify(params)}
    })
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


    function isEmpty(obj)
    {
      for (let name in obj)
      {
        return false
      }
      return true
    }

    return (
      <Col span={12} className={style.response} type="flex">
        {/* <div className={ */}
        {/*   style.container + ' ' + style[data.method.toUpperCase()] */}
        {/* }> */}
        {/*   <h2>ENDPOINT DEFINITION</h2> */}
        {/*   <Input */}
        {/*     className={ */}
        {/*       style.route_container + ' ' + style[data.method.toUpperCase()] */}
        {/*     } */}
        {/*     addonBefore={ */}
        {/*       <span */}
        {/*         className={ */}
        {/*           style.verb + ' ' + style[data.method.toUpperCase()] */}
        {/*         }> */}
        {/*         {data.method.toUpperCase()} */}
        {/*       </span> */}
        {/*     } */}
        {/*     value={data.url} */}
        {/*     readOnly="readonly" */}
        {/*   /> */}
        {/* </div> */}
        {/* <div className={style.container}> */}
        {/*   <h2>REQUEST EXAMPLE</h2> */}
        {/*   <TextArea */}
        {/*     rows='12' */}
        {/*     value={data.requestExample} */}
        {/*     readOnly="readonly" */}
        {/*   /> */}
        {/* </div> */}
        {/* <div className={style.container}> */}
          <h2>返回结果</h2>
          {/* <div classname={style.status_area}> */}
          {/*   <span */}
          {/*     classname={ */}
          {/*       style.status_container + ' ' + style.success */}
          {/*       style.status_container + ' ' + (/2..$/ */}
          {/*         .test(data.statuscode.tostring()) */}
          {/*         ? style.success */}
          {/*         : style.fail) */}
          {/*     } */}
          {/*   > */}
          {/*     { */}
          {/*       `${data.statuscode} / ${data.contenttype}` */}
          {/*       '200 / json/application' */}
          {/*     } */}
          {/*   </span> */}
          {/*   {data.endpointtitle.split(' ').join('_')} */}
          {/* </div> */}
          <TextArea
            rows='24'
            value={data}
            readOnly="readonly"
          />
        {/* </div> */}
      </Col>
    )
  }
}

class ContentRow extends React.Component {
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

// const mapStateToProps = state => state.ai.aiName

// export default connect(mapStateToProps)(Details)
function mapStateToProps(state) {
  // const { callAIResult,signupFlag } = state.ai;
  return {
    // loading: state.loading.models.ai,
    response: JSON.stringify(state.ai.callAIResult),
    // signupFlag
  }
}

export default connect(mapStateToProps)(ContentRow);
