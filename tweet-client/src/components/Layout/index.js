import React, { useMemo } from 'react';
import { Layout } from 'antd';
import { blue, gray } from '@ant-design/colors';
import { Outlet } from 'react-router-dom';
import Navbar from 'components/Navbar';
import ErrorToast from 'components/ErrorToast';
import { useMediaQuery } from 'hooks/useMediaQuery';

export default function MainLayout() {
  const isMobile = useMediaQuery('(max-width: 450px)');

  const headerStyle = useMemo(
    () => ({
      width: '100%',
      height: '64px',
      color: 'white',
      lineHeight: '64px',
      backgroundColor: blue[6],
      padding: '0 50px',
      marginBottom: '24px',
      borderBottom: `1px solid ${blue[4]}`,
      boxShadow: `0 2px 8px ${gray[3]}`
    }),
    []
  );

  const footerStyle = useMemo(
    () => ({
      textAlign: 'center',
      width: '100%'
    }),
    []
  );

  const contentStyle = useMemo(
    () => ({
      height: 'calc(100vh - 64px - 69px)',
      padding: '0 50px',
      width: isMobile ? '100%' : '440px',
      margin: '0 auto',
      overflowY: 'auto'
    }),
    [isMobile]
  );

  return (
    <ErrorToast>
      <Layout>
        <Layout.Header style={headerStyle}>
          <Navbar />
        </Layout.Header>
        <Layout.Content style={contentStyle}>
          <Outlet />
        </Layout.Content>
        <Layout.Footer style={footerStyle}>this is footer</Layout.Footer>
      </Layout>
    </ErrorToast>
  );
}
