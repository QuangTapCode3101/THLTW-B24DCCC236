import React from 'react';
import { Space, InputNumber, Button } from 'antd';
import { ReloadOutlined, CheckCircleOutlined } from '@ant-design/icons';

interface ThuocTinhBangDieuKhien {
  soNhap: number | null;
  datSoNhap: (so: number | null) => void;
  xuLyKiemTra: () => void;
  trangThai: 'dang_choi' | 'thang' | 'thua';
  batDauLai: () => void;
}

const BangDieuKhien: React.FC<ThuocTinhBangDieuKhien> = ({ soNhap, datSoNhap, xuLyKiemTra, trangThai, batDauLai }) => {
  return (
    <Space direction="vertical" style={{ width: '100%', textAlign: 'center' }} size="large">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <InputNumber
          min={1}
          max={100}
          value={soNhap}
          onChange={datSoNhap}
          disabled={trangThai !== 'dang_choi'}
          placeholder="Nhập số dự đoán (1-100)..."
          style={{ width: '60%', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          onPressEnter={xuLyKiemTra}
          size="large"
        />
        <Button 
          type="primary" 
          size="large" 
          onClick={xuLyKiemTra} 
          disabled={trangThai !== 'dang_choi' || !soNhap} 
          style={{ 
            backgroundColor: '#d9363e', 
            borderColor: '#d9363e', 
            borderTopLeftRadius: 0, 
            borderBottomLeftRadius: 0 
          }} 
          icon={<CheckCircleOutlined />}
        >
          Đoán
        </Button>
      </div>

      <Button onClick={batDauLai} icon={<ReloadOutlined />}>Chơi Lại Từ Đầu</Button>
    </Space>
  );
};

export default BangDieuKhien;