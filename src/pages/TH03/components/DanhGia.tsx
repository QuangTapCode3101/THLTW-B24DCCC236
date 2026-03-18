import { useState } from 'react';
import { Table, Button, Rate, Modal, Form, Input, Select, message, Row, Col, Card, Statistic } from 'antd';
import type { NhanVien, DanhGiaType } from './Data';



interface DanhGiaProps {
    danhSachNhanVien: NhanVien[];
}

const DanhGia = ({ danhSachNhanVien = [] }: DanhGiaProps) => {
    const [danhGiaList, setDanhGiaList] = useState<DanhGiaType[]>([]);
    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState<string>('');
    const [formReview] = Form.useForm();
    const [formReply] = Form.useForm();

    const handleAddReview = (values: any) => {
        const newReview: DanhGiaType = {
            id: Date.now().toString(),
            nhanVienId: values.nhanVienId,
            khachHang: values.khachHang,
            rating: values.rating,
            binhLuan: values.binhLuan,
            phanHoi: ''
        };
        setDanhGiaList(prev => [...prev, newReview]);
        message.success('Đánh giá thành công!');
        setIsReviewModalVisible(false);
        formReview.resetFields();
    };

    const handleReply = (values: any) => {
        setDanhGiaList(prev => prev.map(dg => dg.id === selectedReviewId ? { ...dg, phanHoi: values.phanHoi } : dg));
        message.success('Đã gửi phản hồi!');
        setIsReplyModalVisible(false);
        formReply.resetFields();
    };

    const openReplyModal = (id: string) => {
        setSelectedReviewId(id);
        setIsReplyModalVisible(true);
    };

    const getDiemTrungBinh = (nhanVienId: string) => {
        const list = danhGiaList.filter(dg => dg.nhanVienId === nhanVienId);
        if (list.length === 0) return 0;
        const sum = list.reduce((acc, dg) => acc + dg.rating, 0);
        return (sum / list.length).toFixed(1);
    };

    const columns = [
        { title: 'Khách hàng', dataIndex: 'khachHang', key: 'khachHang' },
        {
            title: 'Nhân viên',
            key: 'nhanVien',
            render: (_: any, record: DanhGiaType) => danhSachNhanVien.find(nv => nv.id === record.nhanVienId)?.ten || 'Không rõ'
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating: number) => <Rate disabled defaultValue={rating} />
        },
        { title: 'Bình luận', dataIndex: 'binhLuan', key: 'binhLuan' },
        { title: 'Phản hồi từ NV', dataIndex: 'phanHoi', key: 'phanHoi' },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: DanhGiaType) => (
                <Button type="link" onClick={() => openReplyModal(record.id)} disabled={!!record.phanHoi}>
                    Phản hồi
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Row gutter={16} style={{ marginBottom: 20 }}>
                {danhSachNhanVien.map(nv => (
                    <Col span={6} key={nv.id}>
                        <Card>
                            <Statistic 
                                title={`Điểm TB: ${nv.ten}`} 
                                value={getDiemTrungBinh(nv.id)} 
                                suffix="/ 5 ⭐" 
                                valueStyle={{ color: '#cf1322' }} 
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Button type="primary" onClick={() => setIsReviewModalVisible(true)} style={{ marginBottom: 16 }}>
                + Thêm đánh giá
            </Button>
            
            <Table columns={columns} dataSource={danhGiaList} rowKey="id" />

            <Modal
                title="Đánh giá dịch vụ"
                visible={isReviewModalVisible}
                onCancel={() => setIsReviewModalVisible(false)}
                onOk={() => formReview.submit()}
                okText="Gửi đánh giá"
                cancelText="Hủy"
            >
                <Form form={formReview} layout="vertical" onFinish={handleAddReview}>
                    <Form.Item name="khachHang" label="Tên khách hàng" rules={[{ required: true, message: 'Nhập tên khách hàng!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="nhanVienId" label="Nhân viên phục vụ" rules={[{ required: true, message: 'Chọn nhân viên!' }]}>
                        <Select>
                            {danhSachNhanVien.map(nv => <Select.Option key={nv.id} value={nv.id}>{nv.ten}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item name="rating" label="Điểm số" rules={[{ required: true, message: 'Vui lòng chọn số sao!' }]}>
                        <Rate />
                    </Form.Item>
                    <Form.Item name="binhLuan" label="Bình luận">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Phản hồi đánh giá"
                visible={isReplyModalVisible}
                onCancel={() => setIsReplyModalVisible(false)}
                onOk={() => formReply.submit()}
                okText="Gửi phản hồi"
                cancelText="Hủy"
            >
                <Form form={formReply} layout="vertical" onFinish={handleReply}>
                    <Form.Item name="phanHoi" label="Nội dung phản hồi" rules={[{ required: true, message: 'Nhập nội dung!' }]}>
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DanhGia;