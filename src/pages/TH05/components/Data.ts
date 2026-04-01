export interface CauLacBo {
    id: string;
    anhDaiDien: string; 
    ten: string;
    ngayThanhLap: string;
    moTa: string;
    chuNhiem: string;
    hoatDong: boolean;
}

export interface DonDangKy {
    id: string;
    hoTen: string;
    email: string;
    sdt: string;
    gioiTinh: string;
    diaChi: string;
    soTruong: string;
    clbId: string; 
    lyDo: string;
    trangThai: 'Pending' | 'Approved' | 'Rejected';
    ghiChu: string; 
}

export interface LichSuThaoTac {
    id: string;
    thoiGian: string;
}