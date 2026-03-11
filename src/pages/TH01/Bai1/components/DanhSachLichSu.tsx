import React from 'react';
import { List, Typography } from 'antd';

const { Text } = Typography;

interface KieuLuotDoan {
  soDoan: number;
  ketQua: string;
}

interface ThuocTinhDanhSach {
  lichSu: KieuLuotDoan[];
}

const DanhSachLichSu: React.FC<ThuocTinhDanhSach> = ({ lichSu }) => {
  if (lichSu.length === 0) return null;

  return (
    <List
      size="small"
      bordered
      dataSource={lichSu}
      renderItem={(item, index) => (
        <List.Item>
          <Text>
            Lần {index + 1}: Bạn đoán <b>{item.soDoan}</b> - <Text type={item.ketQua.includes('đúng') ? 'success' : 'warning'}>{item.ketQua}</Text>
          </Text>
        </List.Item>
      )}
      style={{ textAlign: 'left', marginTop: '20px', borderRadius: '8px', backgroundColor: '#fff' }}
    />
  );
};

export default DanhSachLichSu;