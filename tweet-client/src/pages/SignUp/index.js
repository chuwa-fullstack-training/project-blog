import React from 'react';
import { MailOutlined, UserOutlined, LinkOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'graphql-hooks';
import AuthForm from 'components/AuthForm';

const USER_SIGNUP_MUTATION = `
  mutation($email: String!, $username: String!, $password: String!, $profileImageUrl: String) {
    signUp(email: $email, username: $username, password: $password, profileImageUrl: $profileImageUrl) {
      user {
        id
        username
        profileImageUrl
      }
      token
    }
  }
`;

export default function SignUp() {
  const navigate = useNavigate();

  const [signUp, { loading, error }] = useMutation(USER_SIGNUP_MUTATION, {
    onSuccess: () => {
      navigate('/login');
    }
  });

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
    // dispatch(signUpUser(data)).then(() => navigate('/login'));
    signUp({ variables: data });
  };
  return (
    <div>
      <AuthForm
        buttonText="Sign up"
        onSubmit={onSubmit}
        title="Welcome to the wonderful Mini Tweet Land!"
        fields={fields}
        loading={loading}
      />
    </div>
  );
}
