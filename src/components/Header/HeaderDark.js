import React from 'react';
import '../font/font.css'
import styles from './header.css'
import logo_dark from '../../assets/images/logo_dark.png'
import { Row, Col } from 'antd';
import { Input, Form, Modal } from 'antd';
import LoginForm from './Login'
import {RegisterForm} from './Register'
const Search = Input.Search;
import { Link } from 'dva/router';


export default class HeaderDark extends React.Component {
    // handleClick = (e) => {
    //     console.log('click ', e);
    //     this.setState({
    //         current: e.key,
    //     });
    // }


  constructor(props) {
    super(props)
    this.state = { loginVisible: false, registerVisible: false }
  }
    showLoginModal = () => {
        this.setState({
          loginVisible: true,
        });
    }

  showRegisterModal = () => {
    this.setState({
      registerVisible: true,
    });
  }

    handleOk = (e) => {
        this.setState({
          loginVisible: false,
          registerVisible: false
        });
      // let user = {}
      // dispatch({
      //   type: 'signup/signup',
      //   payload: {user:user}
      // });
    }
    handleCancel = (e) => {
        this.setState({
          loginVisible: false,
          registerVisible: false
        });
    }

    render() {
      const AntForm = Form.create()(RegisterForm)
        return(
    //       <div>
    //       <Test test="tester"/>
    //       </div>
    //
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
                    <a onClick={this.showLoginModal} className={styles.head_dark_font} >Login</a></Col>
            <div >
            <Modal
                bodyStyle={{ padding: 0 }}
                className={styles.modal}
                visible={this.state.loginVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
                closable={false}
            >
                <div className={styles.login_form}><LoginForm /></div>
            </Modal>
            </div>

            <Col className={styles.column2}>
                    <a onClick={this.showRegisterModal} className={styles.head_dark_font} >Sign Up</a></Col>
            <div >
                <Modal
                    bodyStyle={{ padding: 0 }}
                    className={styles.modal}
                    visible={this.state.registerVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    closable={false}
                >
                    <div className={styles.login_form}><AntForm /></div>
                </Modal>
            </div>



        </Row>

        );
    }
}
// ReactDOM.render(
//     <HeaderDark/>
//     , document.getElementById('root'));

