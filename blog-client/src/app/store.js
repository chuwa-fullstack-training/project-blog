import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import errorReducer from './errorSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer
  },
  devTools: true
});
