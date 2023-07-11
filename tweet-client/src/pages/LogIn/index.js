import { MailOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMutation } from 'graphql-hooks';
import AuthForm from 'components/AuthForm';
import { setCurrentUser } from 'app/userSlice';

const USER_SIGNIN_MUTATION = `
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        id
        username
        profileImageUrl
      }
      token
    }
  }
`;

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [signIn, { loading, error }] = useMutation(USER_SIGNIN_MUTATION, {
    onSuccess: ({ data }) => {
      localStorage.setItem('token', data.signIn.token);
      dispatch(setCurrentUser(data.signIn.user));
      navigate('/');
    }
  });

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
    signIn({ variables: data });
  };

  return (
    <div>
      <AuthForm
        buttonText="Log in"
        onSubmit={onSubmit}
        title="Please log in first"
        fields={fields}
        loading={loading}
      />
      <p>
        New to here? You can <Link to="/signup">sign up</Link> instead.
      </p>
    </div>
  );
}
