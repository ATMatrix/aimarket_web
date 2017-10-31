'use strict';
import React from 'react';
import { connect } from 'dva';
import '../font/font.css'
import styles from './header.css'
import { Row, Col } from 'antd';
import logo_dark from '../../assets/images/logo_dark.png'

function LoginHeader() {


        return(
            <Row  className={styles.head_dark_back2} >
                <Col span={1}>

                </Col>
                <Col span={3}>
                    <img src={logo_dark}  style={{marginTop: "10px"}} className={styles.image_margin}/>
                </Col>

                <Col span={20}></Col>
            </Row>

        );
}

export default connect()(LoginHeader);

