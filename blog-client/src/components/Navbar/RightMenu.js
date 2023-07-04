import React from 'react';
import { Menu, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RightMenu = ({ mode }) => {
  const { user } = useSelector(state => state.currentUser);
  return (
    <Menu mode={mode}>
      <Menu.SubMenu
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            <span className="username">{user.name}</span>
          </>
        }
      >
        {user.name ? (
          <>
            <Menu.Item key="log-out">
              <LogoutOutlined /> Log out
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key="log-in">
              <UserOutlined /> <Link to="login">Log in</Link>
            </Menu.Item>
            <Menu.Item key="sign-up">
              <UserOutlined /> <Link to="signup">Sign up</Link>
            </Menu.Item>
          </>
        )}
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
