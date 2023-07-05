import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { StyleProvider } from '@ant-design/cssinjs';
import jwtDecode from 'jwt-decode';
import store from 'app/store';
import { setCurrentUser } from 'app/userSlice';
import App from './App';

import 'antd/dist/reset.css';
import './index.css';

if (localStorage.getItem('token')) {
  store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem('token'))));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <StyleProvider hashPriority="low">
      <App />
    </StyleProvider>
  </Provider>
);
