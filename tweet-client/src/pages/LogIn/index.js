import { MailOutlined } from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthForm from 'components/AuthForm';
import { authUser } from 'app/userSlice';

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
    dispatch(authUser(data)).then(() => {
      navigate(location.state?.from || '/');
    });
  };

  return (
    <div>
      <AuthForm buttonText="Log in" onSubmit={onSubmit} title="Please log in first" fields={fields} />
      <p>
        New to here? You can <Link to="/signup">sign up</Link> instead.
      </p>
    </div>
  );
}
