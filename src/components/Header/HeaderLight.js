import React from 'react';
import '../font/font.css'
import styles from './header.css'
import { Row, Col } from 'antd';
import { Input, Modal } from 'antd';
import LoginForm from './Login'
import RegisterForm from './Register'
import logo_light from '../../assets/images/logo_light.png'
const Search = Input.Search;
import { Link } from 'dva/router';

export default class Headerlight extends React.Component {
    state = { visible: false }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    render() {
        return(
            <Row  className={styles.head_light_back} >
                <Col className={styles.column1}>

                </Col>
                <Col className={styles.column2}>
                  <Link to="/">
                    <img src={logo_light}  style={{marginTop: "8px"}} className={styles.image_margin}/>
                  </Link>
                </Col>
                <Col className={styles.column3}>
                    <Search
                        placeholder={"Search AIs"}
                        className={styles.search_font}/>
                </Col>
                <Col className={styles.column1}>

                </Col>
                <Col className={styles.column2}>
                  <Link to="/list"  className={styles.head_light_font} >Explore AIs</Link>
                </Col>

                <Col className={styles.column2}>
                    <a href="#" className={styles.head_light_font}>Docs</a>
                </Col>

                <Col className={styles.column4}>
                </Col>

                <Col className={styles.column2}>
                    <a onClick={this.showModal} className={styles.head_light_font} >Login</a></Col>
                <div >
                    <Modal
                        bodyStyle={{ padding: 0 }}
                        className={styles.modal}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={null}
                        closable={false}
                    >
                        <div className={styles.login_form}><LoginForm /></div>
                    </Modal>
                </div>


                <Col className={styles.column2}>
                    <a onClick={this.showModal} className={styles.head_light_font}>Sign Up</a></Col>
                <div >
                    <Modal
                        bodyStyle={{ padding: 0 }}
                        className={styles.modal}
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={null}
                        closable={false}
                    >
                        <div className={styles.login_form}><RegisterForm /></div>
                    </Modal>
                </div>



            </Row>

        );
    }
}
