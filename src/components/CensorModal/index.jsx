import { Modal, Button } from 'antd'
import React from 'react'

export default ({ result, display, dispatch }) => {
  const handleOk = (e) => {
    console.log(e)
    dispatch({
      type: 'censor/hide'
    })
  }

  const handleCancel = (e) => {
    console.log(e)
    dispatch({
      type: 'censor/hide'
    })
  }

  return (
    <Modal
      title="Censor result"
      visible={display}
      onOk={handleOk}
      onCancel={handleCancel}
    >
    <p style={{whiteSpace: 'pre-wrap'}}>{result}</p>
    </Modal>
  )
}
