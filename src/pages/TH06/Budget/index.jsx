import React from 'react';
import { Table, Typography, Alert } from 'antd';
import { DESTINATIONS } from '../MockData';

const Budget = () => {
  const columns = [
    { title: 'Hạng mục', dataIndex: 'name', key: 'name' },
    { title: 'Ăn uống', dataIndex: ['costs', 'food'], render: v => v?.toLocaleString() },
    { title: 'Di chuyển', dataIndex: ['costs', 'transport'], render: v => v?.toLocaleString() },
    { title: 'Lưu trú', dataIndex: ['costs', 'stay'], render: v => v?.toLocaleString() },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Typography.Title level={3}>Phân bổ ngân sách</Typography.Title>
      <Alert message="Lưu ý: Ngân sách được tính dựa trên chi phí trung bình hàng ngày." type="info" showIcon style={{ marginBottom: 20 }} />
      <Table dataSource={DESTINATIONS} columns={columns} rowKey="id" pagination={false} />
    </div>
  );
};

export default Budget;