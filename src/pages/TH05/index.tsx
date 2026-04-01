import { Tabs } from 'antd';
import { useState, useEffect } from 'react';
import QuanLyCauLacBo from './components/QuanLyCauLacBo';
import QuanLyDonDangKy from './components/QuanLyDonDangKy';
import QuanLyThanhVien from './components/QuanLyThanhVien';
import BaoCaoThongKe from './components/BaoCaoThongKe';

const App = () => {
    const useLocalStorage = (key: string, initialValue: any) => {
        const [state, setState] = useState(() => {
            const saved = localStorage.getItem(key);
            return saved ? JSON.parse(saved) : initialValue;
        });
        useEffect(() => {
            localStorage.setItem(key, JSON.stringify(state));
        }, [state]);
        return [state, setState];
    };

    const [clbList, setClbList] = useLocalStorage('clbList', []);
    const [donList, setDonList] = useLocalStorage('donList', []);
    const [lichSuList, setLichSuList] = useLocalStorage('lichSuList', []);

    return (
        <Tabs>
            <Tabs.TabPane tab="Danh sách CLB" key="1">
                <QuanLyCauLacBo clbList={clbList} setClbList={setClbList} donList={donList} setDonList={setDonList}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đơn đăng ký" key="2">
                { <QuanLyDonDangKy clbList={clbList} donList={donList} setDonList={setDonList} lichSuList={lichSuList} setLichSuList={setLichSuList} />}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Thành viên CLB" key="3">
                <QuanLyThanhVien clbList={clbList} donList={donList} setDonList={setDonList} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Báo cáo Thống kê" key="4">
                <BaoCaoThongKe clbList={clbList} donList={donList} />
            </Tabs.TabPane>
        </Tabs>
    );
};

export default App;