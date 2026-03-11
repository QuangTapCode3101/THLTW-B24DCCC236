import React, { useState } from 'react';
import { Table, Button, Row, Col, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { KieuNhatKy, KieuMonHoc } from '../types';

interface ThuocTinhNhatKy { 
  nhatKyHocTap: KieuNhatKy[]; 
  danhSachMon: KieuMonHoc[]; 
  moModal: (loai: 'nhatKy', duLieu?: any) => void; 
  xoaNhatKy: (id: string) => void; 
}

const TabNhatKy: React.FC<ThuocTinhNhatKy> = ({ nhatKyHocTap, danhSachMon, moModal, xoaNhatKy }) => {
  const [tuKhoa, datTuKhoa] = useState('');
  const duLieuHienThi = nhatKyHocTap.filter(nk => nk.noiDung.toLowerCase().includes(tuKhoa.toLowerCase()));

  const cotBang = [
    { title: 'Môn Học', dataIndex: 'idMon', align: 'center' as const, width: '15%', render: (id: string) => danhSachMon.find(m => m.id === id)?.tenMon || '-' },
    { title: 'Ngày Giờ Học', dataIndex: 'thoiGian', align: 'center' as const, width: '15%', render: (text: string) => new Date(text).toLocaleString('vi-VN') },
    { title: 'Thời Lượng', dataIndex: 'thoiLuong', align: 'center' as const, width: '10%', render: (phut: number) => `${phut} phút` },
    { title: 'Nội Dung', dataIndex: 'noiDung', width: '25%' },
    { title: 'Ghi Chú', dataIndex: 'ghiChu', width: '15%' },
    { title: 'Thao tác', key: 'hanhDong', align: 'center' as const, width: '20%', render: (_: any, banGhi: KieuNhatKy) => (
      <Space size="middle">
        <Button type="text" icon={<EditOutlined />} style={{ color: '#1890ff' }} onClick={() => moModal('nhatKy', banGhi)}>Sửa</Button>
        <Button danger type="text" icon={<DeleteOutlined />} onClick={() => xoaNhatKy(banGhi.id)}>Xóa</Button>
      </Space>
    )}
  ];

  return (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col><Button type="primary" style={{ backgroundColor: '#d9363e', borderColor: '#d9363e' }} icon={<PlusOutlined />} onClick={() => moModal('nhatKy')}>Ghi Lịch Học Mới</Button></Col>
        <Col><Input prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} placeholder="Tìm nội dung..." style={{ width: 250 }} onChange={(e) => datTuKhoa(e.target.value)} /></Col>
      </Row>
      <Table bordered dataSource={duLieuHienThi} columns={cotBang} rowKey="id" size="middle" />
    </>
  );
};

export default TabNhatKy;