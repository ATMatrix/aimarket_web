import React from 'react';
import '../font/font.css'
import styles from './header.css'
import logo_light from '../../assets/images/logo_light.png'
import logo_dark from '../../assets/images/logo_dark.png'
import { Row, Col } from 'antd';
import { Input, Form, Modal } from 'antd';
import { LoginForm } from './Login'
import { RegisterForm } from './Register'

const Search = Input.Search;
import { connect } from 'dva';
import { Link } from 'dva/router';


function PersonalHeader({ dispatch, username }){

//   <Col className={styles.column2}>
//   <img className={styles.image_layout} src={require('../../assets/images/temp6.jpeg')}/></Col>
// <div >
// </div>

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
              <span  className={styles.head_dark_font} >{username}</span></Col>
              <div >
            </div>

            <Col className={styles.column2}>
                    <a  className={styles.head_dark_font} >Log out</a></Col>
            <div >
                
            </div>



        </Row>

        );
}

function mapStateToProps(state) {
  const { username } = state.login;
  return {
    username
  };
}
export default {
   // : Form.create()(Register),
   PersonalHeader: connect(mapStateToProps)(PersonalHeader)
 }

// export default connect()(PersonalHeader);

// ReactDOM.render(
//     <Headerlight/>
//     , document.getElementById('root'));

