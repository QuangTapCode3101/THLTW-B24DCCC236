import React, { useEffect } from 'react';
import { Modal } from 'antd';
import {
    ProForm,
    ProFormText,
    ProFormSelect,
    ProFormList,
    ProFormGroup,
    ProFormDigit,
} from '@ant-design/pro-components';
import { CUSTOMER_LIST, PRODUCT_LIST } from '../data';

interface OrderFormProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (values: any) => void;
    initialValues?: any;
}

const OrderForm: React.FC<OrderFormProps> = ({ visible, onCancel, onSubmit, initialValues }) => {
    const [form] = ProForm.useForm();

    useEffect(() => {
        if (visible) {
            if (initialValues) form.setFieldsValue(initialValues);
            else {
                form.resetFields();
                form.setFieldsValue({ items: [{}] }); // Tạo sẵn 1 dòng sản phẩm trống
            }
        }
    }, [visible, initialValues, form]);

    const calculateTotalAmount = (items: any[]) => {
        return (items || []).reduce((sum, item) => {
            return sum + (Number(item?.price) || 0) * (Number(item?.quantity) || 0);
        }, 0);
    };

    return (
        <Modal
            title={initialValues ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng'}
            visible={visible}
            onCancel={onCancel}
            onOk={() => form.submit()}
            width={850}
            destroyOnClose
            okText="Xác nhận"
            cancelText="Hủy bỏ"
        >
            <ProForm
                form={form}
                submitter={false}
                grid={true} 
                onFinish={async (values) => {
                    const customer = CUSTOMER_LIST.find((c) => c.value === values.customerId);
                    onSubmit({ ...values, customerName: customer?.label });
                }}
                onValuesChange={(_, allValues) => {

                    const total = calculateTotalAmount(allValues.items);
                    form.setFieldsValue({ totalAmount: total });
                }}
            >
                <ProFormGroup title="Thông tin cơ bản" colProps={{ md: 24 }}>
                    <ProFormText
                        name="orderId"
                        label="Mã đơn hàng"
                        colProps={{ md: 8 }}
                        placeholder="Nhập mã đơn hàng"
                        rules={[{ required: true, message: 'Vui lòng nhập mã đơn' }]}
                        disabled={!!initialValues}
                    />
                    <ProFormSelect
                        name="customerId"
                        label="Khách hàng"
                        colProps={{ md: 8 }}
                        options={CUSTOMER_LIST}
                        placeholder="Chọn khách hàng"
                        rules={[{ required: true, message: 'Vui lòng chọn khách hàng' }]}
                    />
                    <ProFormSelect
                        name="status"
                        label="Trạng thái"
                        colProps={{ md: 8 }}
                        initialValue="PENDING"
                        options={[
                            { label: 'Chờ xác nhận', value: 'PENDING' },
                            { label: 'Đang giao', value: 'SHIPPING' },
                            { label: 'Hoàn thành', value: 'COMPLETED' },
                        ]}
                    />
                </ProFormGroup>


                <ProFormList
                    name="items"
                    label="Chi tiết sản phẩm"
                    creatorButtonProps={{
                        creatorButtonText: 'Thêm sản phẩm mới',
                    }}
                    min={1}
                    copyIconProps={false}
                    itemRender={({ listDom, action }, { record }) => {
                        return (
                            <div style={{ marginBottom: 8 }}>
                                {listDom}
                            </div>
                        );
                    }}
                >
                    <ProFormGroup key="container" grid={true}>
                        <ProFormSelect
                            name="productId"
                            label="Chọn sản phẩm"
                            colProps={{ md: 10 }}
                            options={PRODUCT_LIST}
                            placeholder="Chọn sản phẩm từ danh sách"
                            rules={[{ required: true, message: 'Bắt buộc' }]}
                            onChange={(val) => {
                                const prod = PRODUCT_LIST.find((p) => p.value === val);
                                const currentItems = form.getFieldValue('items');
                                // Tìm dòng hiện tại dựa trên logic Umi ProForm
                                form.setFieldsValue({
                                    items: currentItems.map((item: any) =>
                                        item?.productId === val ? { ...item, price: prod?.price } : item
                                    ),
                                });
                            }}
                        />
                        <ProFormDigit
                            name="quantity"
                            label="Số lượng"
                            colProps={{ md: 6 }}
                            initialValue={1}
                            fieldProps={{ min: 1, style: { width: '100%' } }}
                            rules={[{ required: true }]}
                        />
                        <ProFormDigit
                            name="price"
                            label="Đơn giá"
                            colProps={{ md: 8 }}
                            disabled
                            fieldProps={{
                                formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                                addonAfter: '₫',
                                style: { width: '100%' }
                            }}
                        />
                    </ProFormGroup>
                </ProFormList>


                <ProFormGroup colProps={{ md: 24 }} style={{ marginTop: 16 }}>
                    <ProFormDigit
                        name="totalAmount"
                        label="Tổng thanh toán"
                        colProps={{ md: 24 }}
                        readonly
                        fieldProps={{
                            precision: 0,
                            formatter: (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                            addonAfter: 'VNĐ',
                            style: {
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: '#f5222d',
                                width: '100%'
                            }
                        }}
                    />
                </ProFormGroup>
            </ProForm>
        </Modal>
    );
};

export default OrderForm;