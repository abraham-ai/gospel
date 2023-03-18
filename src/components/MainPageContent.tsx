import { ConnectButton } from "@rainbow-me/rainbowkit";

import React, { useState, useContext, useEffect } from 'react';
import { ToolOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';

import { useAccount } from "wagmi";
import AppContext from 'context/AppContext'

import Account from "components/sections/Account";
import Profile from "components/sections/Profile";
// import CharacterCreator from "components/CharacterCreator"
import StoryGenerator from "components/StoryGenerator"

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const MainPageContent = () => {

  const { address, isConnected } = useAccount();
  const { isSignedIn, setIsSignedIn } = useContext(AppContext);


  const items: MenuItem[] = [
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('My account', '1'),
      ...(isConnected && isSignedIn ? [
        getItem('My creations', '2'),
      ] : []),
    ]),
    (isConnected && isSignedIn ?
      getItem('App', 'sub2', <ToolOutlined />, [
        // getItem('Character', '3'), 
        getItem('Generate story', '4'), 
      ]
    ) : null),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const {token: { colorBgContainer }} = theme.useToken();

  const handleMenuClick = (e: any) => {
    setActiveItem(e.key);
  }

  useEffect(() => {
    setActiveItem('1');
  }, [setActiveItem]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />

        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1', 'sub2']}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 16, background: colorBgContainer, marginLeft: "auto", marginRight: 20 }}>
          <ConnectButton />
        </Header>
        <Content style={{ margin: '0 16px', padding: "16px", background: colorBgContainer }}>       
          {activeItem === '1' && <Account />}
          {activeItem === '2' && <Profile />}
          
          {/* {activeItem === '3' && <CharacterCreator />} */}
          {activeItem === '4' && <StoryGenerator />}

        </Content>
        <Footer style={{ textAlign: 'center' }}></Footer>
      </Layout>
    </Layout>
  );
};

export default MainPageContent;
