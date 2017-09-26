import React from 'react'

import './styles/css/font.css'
import './styles/css/header.css'

import { Row, Col, Input } from 'antd'

const { Search } = Input

export default class extends React.Component {
  render() {
    return(
      <Row  className={"head-light-back"} >
        <Col className={"column1"}>
        </Col>

        <Col className={"column2"}>
        </Col>

        <Col className={"column3"}>
          <Search
            placeholder={"Search AIs"}
            className={"search-font"}/>
        </Col>

        <Col className={"column1"}>
        </Col>

        <Col className={"column2"}>
          <a href="#" className={"head-light-font"} >Explore AIs</a>
        </Col>

        <Col className={"column2"}>
          <a href="#" className={"head-light-font"}>Docs</a>
        </Col>

        <Col className={"column4"}>
        </Col>

        <Col className={"column2"}>
          <a href="#" className={"head-light-font"} >Sign In</a>
        </Col>
        <Col className={"column2"}>
          <a href="#" className={"head-light-font"}>Sign Up</a>
        </Col>
      </Row>
    )
  }
}
