import { Table, Button, Space, Input, Tag, Popconfirm } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import { getTasks, saveTasks } from '@/utils/taskStorage';
import TaskModalForm from '@/components/TaskModalForm';
import { Task } from '@/types/task';
import { v4 as uuidv4 } from 'uuid';
import styles from './index.less';

export default function TaskList() {
    const [tasks, setTasks] = useState<Task[]>(getTasks());
    const [filtered, setFiltered] = useState<Task[]>(tasks);
    const [visible, setVisible] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const refresh = (data: Task[]) => {
        setTasks(data);
        setFiltered(data);
        saveTasks(data);
    };

    const handleDelete = (id: string) => {
        refresh(tasks.filter(t => t.id !== id));
    };

    const handleSubmit = (values: any) => {
        const newTask: Task = {
            ...values,
            id: editingTask ? editingTask.id : uuidv4(),
            deadline: values.deadline.format('YYYY-MM-DD'),
            status: editingTask ? editingTask.status : 'todo',
            createdAt: editingTask ? editingTask.createdAt : new Date().toISOString(),
        };

        let updated;
        if (editingTask) {
            updated = tasks.map(t => (t.id === editingTask.id ? newTask : t));
        } else {
            updated = [...tasks, newTask];
        }

        refresh(updated);
        setVisible(false);
        setEditingTask(null);
    };

    const columns = [
        { title: 'Tên', dataIndex: 'title' },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            sorter: (a: Task, b: Task) =>
                dayjs(a.deadline).unix() - dayjs(b.deadline).unix(),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            filters: [
                { text: 'Cần làm', value: 'todo' },
                { text: 'Đang làm', value: 'inprogress' },
                { text: 'Hoàn thành', value: 'done' },
            ],
            onFilter: (value: any, record: Task) => record.status === value,
        },
        {
            title: 'Ưu tiên',
            dataIndex: 'priority',
            render: (p: string) => (
                <Tag color={p === 'high' ? 'red' : p === 'medium' ? 'orange' : 'green'}>
                    {p}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            render: (_: any, record: Task) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => {
                            setEditingTask(record);
                            setVisible(true);
                        }}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xóa task?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger type="link">
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Space style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    onClick={() => {
                        setEditingTask(null);
                        setVisible(true);
                    }}
                >
                    Thêm Task
                </Button>

                <Input.Search
                    placeholder="Tìm theo tên"
                    onChange={(e) =>
                        setFiltered(
                            tasks.filter(t =>
                                t.title.toLowerCase().includes(e.target.value.toLowerCase())
                            )
                        )
                    }
                />
            </Space>

            <Table
                rowKey="id"
                columns={columns}
                dataSource={filtered}
                rowClassName={(record) =>
                    dayjs(record.deadline).isBefore(dayjs()) &&
                        record.status !== 'done'
                        ? styles.overdueRow
                        : ''
                }
            />
            <TaskModalForm
                visible={visible}
                editingTask={editingTask}
                onCancel={() => setVisible(false)}
                onSubmit={handleSubmit}
            />
        </>
    );
}