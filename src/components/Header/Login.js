import React from 'react';
import LoginHeader from './LoginHeader'
import styles from './login.css'
import  '../font/font.css'
import { Form, Icon, Input, Button } from 'antd';
import { Card } from 'antd';
const FormItem = Form.Item;


class Login extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.layout}>
        <Card  className={styles.card_style} bodyStyle={{ padding: 0 }}>
          <div className={styles.login_header}><LoginHeader /></div>
          <div className={styles.form_style}>
            <Form onSubmit={this.handleSubmit} className={styles.login_form}>
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

                <p> <Button type="primary" htmlType="submit" className={styles.login_form_button}>
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
}

const LoginForm = Form.create()(Login);
export default LoginForm;

// ReactDOM.render(<LoginForm />, document.getElementById('root'));
