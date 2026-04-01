import { useState } from 'react';
import { Table, Button, Modal, Form, Input, Switch, DatePicker, Space, Avatar, Tag, message } from 'antd';
import dayjs from 'dayjs';
import type { CauLacBo, DonDangKy } from './Data';

const { confirm } = Modal;

interface Props {
    clbList: CauLacBo[];
    setClbList: any;
    donList: DonDangKy[];
    setDonList: any;
}

const QuanLyCauLacBo = ({ clbList, setClbList, donList, setDonList }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [thaoTac, setThaoTac] = useState<'them' | 'sua'>('them');
    const [editingId, setEditingId] = useState('');
    const [form] = Form.useForm();
    
    const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
    const [selectedClbId, setSelectedClbId] = useState('');

    const openModal = (record?: CauLacBo) => {
        if (record) {
            setThaoTac('sua');
            setEditingId(record.id);
            form.setFieldsValue({ ...record, ngayThanhLap: dayjs(record.ngayThanhLap) });
        } else {
            setThaoTac('them');
            form.resetFields();
            form.setFieldsValue({ hoatDong: true });
        }
        setIsOpen(true);
    };

    const handleSave = (values: any) => {
        const payload = { ...values, ngayThanhLap: values.ngayThanhLap.format('YYYY-MM-DD') };
        if (thaoTac === 'them') {
            setClbList([...clbList, { ...payload, id: Date.now().toString() }]);
        } else {
            setClbList(clbList.map(c => c.id === editingId ? { ...c, ...payload } : c));
        }
        setIsOpen(false);
    };

    const handleDelete = (clb: CauLacBo) => {
        confirm({
            title: `Bạn có chắc chắn muốn xóa CLB ${clb.ten}?`,
            content: 'Lưu ý: Tất cả thành viên và đơn đăng ký thuộc CLB này cũng sẽ bị xóa vĩnh viễn.',
            okText: 'Xác nhận xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                setClbList(clbList.filter(c => c.id !== clb.id));
                setDonList(donList.filter(d => d.clbId !== clb.id));
                message.success('Đã xóa câu lạc bộ và các dữ liệu liên quan.');
            },
        });
    };

    const openMemberModal = (clbId: string) => {
        setSelectedClbId(clbId);
        setIsMemberModalOpen(true);
    };

    const dsThanhVien = donList.filter(d => d.clbId === selectedClbId && d.trangThai === 'Approved');

    const columnsCLB = [
        { title: 'Ảnh', dataIndex: 'anhDaiDien', render: (url: string) => <Avatar src={url} /> },
        { title: 'Tên CLB', dataIndex: 'ten', sorter: (a: CauLacBo, b: CauLacBo) => a.ten.localeCompare(b.ten) },
        { title: 'Chủ nhiệm', dataIndex: 'chuNhiem' },
        { title: 'Ngày thành lập', dataIndex: 'ngayThanhLap', render: (text: string) => text ? dayjs(text).format('DD/MM/YYYY') : '' },
        { title: 'Trạng thái', dataIndex: 'hoatDong', render: (act: boolean) => act ? <Tag color="blue">Đang hoạt động</Tag> : <Tag color="default">Đã đóng</Tag> },
        {
            title: 'Thao tác',
            render: (_: any, r: CauLacBo) => (
                <Space>
                    <Button onClick={() => openMemberModal(r.id)}>Xem thành viên</Button>
                    <Button onClick={() => openModal(r)}>Sửa</Button>
                    <Button danger onClick={() => handleDelete(r)}>Xóa</Button>
                </Space>
            )
        }
    ];

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={() => openModal()}>+ Thêm CLB</Button>
            </Space>

            <Table columns={columnsCLB} dataSource={clbList} rowKey="id" />

            <Modal title={thaoTac === 'them' ? 'Thêm CLB' : 'Sửa CLB'} visible={isOpen} onCancel={() => setIsOpen(false)} onOk={() => form.submit()}>
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item name="anhDaiDien" label="Link ảnh đại diện"><Input /></Form.Item>
                    <Form.Item name="ten" label="Tên Câu lạc bộ" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="chuNhiem" label="Chủ nhiệm" rules={[{ required: true }]}><Input /></Form.Item>
                    <Form.Item name="ngayThanhLap" label="Ngày thành lập" rules={[{ required: true }]}><DatePicker style={{ width: '100%' }} format='DD/MM/YYYY' /></Form.Item>
                    <Form.Item name="moTa" label="Mô tả (HTML)"><Input.TextArea rows={4} /></Form.Item>
                    <Form.Item name="hoatDong" label="Đang hoạt động" valuePropName="checked"><Switch /></Form.Item>
                </Form>
            </Modal>

            <Modal 
                title={`Thành viên CLB: ${clbList.find(c => c.id === selectedClbId)?.ten || ''}`} 
                visible={isMemberModalOpen} 
                onCancel={() => setIsMemberModalOpen(false)} 
                footer={null} 
                width={800}
            >
                <Table 
                    columns={[
                        { title: 'Họ tên', dataIndex: 'hoTen' }, 
                        { title: 'Email', dataIndex: 'email' }, 
                        { title: 'SĐT', dataIndex: 'sdt' }
                    ]} 
                    dataSource={dsThanhVien} 
                    rowKey="id" 
                    locale={{ emptyText: 'Câu lạc bộ này chưa có thành viên nào.' }}
                />
            </Modal>
        </div>
    );
};

export default QuanLyCauLacBo;