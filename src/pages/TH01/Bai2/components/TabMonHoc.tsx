import React from 'react';
import { Table, Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { KieuMonHoc } from '../types';

interface ThuocTinhMonHoc { 
  danhSachMon: KieuMonHoc[]; 
  moModal: (loai: 'monHoc', duLieu?: any) => void; 
  xoaMonHoc: (id: string) => void; 
}

const TabMonHoc: React.FC<ThuocTinhMonHoc> = ({ danhSachMon, moModal, xoaMonHoc }) => {
  const cotBang = [
    { title: 'Tên Môn Học', dataIndex: 'tenMon', key: 'tenMon' },
    { title: 'Thao tác', key: 'hanhDong', align: 'center' as const, width: 200, render: (_: any, banGhi: KieuMonHoc) => (
      <Space size="middle">
        <Button type="text" icon={<EditOutlined />} style={{ color: '#1890ff' }} onClick={() => moModal('monHoc', banGhi)}>Sửa</Button>
        <Button danger type="text" icon={<DeleteOutlined />} onClick={() => xoaMonHoc(banGhi.id)}>Xóa</Button>
      </Space>
    )}
  ];

  return (
    <>
      <Button type="primary" style={{ backgroundColor: '#d9363e', borderColor: '#d9363e', marginBottom: 16 }} icon={<PlusOutlined />} onClick={() => moModal('monHoc')}>Thêm Môn Mới</Button>
      <Table bordered dataSource={danhSachMon} columns={cotBang} rowKey="id" size="middle" />
    </>
  );
};

export default TabMonHoc;