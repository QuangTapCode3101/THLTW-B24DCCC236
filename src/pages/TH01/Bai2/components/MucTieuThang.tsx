import React from 'react';
import { Card, Table, Button, Progress, Tag, Typography, Space } from 'antd';
import { AimOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { KieuMonHoc, KieuMucTieu, KieuNhatKy } from '../types';

const { Text } = Typography;

interface ThuoctinhMucTieu {
  danhSachMucTieu: KieuMucTieu[]; 
  danhSachMon: KieuMonHoc[]; 
  nhatKyHocTap: KieuNhatKy[];
  moModal: (loai: 'mucTieu', duLieu?: any) => void; 
  xoaMucTieu: (id: string) => void;
}

const MucTieuThang: React.FC<ThuoctinhMucTieu> = ({ danhSachMucTieu, danhSachMon, nhatKyHocTap, moModal, xoaMucTieu }) => {
  const thangHienTai = new Date().toISOString().slice(0, 7);
  
  const layTienDo = (idMon: string, phutMucTieu: number) => {
    const tongPhut = nhatKyHocTap
      .filter(nk => idMon === 'ALL' || nk.idMon === idMon)
      .reduce((tong, nk) => tong + nk.thoiLuong, 0);
    const phanTram = Math.min(Math.round((tongPhut / phutMucTieu) * 100), 100);
    return { tongPhut, phanTram };
  };

  const cotMucTieu = [
    { 
      title: 'Mục Tiêu Cho', dataIndex: 'idMon', align: 'center' as const, width: '25%',
      render: (id: string) => {
        if (id === 'ALL') return <Tag color="purple" style={{ fontWeight: 'bold' }}>TỔNG TẤT CẢ CÁC MÔN</Tag>;
        const mon = danhSachMon.find(m => m.id === id);
        return <Tag color="cyan">{mon?.tenMon || 'Không rõ'}</Tag>;
      } 
    },
    { 
      title: 'Tiến Độ', key: 'tienDo', align: 'center' as const, width: '40%',
      render: (_: any, banGhi: KieuMucTieu) => {
        const { tongPhut, phanTram } = layTienDo(banGhi.idMon, banGhi.phutMucTieu);
        return (
          <div style={{ textAlign: 'center', padding: '0 20px' }}>
            <Progress percent={phanTram} size="small" strokeColor={phanTram >= 100 ? "#52c41a" : "#d9363e"} />
            <Text type="secondary" style={{ fontSize: '12px' }}>{tongPhut} / {banGhi.phutMucTieu} phút</Text>
          </div>
        );
    }},
    { 
      title: 'Trạng Thái', key: 'trangThai', align: 'center' as const, width: '15%',
      render: (_: any, banGhi: KieuMucTieu) => {
        const { phanTram } = layTienDo(banGhi.idMon, banGhi.phutMucTieu);
        return phanTram >= 100 ? <Tag color="success">HOÀN THÀNH</Tag> : <Tag color="warning">CHƯA ĐẠT</Tag>;
    }},
    { 
      title: 'Thao tác', key: 'hanhDong', align: 'center' as const, width: '20%',
      render: (_: any, banGhi: KieuMucTieu) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} style={{ color: '#1890ff' }} onClick={() => moModal('mucTieu', banGhi)}>Sửa</Button>
          <Button type="text" danger icon={<DeleteOutlined />} onClick={() => xoaMucTieu(banGhi.id)}>Xóa</Button>
        </Space>
      ) 
    }
  ];

  return (
    <Card title={<span><AimOutlined /> Mục Tiêu Tháng {thangHienTai}</span>} extra={<Button type="primary" style={{ backgroundColor: '#d9363e', borderColor: '#d9363e' }} icon={<PlusOutlined />} onClick={() => moModal('mucTieu')}>Đặt Mục Tiêu</Button>} style={{ marginBottom: '24px', borderRadius: '8px' }}>
      <Table bordered dataSource={danhSachMucTieu} columns={cotMucTieu} rowKey="id" pagination={false} size="middle" />
    </Card>
  );
};

export default MucTieuThang;