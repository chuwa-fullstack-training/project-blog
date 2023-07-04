import { combineReducers } from 'redux';
import errorReducer from './errors';
import currentUserReducer from './currentUser';

export default combineReducers({
  errors: errorReducer,
  currentUser: currentUserReducer
});
