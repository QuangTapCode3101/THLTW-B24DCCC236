import { Row, Col, Card, Statistic, Tooltip } from 'antd';
import type { DonDangKy, CauLacBo } from './Data';

interface Props {
    clbList: CauLacBo[];
    donList: DonDangKy[];
}

const BaoCaoThongKe = ({ clbList, donList }: Props) => {
    const tongCLB = clbList.length;
    const tongPending = donList.filter(d => d.trangThai === 'Pending').length;
    const tongApproved = donList.filter(d => d.trangThai === 'Approved').length;
    const tongRejected = donList.filter(d => d.trangThai === 'Rejected').length;

    const chartData = clbList.map(clb => {
        const donCuaCLB = donList.filter(d => d.clbId === clb.id);
        return {
            name: clb.ten,
            Pending: donCuaCLB.filter(d => d.trangThai === 'Pending').length,
            Approved: donCuaCLB.filter(d => d.trangThai === 'Approved').length,
            Rejected: donCuaCLB.filter(d => d.trangThai === 'Rejected').length,
        };
    });

    const maxVal = Math.max(...chartData.map(d => Math.max(d.Pending, d.Approved, d.Rejected)), 1);

    return (
        <div>
            <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col span={6}>
                    <Card><Statistic title="Tổng số CLB" value={tongCLB} /></Card>
                </Col>
                <Col span={6}>
                    <Card><Statistic title="Đơn Pending" value={tongPending} valueStyle={{ color: '#faad14' }} /></Card>
                </Col>
                <Col span={6}>
                    <Card><Statistic title="Đơn Approved" value={tongApproved} valueStyle={{ color: '#52c41a' }} /></Card>
                </Col>
                <Col span={6}>
                    <Card><Statistic title="Đơn Rejected" value={tongRejected} valueStyle={{ color: '#f5222d' }} /></Card>
                </Col>
            </Row>

            <Card title="Biểu đồ số lượng đơn đăng ký theo Câu lạc bộ">
                <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 20 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 16, height: 16, backgroundColor: '#faad14', borderRadius: 2 }} /> Chờ duyệt
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 16, height: 16, backgroundColor: '#52c41a', borderRadius: 2 }} /> Đã duyệt
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 16, height: 16, backgroundColor: '#f5222d', borderRadius: 2 }} /> Từ chối
                    </span>
                </div>

                <div style={{ 
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', 
                    height: 300, borderBottom: '2px solid #f0f0f0', borderLeft: '2px solid #f0f0f0', 
                    paddingBottom: 10, paddingTop: 20 
                }}>
                    {chartData.map((data, index) => (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%' }}>
                            
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 250, width: '100%', justifyContent: 'center' }}>
                                <Tooltip title={`Chờ duyệt: ${data.Pending}`}>
                                    <div style={{ width: '25%', maxWidth: 30, backgroundColor: '#faad14', height: `${(data.Pending / maxVal) * 100}%`, transition: 'height 0.3s', borderRadius: '4px 4px 0 0' }} />
                                </Tooltip>
                                <Tooltip title={`Đã duyệt: ${data.Approved}`}>
                                    <div style={{ width: '25%', maxWidth: 30, backgroundColor: '#52c41a', height: `${(data.Approved / maxVal) * 100}%`, transition: 'height 0.3s', borderRadius: '4px 4px 0 0' }} />
                                </Tooltip>
                                <Tooltip title={`Từ chối: ${data.Rejected}`}>
                                    <div style={{ width: '25%', maxWidth: 30, backgroundColor: '#f5222d', height: `${(data.Rejected / maxVal) * 100}%`, transition: 'height 0.3s', borderRadius: '4px 4px 0 0' }} />
                                </Tooltip>
                            </div>

                            <div style={{ fontSize: 12, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 90 }} title={data.name}>
                                {data.name}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default BaoCaoThongKe;