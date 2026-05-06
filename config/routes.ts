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
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},

	{
		path: '/todo-list',
		name: 'TodoList',
		icon: 'OrderedListOutlined',
		component: './TodoList',
	},

	///////////////////////////////////
	{
		path: '/th09',
		name: 'TH09',
		icon: 'ProjectOutlined',
		routes: [
			{
				path: '/th09',
				redirect: '/th09/dashboard',
			},
			{
				path: '/th09/dashboard',
				name: 'Dashboard',
				icon: 'DashboardOutlined',
				component: './TH09/Dashboard',
			},
			{
				path: '/th09/kanban',
				name: 'Kanban Board',
				icon: 'ProfileOutlined',
				component: './TH09/Kanban',
			},
			{
				path: '/th09/tasks',
				name: 'Danh sách Task',
				icon: 'TableOutlined',
				component: './TH09/TaskList',
			},
		],
	},

	///////////////////////////////////
	// NOTIFICATION
	{
		path: '/notification',
		layout: false,
		hideInMenu: true,
		routes: [
			{
				path: '/notification/subscribe',
				component: './ThongBao/Subscribe',
			},
			{
				path: '/notification/check',
				component: './ThongBao/Check',
			},
			{
				path: '/notification',
				component: './ThongBao/NotifOneSignal',
			},
		],
	},

	///////////////////////////////////
	// EXCEPTION
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