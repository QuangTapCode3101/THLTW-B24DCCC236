import { useState } from 'react';
import { Table, Button, Modal, Form, Select, Space, message } from 'antd';
import type { DonDangKy, CauLacBo } from './Data';

interface Props {
    clbList: CauLacBo[];
    donList: DonDangKy[];
    setDonList: any;
}

const QuanLyThanhVien = ({ clbList, donList, setDonList }: Props) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const thanhVienList = donList.filter(d => d.trangThai === 'Approved');

    const handleChuyenCLB = (values: any) => {
        const newClbId = values.newClbId;
        const selectedIds = selectedRowKeys as string[];

        setDonList(donList.map(d => 
            selectedIds.includes(d.id) ? { ...d, clbId: newClbId } : d
        ));

        message.success(`Đã chuyển ${selectedIds.length} thành viên sang CLB mới!`);
        setIsModalOpen(false);
        setSelectedRowKeys([]);
        form.resetFields();
    };

    const columns = [
        { title: 'Họ tên', dataIndex: 'hoTen' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'SĐT', dataIndex: 'sdt' },
        { title: 'Giới tính', dataIndex: 'gioiTinh' },
        { 
            title: 'Câu lạc bộ hiện tại', 
            dataIndex: 'clbId',
            render: (id: string) => clbList.find(c => c.id === id)?.ten || 'N/A'
        },
        {
            title: 'Thao tác',
            render: (_: any, r: DonDangKy) => (
                <Button size="small" onClick={() => {
                    setSelectedRowKeys([r.id]);
                    setIsModalOpen(true);
                }}>Đổi CLB</Button>
            )
        }
    ];

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Button 
                    type="primary" 
                    disabled={selectedRowKeys.length === 0} 
                    onClick={() => setIsModalOpen(true)}
                >
                    Đổi CLB cho {selectedRowKeys.length} thành viên đã chọn
                </Button>
            </Space>

            <Table 
                rowSelection={{
                    selectedRowKeys,
                    onChange: (keys) => setSelectedRowKeys(keys),
                }} 
                columns={columns} 
                dataSource={thanhVienList} 
                rowKey="id" 
            />

            <Modal 
                title="Chuyển Câu lạc bộ" 
                visible={isModalOpen} 
                onCancel={() => setIsModalOpen(false)} 
                onOk={() => form.submit()}
            >
                <p>Bạn đang chọn chuyển CLB cho <strong>{selectedRowKeys.length}</strong> thành viên.</p>
                <Form form={form} layout="vertical" onFinish={handleChuyenCLB}>
                    <Form.Item name="newClbId" label="Chọn Câu lạc bộ chuyển đến" rules={[{ required: true }]}>
                        <Select>
                            {clbList.map(c => <Select.Option key={c.id} value={c.id}>{c.ten}</Select.Option>)}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default QuanLyThanhVien;