import React from 'react';
import LoginHeader from './LoginHeader'
import styles from './login.css'
import '../font/font.css'
import { message, Form, Icon, Input, Button } from 'antd';
import { Card } from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;
import { Link, routerRedux } from 'dva/router';

proxyGlobal.once('signupFlag_false', function () {
  message.error("Sign up failed! ");
});

proxyGlobal.once('signupFlag_true', function () {
  message.success("Sign up success! ", 0.5, onClose);
});

const onClose = () => {
  // window.location.href='/'
}

function Register({dispatch,form, signupFlag}) {

   function handleSubmit(e) {
     form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
          let user = {}
          user.username = values.username
          user.email = values.email
          user.password = values.password
          console.log(user)
          dispatch({
            type: 'signup/signup',
            payload: {user:user}
          });

        });
     // dispatch(routerRedux.goBack())
    }



  const { getFieldDecorator } = form
  let loading = false;


  return (
      <div className={styles.layout}>
        <Card className={styles.card_style} bodyStyle={{padding: 0}}>
          <div className={styles.login_header}><LoginHeader/></div>
          <div className={styles.form_style}>
            <Form className={styles.login_form}>
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{required: true, message: 'Please input your username!'}],
                })(
                  <p><Input className={styles.input} id="username" prefix={<Icon type="user"/>} placeholder="Name"/>
                  </p>
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('email', {
                  rules: [{required: true, message: 'Please input your email!'}],
                })(
                  <p><Input className={styles.input} id="email" prefix={<Icon type="mail"/>} placeholder="Email"/></p>
                )}
              </FormItem>

              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{required: true, message: 'Please input your Password!'}],
                })(
                  <p><Input className={styles.input} id="password" prefix={<Icon type="lock"/>} type="password"
                            placeholder="Password"/></p>
                )}
              </FormItem>
              <FormItem>

                <p><Button type="primary" onClick={handleSubmit.bind(this)} className={styles.login_form_button}>
                  <div style={{color: "#FFFFFF"}}>Sign Up</div>
                </Button></p>
                <br/>
                <p className={styles.login_form_sign_up}>Have an account?&nbsp;&nbsp;&nbsp;<a>Log in</a></p>
              </FormItem>
            </Form>
          </div>
        </Card>


      </div>



    );
}


function mapStateToProps(state) {
  const { signupFlag } = state.signup;
  return {
    loading: state.loading.models.signup,
    signupFlag
  };
}
export default {
   // : Form.create()(Register),
   RegisterForm: connect(mapStateToProps)(Register)
 }


