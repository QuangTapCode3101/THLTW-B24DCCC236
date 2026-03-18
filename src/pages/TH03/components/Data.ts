export interface NhanVien {
    id: string;
    ten: string;
    mucTieu: number; // So khch hang can phuc vu/ ngay
    lichLamViec: string;
}
export interface DichVu {
    id: string; 
    ten: string;
    gia: number; 
    gioLamViec: string;
}

export interface LichHen {
    id: string;             
    khachHang: string;      
    dichVu: DichVu;         
    ngay: string;
    gio: string;
    nhanVien: NhanVien;
    trungLich: boolean;
    trangThai: 'Chờ duyệt' | 'Xác nhận' | 'Hoàn thành' | 'Hủy';
}

export interface DanhGiaType {
    id: string;
    nhanVienId: string;
    khachHang: string;
    rating: number;
    binhLuan: string;
    phanHoi: string;
}

export const dichVuColumns = [
        {
            title: 'Tên dịch vụ',
            dataIndex: 'ten',
            key: 'ten',
        },
        {
            title: 'Giờ làm việc',
            dataIndex: 'gioLamViec',
            key: 'gioLamViec',
        },
    ];

export const danhSachDichVu: DichVu[] = [
    {
        id: 'dv1',
        ten: 'Cắt tóc', 
        gia: 100000,
        gioLamViec: '8:00 - 17:00',

    },
    {
        id: 'dv2',
        ten: 'Gội đầu', 
        gia: 50000,
        gioLamViec: '8:00 - 17:00',
    },
    {
        id: 'dv3',
        ten: 'Nhuộm tóc',
        gia: 200000,
        gioLamViec: '9:00 - 18:00',
    },
];
