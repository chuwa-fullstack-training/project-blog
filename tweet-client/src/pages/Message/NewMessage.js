import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MessageForm from 'components/MessageForm';
import { createMessageAction } from 'app/messageSlice';

export default function NewMessage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);

  const handleSubmit = data => {
    dispatch(createMessageAction({ userId: user.id, text: data.text })).then(
      () => {
        navigate('/');
      }
    );
  };

  return <MessageForm onSubmit={handleSubmit} />;
}
