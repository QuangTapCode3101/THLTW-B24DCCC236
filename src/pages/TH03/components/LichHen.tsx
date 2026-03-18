import { useState } from 'react';
import { Table, Button, Tag, Space, Modal, Form, Input, Select, DatePicker, TimePicker, message } from 'antd';
import type { LichHen as LichHenType, NhanVien, DichVu } from './Data';

interface Props {
    danhSachNhanVien: NhanVien[];
    danhSachDichVu: DichVu[];
    lichHenList: LichHenType[];
    setLichHenList: (data: LichHenType[]) => void;
}

const LichHen = ({ danhSachNhanVien, danhSachDichVu, lichHenList, setLichHenList }: Props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const handleAddLichHen = (values: any) => {
        const { khachHang, dichVuId, nhanVienId, ngay, gio } = values;
        const ngayFormat = ngay.format('YYYY-MM-DD');
        const gioFormat = gio.format('HH:mm');
        
        const nvDuocChon = danhSachNhanVien.find(nv => nv.id === nhanVienId);
        const dvDuocChon = danhSachDichVu.find(dv => dv.id === dichVuId);

        if (!nvDuocChon || !dvDuocChon) return;

        const lichTrongNgay = lichHenList.filter(
            lh => lh.nhanVien?.id === nvDuocChon.id && lh.ngay === ngayFormat && lh.trangThai !== 'Hủy'
        );

        if (lichTrongNgay.length >= nvDuocChon.mucTieu) {
            message.error(`Nhân viên ${nvDuocChon.ten} đã nhận tối đa khách hôm nay!`);
            return;
        }

        const isTrungLich = lichTrongNgay.some(lh => lh.gio === gioFormat);
        if (isTrungLich) {
            message.error(`Giờ ${gioFormat} nhân viên ${nvDuocChon.ten} đã có khách!`);
            return;
        }

        const newLich: LichHenType = {
            id: Date.now().toString(),
            khachHang,
            dichVu: dvDuocChon,
            nhanVien: nvDuocChon,
            ngay: ngayFormat,
            gio: gioFormat,
            trangThai: 'Chờ duyệt',
            trungLich: false
        };

        setLichHenList([...lichHenList, newLich]);
        message.success('Tạo lịch hẹn thành công!');
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleDoiTrangThai = (id: string, status: 'Xác nhận' | 'Hoàn thành' | 'Hủy') => {
        setLichHenList(lichHenList.map(lh => lh.id === id ? { ...lh, trangThai: status } : lh));
        message.success(`Đã chuyển sang: ${status}`);
    };

    const columnsLichHen = [
        { title: 'Khách hàng', dataIndex: 'khachHang', key: 'khachHang' },
        { title: 'Dịch vụ', dataIndex: ['dichVu', 'ten'], key: 'dichVu' },
        { title: 'Nhân viên', dataIndex: ['nhanVien', 'ten'], key: 'nhanVien' },
        { title: 'Ngày', dataIndex: 'ngay', key: 'ngay' },
        { title: 'Giờ', dataIndex: 'gio', key: 'gio' },
        {
            title: 'Trạng thái',
            dataIndex: 'trangThai',
            key: 'trangThai',
            render: (status: string) => {
                const color = status === 'Hoàn thành' ? 'green' : status === 'Hủy' ? 'red' : 'blue';
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: LichHenType) => (
                <Space size="middle">
                    <Button size="small" type="primary" ghost onClick={() => handleDoiTrangThai(record.id, 'Xác nhận')}>Duyệt</Button>
                    <Button size="small" onClick={() => handleDoiTrangThai(record.id, 'Hoàn thành')}>Xong</Button>
                    <Button size="small" danger onClick={() => handleDoiTrangThai(record.id, 'Hủy')}>Hủy</Button>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
                + Tạo lịch hẹn mới
            </Button>
            
            <Table columns={columnsLichHen} dataSource={lichHenList} rowKey="id" />

            <Modal 
                title="Tạo lịch hẹn" 
                visible={isModalVisible} 
                onCancel={() => setIsModalVisible(false)}
                onOk={() => form.submit()}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical" onFinish={handleAddLichHen}>
                    <Form.Item name="khachHang" label="Tên khách hàng" rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="dichVuId" label="Dịch vụ" rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}>
                        <Select>
                            {danhSachDichVu.map(dv => <Select.Option key={dv.id} value={dv.id}>{dv.ten}</Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item name="nhanVienId" label="Nhân viên" rules={[{ required: true, message: 'Vui lòng chọn nhân viên!' }]}>
                        <Select>
                            {danhSachNhanVien.map(nv => <Select.Option key={nv.id} value={nv.id}>{nv.ten}</Select.Option>)}
                        </Select>
                    </Form.Item>

                    <Form.Item name="ngay" label="Ngày" rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}>
                        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                    </Form.Item>

                    <Form.Item name="gio" label="Giờ" rules={[{ required: true, message: 'Vui lòng chọn giờ!' }]}>
                        <TimePicker style={{ width: '100%' }} format="HH:mm" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default LichHen;