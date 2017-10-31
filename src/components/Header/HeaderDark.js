import React from 'react';
import '../font/font.css'
import styles from './header.css'
import logo_dark from '../../assets/images/logo_dark.png'
import { Row, Col } from 'antd';
import { Input, Form, Modal } from 'antd';
import { LoginForm } from './Login'
import { RegisterForm } from './Register'

const Search = Input.Search;
import { connect } from 'dva';
import { Link } from 'dva/router';


function HeaderDark({ dispatch, registerVisible, loginVisible }){

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

      const AntForm = Form.create()(RegisterForm)
      const LogForm = Form.create()(LoginForm)

        return(
        <Row  className={styles.head_dark_back} >
            <Col className={styles.column1}>

            </Col>
            <Col className={styles.column2}>
              <Link to="/">
                <img src={logo_dark}  style={{marginTop: "8px"}} className={styles.image_margin}/>
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
              <Link to="/list" className={styles.head_dark_font}>Explore AIs</Link>
            </Col>

            <Col className={styles.column2}>
                <a href="#" className={styles.head_dark_font}>Docs</a>
            </Col>

            <Col className={styles.column4}>
            </Col>

            <Col className={styles.column2}>
                    <a onClick={showLoginModal} className={styles.head_dark_font} >Login</a></Col>
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
                    <a onClick={showRegisterModal} className={styles.head_dark_font} >Sign Up</a></Col>
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



        </Row>

        );
}
function mapStateToProps(state) {
    const { loginVisible } = state.headerModal;
    const { registerVisible } = state.headerModal;
    return {
      registerVisible,
      loginVisible
    };
  }
  export default {
     // : Form.create()(Register),
     HomeHeader: connect(mapStateToProps)(HeaderDark)
   }
  
// ReactDOM.render(
//     <Headerdark/>
//     , document.getElementById('root'));

