import React, { useState, useEffect } from 'react';
import { Card, Tabs } from 'antd';
import { KieuMonHoc, KieuNhatKy, KieuMucTieu } from './types';
import MucTieuThang from './components/MucTieuThang';
import TabMonHoc from './components/TabMonHoc';
import TabNhatKy from './components/TabNhatKy';
import ModalThemMoi from './components/ModalThemMoi';

const { TabPane } = Tabs;

const danhMucMacDinh: KieuMonHoc[] = [
  { id: 'M1', tenMon: 'Toán' }, { id: 'M2', tenMon: 'Văn' }, { id: 'M3', tenMon: 'Anh' },
  { id: 'M4', tenMon: 'Khoa học' }, { id: 'M5', tenMon: 'Công nghệ' }
];

const Bai2_QuanLyHocTap: React.FC = () => {
  const [danhSachMon, datDanhSachMon] = useState<KieuMonHoc[]>([]);
  const [nhatKyHocTap, datNhatKyHocTap] = useState<KieuNhatKy[]>([]);
  const [danhSachMucTieu, datDanhSachMucTieu] = useState<KieuMucTieu[]>([]);
  
  const [loaiModal, datLoaiModal] = useState<'monHoc' | 'nhatKy' | 'mucTieu' | null>(null);
  const [duLieuSua, datDuLieuSua] = useState<any>(null);

  useEffect(() => {
    const dataMon = localStorage.getItem('DATA_MON');
    const dataNhatKy = localStorage.getItem('DATA_NHAT_KY');
    const dataMucTieu = localStorage.getItem('DATA_MUC_TIEU');

    // Nạp danh mục mặc định nếu chưa có dữ liệu
    if (dataMon) datDanhSachMon(JSON.parse(dataMon));
    else datDanhSachMon(danhMucMacDinh); 
    
    if (dataNhatKy) datNhatKyHocTap(JSON.parse(dataNhatKy));
    if (dataMucTieu) datDanhSachMucTieu(JSON.parse(dataMucTieu));
  }, []);

  const luuLocal = (key: string, data: any, setter: any) => {
    setter(data);
    localStorage.setItem(key, JSON.stringify(data));
  };

  const moModal = (loai: 'monHoc' | 'nhatKy' | 'mucTieu', duLieu?: any) => {
    datLoaiModal(loai);
    datDuLieuSua(duLieu || null);
  };

  const xacNhanLuuDuLieu = (loai: 'monHoc' | 'nhatKy' | 'mucTieu', values: any) => {
    const isSua = !!duLieuSua;
    if (loai === 'monHoc') {
      const newData = isSua ? danhSachMon.map(m => m.id === duLieuSua.id ? { ...m, ...values } : m) 
                            : [...danhSachMon, { id: `M_${Date.now()}`, ...values }];
      luuLocal('DATA_MON', newData, datDanhSachMon);
    } else if (loai === 'nhatKy') {
      const newData = isSua ? nhatKyHocTap.map(nk => nk.id === duLieuSua.id ? { ...nk, ...values } : nk)
                            : [...nhatKyHocTap, { id: `NK_${Date.now()}`, ...values }];
      luuLocal('DATA_NHAT_KY', newData, datNhatKyHocTap);
    } else if (loai === 'mucTieu') {
      const newData = isSua ? danhSachMucTieu.map(mt => mt.id === duLieuSua.id ? { ...mt, ...values } : mt)
                            : [...danhSachMucTieu, { id: `MT_${Date.now()}`, ...values }];
      luuLocal('DATA_MUC_TIEU', newData, datDanhSachMucTieu);
    }
    datLoaiModal(null);
  };

  const xoaMonHoc = (id: string) => luuLocal('DATA_MON', danhSachMon.filter(m => m.id !== id), datDanhSachMon);
  const xoaNhatKy = (id: string) => luuLocal('DATA_NHAT_KY', nhatKyHocTap.filter(nk => nk.id !== id), datNhatKyHocTap);
  const xoaMucTieu = (id: string) => luuLocal('DATA_MUC_TIEU', danhSachMucTieu.filter(m => m.id !== id), datDanhSachMucTieu);

  return (
    <>
      <MucTieuThang danhSachMucTieu={danhSachMucTieu} danhSachMon={danhSachMon} nhatKyHocTap={nhatKyHocTap} xoaMucTieu={xoaMucTieu} moModal={moModal} />
      
      <Card style={{ borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }} bodyStyle={{ padding: '0 24px 24px 24px' }}>
        <Tabs defaultActiveKey="2" style={{ marginTop: '16px' }}>
          <TabPane tab="Quản Lý Danh Mục Môn" key="1">
            <TabMonHoc danhSachMon={danhSachMon} moModal={moModal} xoaMonHoc={xoaMonHoc} />
          </TabPane>
          <TabPane tab={<span style={{ color: '#d9363e', fontWeight: 'bold' }}>Nhật Ký Học Tập</span>} key="2">
            <TabNhatKy nhatKyHocTap={nhatKyHocTap} danhSachMon={danhSachMon} moModal={moModal} xoaNhatKy={xoaNhatKy} />
          </TabPane>
        </Tabs>
      </Card>

      <ModalThemMoi loai={loaiModal} duLieuSua={duLieuSua} danhSachMon={danhSachMon} dongModal={() => datLoaiModal(null)} xacNhanLuu={xacNhanLuuDuLieu} />
    </>
  );
};

export default Bai2_QuanLyHocTap;