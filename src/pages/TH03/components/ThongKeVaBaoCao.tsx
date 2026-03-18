import { useMemo } from 'react';
import { Card, Col, Row, Statistic, Table } from 'antd';
import type { LichHen as LichHenType } from './Data';

interface ThongKeProps {
    lichHenList: LichHenType[];
}

const ThongKeBaoCao = ({ lichHenList = [] }: ThongKeProps) => {
    const thongKe = useMemo(() => {
        const tongLich = lichHenList.length;
        const lichHoanThanh = lichHenList.filter(lh => lh.trangThai === 'Hoàn thành');
        
        const tongDoanhThu = lichHoanThanh.reduce((sum, lh) => sum + (lh.dichVu?.gia || 0), 0);

        const mapNhanVien: Record<string, { ten: string; doanhThu: number; soKhach: number }> = {};
        const mapDichVu: Record<string, { ten: string; doanhThu: number; soLuot: number }> = {};

        lichHoanThanh.forEach(lh => {
            const nv = lh.nhanVien;
            if (nv) {
                if (!mapNhanVien[nv.id]) mapNhanVien[nv.id] = { ten: nv.ten, doanhThu: 0, soKhach: 0 };
                mapNhanVien[nv.id].doanhThu += (lh.dichVu?.gia || 0);
                mapNhanVien[nv.id].soKhach += 1;
            }

            const dv = lh.dichVu;
            if (dv) {
                if (!mapDichVu[dv.id]) mapDichVu[dv.id] = { ten: dv.ten, doanhThu: 0, soLuot: 0 };
                mapDichVu[dv.id].doanhThu += dv.gia;
                mapDichVu[dv.id].soLuot += 1;
            }
        });

        return {
            tongLich,
            soLichHoanThanh: lichHoanThanh.length,
            tongDoanhThu,
            doanhThuNhanVien: Object.values(mapNhanVien),
            doanhThuDichVu: Object.values(mapDichVu)
        };
    }, [lichHenList]);

    const columnsNhanVien = [
        { title: 'Nhân viên', dataIndex: 'ten', key: 'ten' },
        { title: 'Số khách phục vụ', dataIndex: 'soKhach', key: 'soKhach' },
        { 
            title: 'Doanh thu (VNĐ)', 
            dataIndex: 'doanhThu', 
            key: 'doanhThu',
            render: (val: number) => val.toLocaleString()
        },
    ];

    const columnsDichVu = [
        { title: 'Dịch vụ', dataIndex: 'ten', key: 'ten' },
        { title: 'Số lượt đặt', dataIndex: 'soLuot', key: 'soLuot' },
        { 
            title: 'Doanh thu (VNĐ)', 
            dataIndex: 'doanhThu', 
            key: 'doanhThu',
            render: (val: number) => val.toLocaleString()
        },
    ];

    return (
        <div>
            <Row gutter={16} style={{ marginBottom: 20 }}>
                <Col span={8}>
                    <Card>
                        <Statistic title="Tổng lịch hẹn" value={thongKe.tongLich} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Lịch hẹn hoàn thành" value={thongKe.soLichHoanThanh} valueStyle={{ color: '#3f8600' }} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Tổng doanh thu (VNĐ)" value={thongKe.tongDoanhThu} />
                    </Card>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Card title="Thống kê theo Nhân viên">
                        <Table columns={columnsNhanVien} dataSource={thongKe.doanhThuNhanVien} rowKey="ten" pagination={false} />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title="Thống kê theo Dịch vụ">
                        <Table columns={columnsDichVu} dataSource={thongKe.doanhThuDichVu} rowKey="ten" pagination={false} />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ThongKeBaoCao;