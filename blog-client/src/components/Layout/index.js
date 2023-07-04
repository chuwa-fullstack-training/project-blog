import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import { blue, gray } from '@ant-design/colors';

const headerStyle = {
  width: '100%',
  height: '64px',
  color: 'white',
  lineHeight: '64px',
  backgroundColor: blue[6],
  padding: '0 50px',
  marginBottom: '24px',
  borderBottom: `1px solid ${blue[4]}`,
  boxShadow: `0 2px 8px ${gray[3]}`
};

const footerStyle = {
  textAlign: 'center',
  width: '100%',
  position: 'fixed',
  bottom: 0
};

const contentStyle = {
  height: 'calc(100vh - 64px - 69px)',
  padding: '0 50px',
  maxWidth: '360px',
  width: '60%',
  margin: '0 auto'
};

export default function MainLayout() {
  return (
    <Layout>
      <Layout.Header style={headerStyle}>
        <Navbar />
      </Layout.Header>
      <Layout.Content style={contentStyle}>
        <Outlet />
      </Layout.Content>
      <Layout.Footer style={footerStyle}>this is footer</Layout.Footer>
    </Layout>
  );
}
