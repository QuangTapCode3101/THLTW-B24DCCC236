import React, { useState, useRef } from 'react';
import { Button, message, Popconfirm } from 'antd';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import OrderForm from './components/OrderForm';
import { OrderEntity, CUSTOMER_LIST } from './data';

const OrderList: React.FC = () => {
    const [dataSource, setDataSource] = useState<OrderEntity[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentRow, setCurrentRow] = useState<OrderEntity | undefined>();
    const actionRef = useRef<ActionType>();

    // Xử lý Hủy đơn hàng
    const handleCancelOrder = (orderId: string) => {
        const updatedData = dataSource.map((item) => {
            if (item.orderId === orderId) {
                return { ...item, status: 'CANCELLED' as any };
            }
            return item;
        });
        setDataSource(updatedData);
        message.success('Đã hủy đơn hàng thành công');
    };

    const customerEnum = (CUSTOMER_LIST || []).reduce((acc, cur) => {
        acc[cur.value] = { text: cur.label };
        return acc;
    }, {} as Record<string, { text: string }>);

    const columns: ProColumns<OrderEntity>[] = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderId',
            copyable: true,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customerId',
            valueEnum: customerEnum,
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'orderDate',
            valueType: 'dateTime',
            hideInSearch: true,
            sorter: (a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime(),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalAmount',
            valueType: 'money',
            hideInSearch: true,
            sorter: (a, b) => a.totalAmount - b.totalAmount,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            valueEnum: {
                PENDING: { text: 'Chờ xác nhận', status: 'Warning' },
                SHIPPING: { text: 'Đang giao', status: 'Processing' },
                COMPLETED: { text: 'Hoàn thành', status: 'Success' },
                CANCELLED: { text: 'Hủy', status: 'Error' },
            },
        },
        {
            title: 'Thao tác',
            valueType: 'option',
            render: (_, record) => [
                <a
                    key="edit"
                    onClick={() => {
                        setCurrentRow(record);
                        setModalVisible(true);
                    }}
                >
                    Sửa
                </a>,
                record.status === 'PENDING' && (
                    <Popconfirm
                        key="cancel"
                        title="Bạn có chắc chắn muốn hủy đơn hàng này?"
                        onConfirm={() => handleCancelOrder(record.orderId)}
                        okText="Đồng ý"
                        cancelText="Không"
                    >
                        <a style={{ color: 'red' }}>Hủy đơn</a>
                    </Popconfirm>
                ),
            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable<OrderEntity>
                headerTitle="Hệ thống Quản lý Đơn hàng"
                actionRef={actionRef}
                rowKey="orderId"
                search={{ labelWidth: 'auto' }}

                // LOGIC TÌM KIẾM TẠI ĐÂY
                params={{ dataSource }} // Theo dõi khi dữ liệu thêm/xóa/sửa
                request={async (params) => {
                    let filteredData = [...dataSource];

                    // Lọc theo Mã đơn hàng (nếu người dùng nhập)
                    if (params.orderId) {
                        filteredData = filteredData.filter((item) =>
                            item.orderId.toLowerCase().includes(params.orderId.toLowerCase())
                        );
                    }

                    // Lọc theo Khách hàng (nếu người dùng chọn)
                    if (params.customerId) {
                        filteredData = filteredData.filter((item) => item.customerId === params.customerId);
                    }

                    // Lọc theo Trạng thái (nếu người dùng chọn)
                    if (params.status) {
                        filteredData = filteredData.filter((item) => item.status === params.status);
                    }

                    return {
                        data: filteredData,
                        success: true,
                    };
                }}

                columns={columns}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => {
                            setCurrentRow(undefined);
                            setModalVisible(true);
                        }}
                    >
                        <PlusOutlined /> Thêm mới đơn hàng
                    </Button>,
                ]}
            />

            <OrderForm
                visible={modalVisible}
                initialValues={currentRow}
                onCancel={() => {
                    setModalVisible(false);
                    setCurrentRow(undefined);
                }}
                onSubmit={(values) => {
                    if (currentRow) {
                        const newData = dataSource.map((item) =>
                            item.orderId === currentRow.orderId ? { ...item, ...values } : item,
                        );
                        setDataSource(newData);
                        message.success('Cập nhật thành công');
                    } else {
                        if (dataSource.some((item) => item.orderId === values.orderId)) {
                            message.error('Lỗi: Mã đơn hàng đã tồn tại!');
                            return;
                        }
                        const newOrder = {
                            ...values,
                            orderDate: new Date().toISOString(),
                        };
                        setDataSource([...dataSource, newOrder]);
                        message.success('Thêm mới thành công');
                    }
                    setModalVisible(false);
                    setCurrentRow(undefined);
                }}
            />
        </PageContainer>
    );
};

export default OrderList;