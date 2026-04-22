import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Popconfirm, Space, Tag, message } from 'antd';
import PostForm from '../components/PostForm';
import { Post } from '../interfaces/Post';
import { initialPosts } from '../data/mockData';

const Admin: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const saved = localStorage.getItem('blog_posts');
    setPosts(saved ? JSON.parse(saved) : initialPosts);
  }, []);

  const saveToLocal = (newPosts: Post[]) => {
    setPosts(newPosts);
    localStorage.setItem('blog_posts', JSON.stringify(newPosts));
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editing) {
        const newData = posts.map(p => p.id === editing.id ? { ...editing, ...values } : p);
        saveToLocal(newData);
        message.success('Cập nhật thành công');
      } else {
        const newPost = { ...values, id: Date.now().toString(), views: 0, date: new Date().toLocaleDateString() };
        saveToLocal([newPost, ...posts]);
        message.success('Thêm bài viết mới thành công');
      }
      setOpen(false);
    });
  };

  const onDelete = (id: string) => {
    saveToLocal(posts.filter(p => p.id !== id));
    message.success('Đã xóa bài viết');
  };

  const columns = [
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    { title: 'Trạng thái', dataIndex: 'status', render: (s: string) => <Tag color={s === 'Đã đăng' ? 'green' : 'orange'}>{s}</Tag> },
    { title: 'Lượt xem', dataIndex: 'views', key: 'views' },
    { title: 'Hành động', render: (_: any, r: Post) => (
      <Space>
        <Button onClick={() => { setEditing(r); setOpen(true); }}>Sửa</Button>
        <Popconfirm title="Xóa bài viết này?" onConfirm={() => onDelete(r.id)}>
          <Button danger>Xóa</Button>
        </Popconfirm>
      </Space>
    )},
  ];

  return (
    <div style={{ padding: 24 }}>
      <Button type="primary" onClick={() => { setEditing(null); setOpen(true); }}>+ Thêm bài viết mới</Button>
      <Table dataSource={posts} columns={columns} rowKey="id" style={{ marginTop: 16 }} />
      <Modal visible={open} onOk={handleOk} onCancel={() => setOpen(false)} title={editing ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"} width={800}>
        <PostForm form={form} initialData={editing} onFinish={handleOk} />
      </Modal>
    </div>
  );
};

export default Admin;