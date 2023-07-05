import React from 'react';
import { MailOutlined, UserOutlined, LinkOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthForm from 'components/AuthForm';
import { signUpUser } from 'app/userSlice';

export default function SignUp() {
  const { status } = useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const onSubmit = async data => {
    dispatch(signUpUser(data));
    if (status === 'succeeded') {
      await navigate('/login');
    }
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
