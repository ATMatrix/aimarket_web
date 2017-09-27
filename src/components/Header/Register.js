import React from 'react';
import LoginHeader from './LoginHeader'
import styles from './login.css'
import '../font/font.css'
import { Form, Icon, Input, Button } from 'antd';
import { Card } from 'antd';
const FormItem = Form.Item;


class Register extends React.Component {
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
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <p><Input className={styles.input} prefix={<Icon type="user" />} placeholder="Name" /></p>
                                )}
                            </FormItem>

                            <FormItem>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: 'Please input your email!' }],
                                })(
                                    <p><Input className={styles.input} prefix={<Icon type="mail" />} placeholder="Email" /></p>
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
}

const RegisterForm = Form.create()(Register);
export default RegisterForm;

