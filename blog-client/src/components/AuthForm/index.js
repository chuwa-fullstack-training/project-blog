import React from 'react';
import { Button, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import styles from './style.module.css';

export default function AuthForm({ buttonText, onSubmit, title, fields }) {
  const onFinish = async data => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      <Form onFinish={onFinish} autoComplete="off">
        {fields.map(field => (
          <Form.Item key={field.name} name={field.name} rules={field.rules}>
            {field.type === 'password' ? (
              <Input.Password
                placeholder={field.placeholder}
                prefix={<LockOutlined />}
                size="large"
              />
            ) : (
              <Input
                placeholder={field.placeholder}
                prefix={field.prefix}
                size="large"
              />
            )}
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.btn}>
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
