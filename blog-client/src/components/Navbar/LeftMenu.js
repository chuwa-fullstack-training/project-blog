import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="create-message">
        <Link to="/new-message">Create Message</Link>
      </Menu.Item>
      {/* <Menu.Item key="contact">Contact Us</Menu.Item> */}
    </Menu>
  );
};

export default LeftMenu;
