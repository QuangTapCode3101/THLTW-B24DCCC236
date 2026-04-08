export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	
	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },
	{
    path: '/th06',
    name: 'TH06 - Ứng dụng Du lịch',
    icon: 'smile',
    routes: [
      { path: '/th06', redirect: '/th06/explore' },
      {
        path: '/th06/explore',
        name: 'Khám phá điểm đến',
        component: './TH06/Explore/index', // Thêm /index vào đây
      },
      {
        path: '/th06/planner',
        name: 'Tạo lịch trình',
        component: './TH06/Planner/index', // Thêm /index vào đây
      },
      {
        path: '/th06/budget',
        name: 'Quản lý ngân sách',
        component: './TH06/Budget/index', // Thêm /index vào đây
      },
      {
        path: '/th06/admin',
        name: 'Trang quản trị',
        component: './TH06/Admin/index', // Thêm /index vào đây
      },
    ],
  },
	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
