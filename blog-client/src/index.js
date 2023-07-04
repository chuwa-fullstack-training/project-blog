import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { StyleProvider } from '@ant-design/cssinjs';
import App from './App';

import 'antd/dist/reset.css';
import './index.css';

import { configureStore } from './store';

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <StyleProvider hashPriority="low">
      <App />
    </StyleProvider>
  </Provider>
);
