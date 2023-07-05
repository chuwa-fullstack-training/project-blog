import { notification } from 'antd';
import { createContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Context = createContext('Default');

const Notification = ({ children }) => {
  const { message } = useSelector(state => state.error);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.error({
      message: 'Error happened',
      description: <Context.Consumer>{message => message}</Context.Consumer>,
      placement: 'topRight'
    });
  };

  useEffect(() => {
    if (message) {
      openNotification();
    }
  }, [message]);

  return (
    <Context.Provider value={message}>
      {contextHolder}
      {children}
    </Context.Provider>
  );
};

export default Notification;
