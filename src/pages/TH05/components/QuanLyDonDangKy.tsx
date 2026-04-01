import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, Tag, message } from 'antd';
import type { DonDangKy, CauLacBo, LichSuThaoTac } from './Data';

interface Props {
    clbList: CauLacBo[];
    donList: DonDangKy[];
    setDonList: any;
    lichSuList: LichSuThaoTac[];
    setLichSuList: any;
}

const QuanLyDonDangKy = ({ clbList, donList, setDonList, lichSuList, setLichSuList }: Props) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    
    const [thaoTac, setThaoTac] = useState<'them' | 'sua'>('them');
    const [editingId, setEditingId] = useState('');
    const [rejectingIds, setRejectingIds] = useState<string[]>([]);
    
    const [form] = Form.useForm();
    const [rejectForm] = Form.useForm();

    const ghiLichSu = (hanhDong: string) => {
        const now = new Date();
        const thoiGian = `${now.getHours()}h${now.getMinutes()} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
        setLichSuList([{ id: Date.now().toString(), thoiGian, hanhDong }, ...lichSuList]);
    };

    const handleSaveForm = (values: any) => {
        if (thaoTac === 'them') {
            const newDon: DonDangKy = { ...values, id: Date.now().toString(), trangThai: 'Pending', ghiChu: '' };
            setDonList([...donList, newDon]);
            ghiLichSu(`Tạo mới đơn đăng ký cho ${values.hoTen}`);
        } else {
            setDonList(donList.map(d => d.id === editingId ? { ...d, ...values } : d));
            ghiLichSu(`Cập nhật đơn đăng ký của ID: ${editingId}`);
        }
        setIsFormModalOpen(false);
    };

    const handleDelete = (id: string) => {
        setDonList(donList.filter(d => d.id !== id));
        ghiLichSu(`Xóa đơn đăng ký ID: ${id}`);
    };

    const openFormModal = (record?: DonDangKy) => {
        if (record) {
            setThaoTac('sua');
            setEditingId(record.id);
            form.setFieldsValue(record);
        } else {
            setThaoTac('them');
            form.resetFields();
        }
        setIsFormModalOpen(true);
    };

    const handleApprove = (ids: string[]) => {
        setDonList(donList.map(d => ids.includes(d.id) ? { ...d, trangThai: 'Approved', ghiChu: '' } : d));
        ghiLichSu(`Admin đã Approved đơn của ${ids.length} ứng viên`);
        setSelectedRowKeys([]);
        message.success(`Đã duyệt ${ids.length} đơn!`);
    };

    const handleReject = (values: any) => {
        setDonList(donList.map(d => rejectingIds.includes(d.id) ? { ...d, trangThai: 'Rejected', ghiChu: values.lyDo } : d));
        ghiLichSu(`Admin đã Rejected ${rejectingIds.length} đơn với lý do: ${values.lyDo}`);
        setIsRejectModalOpen(false);
        setSelectedRowKeys([]);
        rejectForm.resetFields();
        message.success(`Đã từ chối ${rejectingIds.length} đơn!`);
    };

    const columns = [
        { title: 'Họ tên', dataIndex: 'hoTen' },
        { title: 'SĐT', dataIndex: 'sdt' },
        { 
            title: 'Câu lạc bộ', 
            dataIndex: 'clbId',
            render: (id: string) => clbList.find(c => c.id === id)?.ten || 'N/A'
        },
        { 
            title: 'Trạng thái', 
            dataIndex: 'trangThai',
            render: (stt: string) => (
                <Tag color={stt === 'Approved' ? 'green' : stt === 'Rejected' ? 'red' : 'gold'}>{stt}</Tag>
            )
        },
        { title: 'Ghi chú', dataIndex: 'ghiChu' },
        {
            title: 'Thao tác',
            render: (_: any, r: DonDangKy) => (
                <Space>
                    <Button size="small" onClick={() => openFormModal(r)}>Sửa</Button>
                    {r.trangThai === 'Pending' && (
                        <>
                            <Button size="small" type="primary" ghost onClick={() => handleApprove([r.id])}>Duyệt</Button>
                            <Button size="small" danger onClick={() => { setRejectingIds([r.id]); setIsRejectModalOpen(true); }}>Từ chối</Button>
                        </>
                    )}
                    <Button size="small" danger onClick={() => handleDelete(r.id)}>Xóa</Button>
                </Space>
            )
        }
    ];

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={() => openFormModal()}>+ Thêm đơn mới</Button>
                <Button onClick={() => setIsHistoryModalOpen(true)}>Xem lịch sử thao tác</Button>
                
                {selectedRowKeys.length > 0 && (
                    <>
                        <Button type="primary" ghost onClick={() => handleApprove(selectedRowKeys as string[])}>
                            Duyệt {selectedRowKeys.length} đơn
                        </Button>
                        <Button danger onClick={() => { setRejectingIds(selectedRowKeys as string[]); setIsRejectModalOpen(true); }}>
                            Từ chối {selectedRowKeys.length} đơn
                        </Button>
                    </>
                )}
            </Space>

            <Table 
                rowSelection={{
                    selectedRowKeys,
                    onChange: (keys) => setSelectedRowKeys(keys),
                    getCheckboxProps: (record) => ({ disabled: record.trangThai !== 'Pending' })
                }} 
                columns={columns} 
                dataSource={donList} 
                rowKey="id" 
            />

            <Modal title={thaoTac === 'them' ? 'Thêm đơn đăng ký' : 'Sửa đơn đăng ký'} visible={isFormModalOpen} onCancel={() => setIsFormModalOpen(false)} onOk={() => form.submit()}>
                <Form form={form} layout="vertical" onFinish={handleSaveForm}>
                    <Space style={{ display: 'flex' }} align="baseline">
                        <Form.Item name="hoTen" label="Họ tên" rules={[{ required: true }]}><Input /></Form.Item>
                        <Form.Item name="gioiTinh" label="Giới tính"><Select options={[{value: 'Nam', label: 'Nam'}, {value: 'Nữ', label: 'Nữ'}]} /></Form.Item>
                    </Space>
                    <Space style={{ display: 'flex' }} align="baseline">
                        <Form.Item name="sdt" label="SĐT"><Input /></Form.Item>
                        <Form.Item name="email" label="Email"><Input /></Form.Item>
                    </Space>
                    <Form.Item name="diaChi" label="Địa chỉ"><Input /></Form.Item>
                    <Form.Item name="soTruong" label="Sở trường"><Input /></Form.Item>
                    <Form.Item name="clbId" label="Chọn CLB" rules={[{ required: true }]}>
                        <Select>
                            {clbList.map(c => <Select.Option key={c.id} value={c.id}>{c.ten}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item name="lyDo" label="Lý do đăng ký"><Input.TextArea /></Form.Item>
                </Form>
            </Modal>

            <Modal title="Lý do từ chối" visible={isRejectModalOpen} onCancel={() => setIsRejectModalOpen(false)} onOk={() => rejectForm.submit()}>
                <Form form={rejectForm} layout="vertical" onFinish={handleReject}>
                    <Form.Item name="lyDo" label="Nhập lý do bắt buộc" rules={[{ required: true }]}>
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Lịch sử thao tác" visible={isHistoryModalOpen} onCancel={() => setIsHistoryModalOpen(false)} footer={null}>
                <Table 
                    columns={[{ title: 'Thời gian', dataIndex: 'thoiGian' }, { title: 'Hành động', dataIndex: 'hanhDong' }]} 
                    dataSource={lichSuList} 
                    rowKey="id" 
                    pagination={{ pageSize: 5 }}
                />
            </Modal>
        </div>
    );
};
export default QuanLyDonDangKy;