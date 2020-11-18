import React from 'react';
import { Layout } from 'antd';
import HeaderApp from '../Header';
import { Content as ContentApp } from './styles';

const { Content } = Layout;

const LayoutApp = ({ children }) => {
  return (
    <Layout className="layout">
      <HeaderApp />
      <Content style={{ padding: '0 50px' }}>
        <ContentApp>{children}</ContentApp>
      </Content>
    </Layout>
  );
};

export default LayoutApp;
