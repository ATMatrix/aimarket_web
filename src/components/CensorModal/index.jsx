import { Modal, Button } from 'antd'
import React from 'react'

class SencorModal extends React.Component {
  state = {
    visible: false,
    result: ''
  }
  censor = () => {
    // const r = await c()
    const r = 'fuck it'
    this.setState({
      visible: true,
      result: JSON.stringify(r, null, 2)
    })
  }
  handleOk = (e) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }
  handleCancel = (e) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.censor}>Open</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <p style={{whiteSpace: 'pre-wrap'}}>{this.state.result}</p>
        </Modal>
      </div>
    )
  }
}
