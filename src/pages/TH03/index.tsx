import { Tabs } from 'antd';
import { useState, useEffect } from 'react';
import NhanVienVaDichVu from './components/NhanVienVaDichVu';
import LichHen from './components/LichHen';
import DanhGia from './components/DanhGia';
import ThongKeBaoCao from './components/ThongKeVaBaoCao';
import { danhSachDichVu } from './components/Data';

const App = () => {
    const [danhSachNhanVien, setDanhSachNhanVien] = useState(() => {
        const saved = localStorage.getItem('danhSachNhanVien');
        return saved ? JSON.parse(saved) : [];
    });

    const [lichHenList, setLichHenList] = useState(() => {
        const saved = localStorage.getItem('lichHenList');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('danhSachNhanVien', JSON.stringify(danhSachNhanVien));
    }, [danhSachNhanVien]);

    useEffect(() => {
        localStorage.setItem('lichHenList', JSON.stringify(lichHenList));
    }, [lichHenList]);

    return (
        <Tabs>
            <Tabs.TabPane tab="Nhân viên và Dịch vụ" key="item-1">
                <NhanVienVaDichVu 
                    danhSachNhanVien={danhSachNhanVien} 
                    setDanhSachNhanVien={setDanhSachNhanVien} 
                    danhSachDichVu={danhSachDichVu}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Lịch hẹn" key="item-2">
                <LichHen 
                    danhSachNhanVien={danhSachNhanVien} 
                    danhSachDichVu={danhSachDichVu}
                    lichHenList={lichHenList}
                    setLichHenList={setLichHenList}
                />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đánh giá" key="item-3">
                <DanhGia danhSachNhanVien={danhSachNhanVien} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Thống kê & Báo cáo" key="item-4">
                <ThongKeBaoCao lichHenList={lichHenList} />
            </Tabs.TabPane>
        </Tabs>
    );
};

export default App;