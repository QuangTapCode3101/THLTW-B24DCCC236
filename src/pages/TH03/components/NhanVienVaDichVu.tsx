import { Button, Modal, Table, Form, Input, InputNumber, Select, Space } from 'antd';
import { useState } from 'react';
import type { NhanVien, DichVu } from './Data';
import { dichVuColumns } from './Data';

interface Props {
    danhSachNhanVien: NhanVien[];
    setDanhSachNhanVien: (data: NhanVien[]) => void;
    danhSachDichVu: DichVu[];
}

const NhanVienVaDichVu = (props: Props ) => {
    const {danhSachNhanVien, danhSachDichVu, setDanhSachNhanVien} = props;
    const [openModal, setOpenModal] = useState(false);
    const [thongTinNhap, setThongTinNhap] = useState({ id: '', ten: '', mucTieu: 0 , lichLamViec: '' });
    const [thaoTac, setThaoTac] = useState('');

    const showModal = () => setOpenModal(true);
    const closeModal = () => {
        setOpenModal(false);
        setThaoTac('');
        setThongTinNhap({ id: '', ten: '', mucTieu: 0 , lichLamViec: '' });
    };

    const handleAddNhanVien = () => {
        const newNhanVien: NhanVien = {
            id: thongTinNhap.id, ten: thongTinNhap.ten,
            mucTieu: thongTinNhap.mucTieu, lichLamViec: thongTinNhap.lichLamViec,
        };
        setDanhSachNhanVien([...danhSachNhanVien, newNhanVien]);
        closeModal();
    };

    const handleDeleteNhanVien = (id: string) => {
        setDanhSachNhanVien(danhSachNhanVien.filter(nv => nv.id !== id));
    };

    const handleUpdateNhanVien = () => {
        setDanhSachNhanVien(danhSachNhanVien.map(nv => nv.id === thongTinNhap.id ? { ...thongTinNhap } : nv));
        closeModal();
    };

    const columns = [
        { title: 'Mã nhân viên', dataIndex: 'id', key: 'id' },
        { title: 'Tên nhân viên', dataIndex: 'ten', key: 'ten' },
        { title: 'Số khách/ngày', dataIndex: 'mucTieu', key: 'mucTieu' },
        { title: 'Lịch làm việc', dataIndex: 'lichLamViec', key: 'lichLamViec' },
        {
            title:'Thao tác',
            key: 'action',
            render: (_: any, record: NhanVien) => (
                <Space>
                    <Button type='primary' danger onClick={() => handleDeleteNhanVien(record.id)}>Xóa</Button>
                    <Button style={{ backgroundColor: '#f6e230' }} onClick={() => {
                        setThaoTac('sua'); setThongTinNhap(record); showModal();
                    }}>Sửa</Button>
                </Space>
            ),
        }
    ];

    return (
        <>
            <h1>Danh sách dịch vụ</h1>
            <Table dataSource={danhSachDichVu} columns={dichVuColumns} bordered rowKey='id' />
            <hr />
            <h1>Danh sách nhân viên</h1>
            <Button type='primary' onClick={() => { setThaoTac('them'); showModal(); }}>
                Thêm nhân viên
            </Button>
            <Table dataSource={danhSachNhanVien} columns={columns} bordered rowKey='id' />
            
            <Modal title={thaoTac === 'them' ? 'Thêm nhân viên' : 'Sửa nhân viên'} 
                visible={openModal} onCancel={closeModal} 
                footer={<>
                    {thaoTac === 'them' ? <Button type='primary' onClick={handleAddNhanVien}>Thêm</Button> 
                    : <Button onClick={handleUpdateNhanVien} type='primary' >Sửa</Button>}
                </>} closable centered>
                <Form>
                    <Form.Item label='Mã NV'>
                        <Input value={thongTinNhap.id} disabled={thaoTac === 'sua'} onChange={(e) => setThongTinNhap({...thongTinNhap, id: e.target.value})} />
                    </Form.Item>
                    <Form.Item label='Tên NV'>
                        <Input value={thongTinNhap.ten} onChange={(e) => setThongTinNhap({...thongTinNhap, ten: e.target.value})} />
                    </Form.Item>
                    <Form.Item label='Mục tiêu khách/ngày'>
                        <InputNumber value={thongTinNhap.mucTieu} onChange={(val) => setThongTinNhap({...thongTinNhap, mucTieu: val || 0})} />
                    </Form.Item>
                    <Form.Item label='Lịch làm việc'>
                        <Select value={thongTinNhap.lichLamViec || 'Chọn lịch'} options={
                            [{ label: 'Ca sáng', value: 'Ca sáng (8h-12h)' }, { label: 'Ca chiều', value: 'Ca chiều (13h-17h)' }, { label: 'Ca tối', value: 'Ca tối (18h-22h)' }]
                        } onChange={(val) => setThongTinNhap({...thongTinNhap, lichLamViec: val})} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default NhanVienVaDichVu;