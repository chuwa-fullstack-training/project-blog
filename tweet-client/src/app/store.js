import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import errorReducer from './errorSlice';
import messageReducer from './messageSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
    messages: messageReducer
  },
  devTools: true
});
