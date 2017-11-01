'use strict';
import React from 'react';
import LoginHeader from './LoginHeader'
import styles from './login.css'
import '../font/font.css'
import { message, Form, Icon, Input, Button } from 'antd';
import { Card } from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
import { Link, routerRedux } from 'dva/router';



function Login({dispatch, form, loginFlag}) {
  
  console.log("Login function signupFlag: ", loginFlag);  

  let user = {};

  if(loginFlag == "loginFlag_true") {
    dispatch({
      type: 'login/setLoginFlag',
      payload: 'loginFlag_null'
    })
    message.success("Login success! ", 1);
    dispatch({
      type: 'headerModal/setLoginVisible',
      payload: false
    })
    // dispatch({
    //   type: 'login/setUsername',
    //   payload: user.username
    // })

    

  }

  if(loginFlag == "loginFlag_false") {
    dispatch({
      type: 'login/setLoginFlag',
      payload: 'loginFlag_null'
    })
    message.error("Login failed! ", 1);   
  }

   function handleSubmit(e) {
     form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
          user.username = values.username
          user.password = values.password
          user.email = ""
          console.log(user)
          dispatch({
            type: 'login/login',
            payload: {user:user}
          });

        });
     // dispatch(routerRedux.goBack())
    }

  const { getFieldDecorator } = form
  let loading = false;
  

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //     }
  //   });
  // }
    return (
      <div className={styles.layout}>
        <Card  className={styles.card_style} bodyStyle={{ padding: 0 }}>
          <div className={styles.login_header}><LoginHeader /></div>
          <div className={styles.form_style}>
            <Form className={styles.login_form}>
             <FormItem>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <p><Input className={styles.input} prefix={<Icon type="user" />} placeholder="Username" /></p>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <p><Input className={styles.input} prefix={<Icon type="lock" />} type="password" placeholder="Password" /></p>
                )}
              </FormItem>
              <FormItem>

                <p> <Button type="primary" htmlType="submit" className={styles.login_form_button} onClick={handleSubmit.bind(this)}>
                  <div style={{color: "#FFFFFF"}}>LOGIN</div>
                </Button></p>
                <a className={styles.login_form_forgot} href="">Forgot password?</a>
                <br/>
                <p className={styles.login_form_sign_up}>Not a Atmatrixer?&nbsp;&nbsp;&nbsp;<a>Sign Up</a></p>
              </FormItem>
            </Form>
          </div>
        </Card>



      </div>



    );
  }


  function mapStateToProps(state) {
    const { loginFlag } = state.login;
    return {
      loading: state.loading.models.login,
      loginFlag
    };
  }
  export default {
     // : Form.create()(Register),
     LoginForm: connect(mapStateToProps)(Login)
   }
  
// ReactDOM.render(<LoginForm />, document.getElementById('root'));
