import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import { KieuMonHoc } from '../types';

interface ThuocTinhModal {
  loai: 'monHoc' | 'nhatKy' | 'mucTieu' | null;
  duLieuSua: any;
  danhSachMon: KieuMonHoc[];
  dongModal: () => void;
  xacNhanLuu: (loai: 'monHoc' | 'nhatKy' | 'mucTieu', duLieu: any) => void;
}

const ModalThemMoi: React.FC<ThuocTinhModal> = ({ loai, duLieuSua, danhSachMon, dongModal, xacNhanLuu }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (loai) {
      if (duLieuSua) form.setFieldsValue(duLieuSua);
      else form.resetFields();
    }
  }, [loai, duLieuSua, form]);

  const layTieuDe = () => {
    const hanhDong = duLieuSua ? 'Cập Nhật' : 'Thêm';
    if (loai === 'monHoc') return `${hanhDong} Môn Học`;
    if (loai === 'nhatKy') return `${hanhDong} Tiến Độ / Lịch Học`;
    return `${hanhDong} Mục Tiêu Tháng`;
  };

  return (
    <Modal title={layTieuDe()} visible={!!loai} onCancel={dongModal} onOk={() => form.submit()} destroyOnClose>
      <Form form={form} layout="vertical" onFinish={(values) => xacNhanLuu(loai!, values)}>
        
        {loai === 'monHoc' && (
          <Form.Item name="tenMon" label="Tên môn học" rules={[{ required: true, message: 'Nhập tên môn' }]}>
            <Input placeholder="Toán, Văn, Anh..." />
          </Form.Item>
        )}

        {loai === 'nhatKy' && (
          <>
            <Form.Item name="idMon" label="Môn học" rules={[{ required: true, message: 'Chọn môn học' }]}>
              <Select placeholder="-- Chọn môn --">
                {danhSachMon.map(m => <Select.Option key={m.id} value={m.id}>{m.tenMon}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item name="thoiGian" label="Thời gian học (Ngày và Giờ)" rules={[{ required: true, message: 'Chọn thời gian' }]}>
              <Input type="datetime-local" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="thoiLuong" label="Thời lượng (Phút)" rules={[{ required: true, message: 'Nhập thời lượng' }]}>
              <InputNumber min={5} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="noiDung" label="Nội dung đã học" rules={[{ required: true, message: 'Nhập nội dung' }]}>
              <Input.TextArea rows={2} />
            </Form.Item>
            <Form.Item name="ghiChu" label="Ghi chú"><Input /></Form.Item>
          </>
        )}

        {loai === 'mucTieu' && (
          <>
            <Form.Item name="idMon" label="Thiết lập mục tiêu cho" rules={[{ required: true, message: 'Chọn môn học' }]}>
              <Select placeholder="-- Chọn phạm vi --">
                <Select.Option value="ALL" style={{ fontWeight: 'bold', color: '#722ed1' }}>Tổng thời lượng trong tháng</Select.Option>
                {danhSachMon.map(m => <Select.Option key={m.id} value={m.id}>{m.tenMon}</Select.Option>)}
              </Select>
            </Form.Item>
            <Form.Item name="phutMucTieu" label="Mục tiêu thời lượng (Phút)" rules={[{ required: true, message: 'Nhập mục tiêu' }]}>
              <InputNumber min={30} style={{ width: '100%' }} />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};
export default ModalThemMoi;