import { signIn } from 'services/auth';
import { SET_CURRENT_USER } from 'store/actionTypes';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const authUser = data => dispatch => {
  signIn(data).then(user => dispatch(setCurrentUser(user)));
};
