import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import styles from './style.module.css';

export default function AuthForm({ buttonText, onSubmit, title, fields, errors }) {
  const { status } = useSelector(state => state.user);

  return (
    <>
      <Typography className={styles.title}>{title}</Typography>
      <Form onFinish={onSubmit} autoComplete="off">
        {fields.map(field => (
          <Form.Item key={field.name} name={field.name} rules={field.rules}>
            {field.type === 'password' ? (
              <Input.Password placeholder={field.placeholder} prefix={<LockOutlined />} size="large" />
            ) : (
              <Input placeholder={field.placeholder} prefix={field.prefix} size="large" />
            )}
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.btn} size="large" loading={status === 'pending'}>
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
