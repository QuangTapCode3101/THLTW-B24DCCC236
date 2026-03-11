import React, { useState } from 'react';
import { Layout, Menu, Typography, Avatar, Space } from 'antd';
import { DashboardOutlined, PlayCircleOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';
import Bai1_DoanSo from './Bai1';
import Bai2_QuanLyHocTap from './Bai2';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const MainLayout: React.FC = () => {
  const [mucDangChon, datMucDangChon] = useState('bai2');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* SIDEBAR BÊN TRÁI */}
      <Sider width={250} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #f0f0f0', marginBottom: '10px' }}>
          <Title level={4} style={{ color: '#d9363e', margin: 0 }}>
            <img src="https://portal.ptit.edu.vn/wp-content/uploads/2016/04/ptit-logo.png" alt="logo" style={{ width: 30, marginRight: 10, verticalAlign: 'middle' }} />
            LẬP TRÌNH WEB - RIPT
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[mucDangChon]}
          onClick={(e) => datMucDangChon(e.key)}
          style={{ borderRight: 0 }}
          items={[
            { key: 'trangchu', icon: <DashboardOutlined />, label: 'Trang chủ' },
            { type: 'divider' },
            { key: 'bai1', icon: <PlayCircleOutlined />, label: 'TroChoiDoanSo (Bài 1)' },
            { key: 'bai2', icon: <CheckCircleOutlined style={{ color: '#d9363e' }} />, label: <span style={{ color: '#d9363e' }}>QuanLyTienDo (Bài 2)</span> },
          ]}
        />
      </Sider>

      {/* NỘI DUNG BÊN PHẢI */}
      <Layout>
        {/* HEADER */}
        <Header style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Space>
            <Avatar icon={<UserOutlined />} />
            <Text strong>B24DCCC020 - GIÁP VĂN HIẾU</Text>
          </Space>
        </Header>

        {/* PHẦN CONTENT ĐỂ RENDER 2 BÀI */}
        <Content style={{ margin: '24px', background: '#f0f2f5' }}>
          {mucDangChon === 'bai1' && <Bai1_DoanSo />}
          {mucDangChon === 'bai2' && <Bai2_QuanLyHocTap />}
          {mucDangChon === 'trangchu' && <div style={{ textAlign: 'center', marginTop: 50 }}><Title level={3}>Chào mừng đến với bài thực hành TH01</Title></div>}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;