import React, { useEffect } from 'react';
import { Form, Input, Select, FormInstance } from 'antd';
import { Post } from '../interfaces/Post';

interface Props { form: FormInstance; initialData: Post | null; onFinish: (values: any) => void; }

const PostForm: React.FC<Props> = ({ form, initialData, onFinish }) => {
  useEffect(() => {
    if (initialData) form.setFieldsValue(initialData);
    else { form.resetFields(); form.setFieldsValue({ status: 'Nháp', tags: [] }); }
  }, [initialData, form]);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item name="content" label="Nội dung"><Input.TextArea rows={4} /></Form.Item>
      <Form.Item name="thumbnail" label="Link ảnh"><Input /></Form.Item>
      <Form.Item name="tags" label="Tags"><Select mode="tags" /></Form.Item>
      <Form.Item name="status" label="Trạng thái"><Select options={[{value:'Nháp'}, {value:'Đã đăng'}]} /></Form.Item>
    </Form>
  );
};

export default PostForm;