import React, { useState, useEffect } from 'react';
import { Card, Alert, Typography, Row, Col } from 'antd';
import BangDieuKhien from './components/BangDieuKhien';
import DanhSachLichSu from './components/DanhSachLichSu';

const { Text } = Typography;

interface KieuLuotDoan {
  soDoan: number;
  ketQua: string;
}

const Bai1_DoanSo: React.FC = () => {
  const [soNgauNhien, datSoNgauNhien] = useState<number>(0);
  const [soNhap, datSoNhap] = useState<number | null>(null);
  const [lichSu, datLichSu] = useState<KieuLuotDoan[]>([]);
  const [trangThai, datTrangThai] = useState<'dang_choi' | 'thang' | 'thua'>('dang_choi');

  const batDauLai = () => {
    datSoNgauNhien(Math.floor(Math.random() * 100) + 1);
    datLichSu([]);
    datTrangThai('dang_choi');
    datSoNhap(null);
  };

  useEffect(() => {
    batDauLai();
  }, []);

  const xuLyKiemTra = () => {
    if (soNhap === null || trangThai !== 'dang_choi') return;

    let ketQua = '';
    // ĐÃ SỬA LỖI TYPESCRIPT: Khai báo rõ ràng 3 trạng thái có thể xảy ra
    let trangThaiMoi: 'dang_choi' | 'thang' | 'thua' = trangThai;

    if (soNhap === soNgauNhien) {
      ketQua = 'Chúc mừng! Bạn đã đoán đúng!';
      trangThaiMoi = 'thang';
    } else if (soNhap < soNgauNhien) {
      ketQua = 'Bạn đoán quá thấp!';
    } else {
      ketQua = 'Bạn đoán quá cao!';
    }

    const lichSuMoi = [...lichSu, { soDoan: soNhap, ketQua }];
    datLichSu(lichSuMoi);
    datSoNhap(null);

    // Kiểm tra nếu đoán sai đủ 10 lần thì thua
    if (trangThaiMoi === 'dang_choi' && lichSuMoi.length >= 10) {
      trangThaiMoi = 'thua';
    }

    datTrangThai(trangThaiMoi);
  };

  return (
    <Card title="Trò Chơi Đoán Số (1 - 100)" style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <Row justify="center">
        <Col xs={24} md={16} lg={12}>
          {trangThai === 'thang' && <Alert message="Tuyệt vời! Bạn đã chiến thắng" type="success" showIcon style={{ marginBottom: 20 }} />}
          {trangThai === 'thua' && <Alert message={`Bạn đã hết 10 lượt! Số bí mật là: ${soNgauNhien}`} type="error" showIcon style={{ marginBottom: 20 }} />}

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Text strong style={{ fontSize: '16px' }}>Số lượt còn lại: <Text type="danger">{10 - lichSu.length}</Text></Text>
          </div>

          <BangDieuKhien 
            soNhap={soNhap} datSoNhap={datSoNhap} 
            xuLyKiemTra={xuLyKiemTra} 
            trangThai={trangThai} batDauLai={batDauLai} 
          />
          <DanhSachLichSu lichSu={lichSu} />
        </Col>
      </Row>
    </Card>
  );
};

export default Bai1_DoanSo;