import React from 'react';
import { Table, Button, Space, Typography, Tag, Image, Card } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { DESTINATIONS } from '../MockData';

const { Title } = Typography;

const Admin = () => {
  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <Image src={text} width={60} style={{ borderRadius: 4 }} />,
    },
    { title: 'Tên điểm đến', dataIndex: 'name', key: 'name', fontWeight: 'bold' },
    { 
      title: 'Loại hình', 
      dataIndex: 'type', 
      key: 'type',
      render: (type) => (
        <Tag color={type === 'beach' ? 'cyan' : type === 'mountain' ? 'green' : 'orange'}>
          {type.toUpperCase()}
        </Tag>
      )
    },
    { title: 'Giá vé dự kiến', dataIndex: 'price', render: v => `${v.toLocaleString()} Đ` },
    {
      title: 'Hành động',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button icon={<EditOutlined />} type="link">Sửa</Button>
          <Button icon={<DeleteOutlined />} type="link" danger>Xóa</Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card bordered={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <Title level={3}>Quản lý dữ liệu hệ thống</Title>
          <Button type="primary" icon={<PlusOutlined />} size="large" style={{ background: '#52c41a', borderColor: '#52c41a' }}>
            Thêm điểm đến
          </Button>
        </div>
        <Table dataSource={DESTINATIONS} columns={columns} rowKey="id" />
      </Card>
    </div>
  );
};

export default Admin;