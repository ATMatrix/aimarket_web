'use strict';
import React from 'react';
import '../font/font.css'
import styles from './header.css'
import logo_light from '../../assets/images/logo_light.png'
import { Row, Col, message } from 'antd';
import { Input, Form, Modal } from 'antd';
import { LoginForm } from './Login'
import { RegisterForm } from './Register'

const Search = Input.Search;
import { connect } from 'dva';
import { Link } from 'dva/router';


function HeaderLight({ dispatch, registerVisible, loginVisible, username }){

    const showLoginModal = () => {
        dispatch({
            type: 'headerModal/setLoginVisible',
            payload: true
        })
    }

    const showRegisterModal = () => {
        dispatch({
            type: 'headerModal/setRegisterVisible',
            payload: true
        })
    }

    const handleOk = () => {
        dispatch({
            type: 'headerModal/setRegisterVisible',
            payload: false
        })
        dispatch({
            type: 'headerModal/setLoginVisible',
            payload: false
        })
    }
    const handleCancel = () => {
        dispatch({
            type: 'headerModal/setRegisterVisible',
            payload: false
        })
        dispatch({
            type: 'headerModal/setLoginVisible',
            payload: false
        })
    }

    const logout = () => {
        dispatch({
            type: 'login/logout',
            payload: ''
        })
        message.success("Logout success!", 1);
    }

      const AntForm = Form.create()(RegisterForm)
      const LogForm = Form.create()(LoginForm)

      let isLoggedIn = username == '' ? false : true;  
      console.log("HeaderDark isLoggedIn: ", isLoggedIn);

        return(
        <Row  className={styles.head_light_back} >
            <Col className={styles.column1}>

            </Col>
            <Col className={styles.column2}>
              <Link to="/">
                <img src={logo_light}  style={{marginTop: "20px"}} className={styles.image_margin}/>
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
              <Link to="/list" className={styles.head_light_font}>Explore AIs</Link>
            </Col>

            <Col className={styles.column2}>
                <a href="#" className={styles.head_light_font}>Docs</a>
            </Col>

            <Col className={styles.column4}>
            </Col>

            { isLoggedIn  ? (
                <div className = {styles.login_flex}>
                    <Col className={styles.column2}>
                        <Link to = "/userAccount">
                        <a className={styles.head_light_font}>{username}</a>
                        </Link>
                    </Col>
                    
                    <Col className={styles.column2}>
                        <a  onClick={logout} className={styles.head_light_font} >Logout</a>
                    </Col>
                </div>
            ) : (
                <div className = {styles.login_flex}>
                    <Col className={styles.column2}>
                            <a onClick={showLoginModal} className={styles.head_light_font} >Login</a></Col>
                    <div >
                    <Modal
                        bodyStyle={{ padding: 0 }}
                        className={styles.modal}
                        visible={loginVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={null}
                        closable={false}
                    >
                        <div className={styles.login_form}><LogForm /></div>
                    </Modal>
                    </div>

                    <Col className={styles.column2}>
                            <a onClick={showRegisterModal} className={styles.head_light_font} >Sign Up</a></Col>
                    <div >
                        <Modal
                            bodyStyle={{ padding: 0 }}
                            className={styles.modal}
                            visible={registerVisible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={null}
                            closable={false}
                        >
                            <div className={styles.login_form}><AntForm /></div>
                        </Modal>
                    </div>
                </div>
            )}



        </Row>

        );
}
function mapStateToProps(state) {
    const { loginVisible } = state.headerModal;
    const { registerVisible } = state.headerModal;
    const { username } = state.login;
    return {
      registerVisible,
      loginVisible,
      username
    };
  }
  export default {
     // : Form.create()(Register),
     HomeHeader: connect(mapStateToProps)(HeaderLight)
   }
  
// ReactDOM.render(
//     <Headerlight/>
//     , document.getElementById('root'));

