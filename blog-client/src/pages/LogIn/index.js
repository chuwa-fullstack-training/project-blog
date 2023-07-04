import React from 'react';
import { MailOutlined } from '@ant-design/icons';
import AuthForm from '../../components/AuthForm';
import { Link } from 'react-router-dom';

export default function LogIn() {
  const fields = [
    {
      placeholder: 'Email',
      name: 'email',
      type: 'text',
      prefix: <MailOutlined />
    },
    {
      placeholder: 'Password',
      name: 'password',
      type: 'password'
    }
  ];

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div>
      <AuthForm
        buttonText="Log in"
        onSubmit={onSubmit}
        title="Please log in first"
        fields={fields}
      />
      <p>
        New to here? You can <Link to="/signup">sign up</Link> instead.
      </p>
    </div>
  );
}
