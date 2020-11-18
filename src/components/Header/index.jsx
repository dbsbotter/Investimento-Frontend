import { Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { useCallback } from 'react';
import { DollarOutlined, LogoutOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Logo } from './styles';

const { Header } = Layout;

const HeaderApp = () => {
  const { signOut, user } = useAuth();
  const history = useHistory();

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  const handleCadastro = useCallback(async () => {
    history.push('/new');
  }, []);

  const handleDashboard = useCallback(async () => {
    history.push('/dashboard');
  }, []);

  return (
    <Header>
      <Logo>
        <DollarOutlined style={{ fontSize: '40px', color: '#08c' }} />
        &nbsp; Investimentos
      </Logo>
      <Menu theme="dark" mode="horizontal">
        <Menu.Item onClick={handleDashboard}>Dashboard</Menu.Item>
        <Menu.Item onClick={handleCadastro}>Cadastro</Menu.Item>

        <SubMenu
          icon={<LogoutOutlined />}
          title={user.username}
          style={{
            float: 'right',
          }}
        >
          <Menu.Item onClick={handleSignOut}>Sair</Menu.Item>
        </SubMenu>
      </Menu>
    </Header>
  );
};

export default HeaderApp;
