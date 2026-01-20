import { useState } from 'react';
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    InputNumber,
    message,
    Popconfirm,
    Space,
} from 'antd';

const initialProducts = [{ id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 10 }, { id: 2, name: 'iPhone 15 Pro Max', price: 30000000, quantity: 15 }, { id: 3, name: 'Samsung Galaxy S24', price: 22000000, quantity: 20 }, { id: 4, name: 'iPad Air M2', price: 18000000, quantity: 12 }, { id: 5, name: 'MacBook Air M3', price: 28000000, quantity: 8 },];
export default function Products() {
    const [products, setProducts] = useState(initialProducts);
    const [open, setOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form] = Form.useForm();

    /* ================= XÓA ================= */
    const handleDelete = (id) => {
        setProducts(products.filter((p) => p.id !== id));
        message.success('Đã xóa sản phẩm');
    };

    /* ================= MỞ MODAL ================= */
    const openAddModal = () => {
        setEditingProduct(null);
        form.resetFields();
        setOpen(true);
    };

    const openEditModal = (record) => {
        setEditingProduct(record);
        form.setFieldsValue(record);
        setOpen(true);
    };

    /* ================= SUBMIT FORM ================= */
    const handleSubmit = (values) => {
        if (editingProduct) {
            // UPDATE
            const newList = products.map((item) =>
                item.id === editingProduct.id
                    ? { ...item, ...values }
                    : item
            );
            setProducts(newList);
            message.success('Cập nhật sản phẩm thành công');
        } else {
            // ADD
            setProducts([
                ...products,
                { id: Date.now(), ...values },
            ]);
            message.success('Thêm sản phẩm thành công');
        }

        setOpen(false);
        form.resetFields();
    };

    /* ================= CỘT BẢNG ================= */
    const columns = [
        {
            title: 'STT',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (p) => p.toLocaleString('vi-VN') + ' ₫',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Thao tác',
            render: (_, record) => (
                <Space>
                    <Button type="link" onClick={() => openEditModal(record)}>
                        Sửa
                    </Button>

                    <Popconfirm
                        title="Xóa sản phẩm?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger type="link">
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h2>Quản lý sản phẩm</h2>

            <Button
                type="primary"
                style={{ marginBottom: 16 }}
                onClick={openAddModal}
            >
                Thêm sản phẩm
            </Button>

            <Table
                rowKey="id"
                columns={columns}
                dataSource={products}
                pagination={false}
            />

            <Modal
                title={editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
                open={open}
                onCancel={() => setOpen(false)}
                onOk={() => form.submit()}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Giá"
                        name="price"
                        rules={[{ required: true, type: 'number', min: 1 }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        rules={[{ required: true, type: 'number', min: 1 }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
