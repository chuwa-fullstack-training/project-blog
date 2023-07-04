import React from 'react';
import { MailOutlined, UserOutlined, LinkOutlined } from '@ant-design/icons';
import AuthForm from '../../components/AuthForm';

export default function SignUp() {
  const fields = [
    {
      placeholder: 'Username',
      name: 'username',
      type: 'text',
      prefix: <UserOutlined />,
      rules: [
        {
          required: true,
          message: 'Please input your username!'
        }
      ]
    },
    {
      placeholder: 'Email',
      name: 'email',
      type: 'text',
      prefix: <MailOutlined />,
      rules: [
        {
          required: true,
          message: 'Please input your email!'
        }
      ]
    },
    {
      placeholder: 'Password',
      name: 'password',
      type: 'password',
      rules: [
        {
          required: true,
          message: 'Please input your password!'
        }
      ]
    },
    {
      placeholder: 'Profile Image URL',
      name: 'profileImageUrl',
      type: 'text',
      prefix: <LinkOutlined />
    }
  ];

  const onSubmit = data => {
    console.log(data);
  };
  return (
    <div>
      <AuthForm
        buttonText="Sign up"
        onSubmit={onSubmit}
        title="Welcome to the wonderful Blog!"
        fields={fields}
      />
    </div>
  );
}
