import React from 'react'

import './styles/css/font.css'
import style from './styles/css/header.css'

import { Row, Col, Input } from 'antd'

const { Search } = Input

export default class extends React.Component {
  render() {
    return(
      <Row  className={style.head_light_back} >
        <Col className={style.column1}>
        </Col>

        <Col className={style.column2}>
        </Col>

        <Col className={style.column3}>
          <Search
            placeholder={"Search AIs"}
            className={style.search_font}/>
        </Col>

        <Col className={style.column1}>
        </Col>

        <Col className={style.column2}>
          <a href="#" className={style.head_light_font} >Explore AIs</a>
        </Col>

        <Col className={style.column2}>
          <a href="#" className={style.head_light_font}>Docs</a>
        </Col>

        <Col className={style.column4}>
        </Col>

        <Col className={style.column2}>
          <a href="#" className={style.head_light_font} >Sign In</a>
        </Col>
        <Col className={style.column2}>
          <a href="#" className={style.head_light_font}>Sign Up</a>
        </Col>
      </Row>
    )
  }
}
