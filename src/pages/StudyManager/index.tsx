import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
	Card,
	Table,
	Button,
	Tag,
	Modal,
	Form,
	Input,
	InputNumber,
	Select,
	Progress,
	Row,
	Col,
	Popconfirm,
	message,
	Statistic,
} from 'antd';
import { PlusOutlined, DeleteOutlined, BookOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { getStudyData, saveStudyData, StudySession, StudyData } from '@/services/study';

const StudyManager: React.FC = () => {
	const [data, setData] = useState<StudyData>(() => getStudyData());
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();

	useEffect(() => {
		saveStudyData(data);
	}, [data]);

	const handleAdd = (values: any) => {
		const newSession: StudySession = { ...values, id: Date.now().toString() };
		setData({ ...data, sessions: [newSession, ...data.sessions] });
		setIsModalOpen(false);
		form.resetFields();
		message.success('Đã lưu tiến độ học tập!');
	};

	const handleDelete = (id: string) => {
		setData({ ...data, sessions: data.sessions.filter((s) => s.id !== id) });
		message.success('Đã xóa buổi học');
	};

	const totalMinutes = data.sessions.reduce((acc, cur) => acc + cur.duration, 0);
	const goal = 1000;

	const columns = [
		{ title: 'Môn học', dataIndex: 'subject', key: 'subject', render: (t: string) => <Tag color='blue'>{t}</Tag> },
		{ title: 'Ngày', dataIndex: 'date', key: 'date' },
		{ title: 'Thời lượng (phút)', dataIndex: 'duration', key: 'duration' },
		{ title: 'Nội dung', dataIndex: 'content', key: 'content', ellipsis: true },
		{
			title: 'Thao tác',
			key: 'action',
			render: (_: any, record: StudySession) => (
				<Popconfirm title='Xóa dòng này?' onConfirm={() => handleDelete(record.id)}>
					<Button type='text' danger icon={<DeleteOutlined />} />
				</Popconfirm>
			),
		},
	];

	return (
		<PageContainer title='Quản lý học tập'>
			<Row gutter={[16, 16]}>
				<Col xs={24} md={8}>
					<Card bordered={false}>
						<Statistic title='Tổng thời gian học' value={totalMinutes} suffix='phút' prefix={<ClockCircleOutlined />} />
						<Progress percent={Math.min(Math.round((totalMinutes / goal) * 100), 100)} status='active' />
					</Card>
				</Col>
				<Col xs={24} md={16}>
					<Card
						title={
							<span>
								<BookOutlined /> Nhật ký học tập
							</span>
						}
						extra={
							<Button type='primary' icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
								Thêm buổi học
							</Button>
						}
					>
						<Table dataSource={data.sessions} columns={columns} rowKey='id' />
					</Card>
				</Col>
			</Row>

			<Modal
				title='Thêm buổi học'
				visible={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				onOk={() => form.submit()}
				destroyOnClose
			>
				<Form form={form} layout='vertical' onFinish={handleAdd}>
					<Form.Item name='subject' label='Môn học' rules={[{ required: true }]}>
						<Select placeholder='Chọn môn'>
							{data.categories.map((c) => (
								<Select.Option key={c} value={c}>
									{c}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item name='date' label='Ngày học' rules={[{ required: true }]}>
						<Input type='date' />
					</Form.Item>
					<Form.Item name='duration' label='Thời lượng (phút)' rules={[{ required: true }]}>
						<InputNumber style={{ width: '100%' }} min={1} />
					</Form.Item>
					<Form.Item name='content' label='Nội dung'>
						<Input.TextArea placeholder='Ghi chú nội dung đã học...' />
					</Form.Item>
				</Form>
			</Modal>
		</PageContainer>
	);
};

export default StudyManager;
