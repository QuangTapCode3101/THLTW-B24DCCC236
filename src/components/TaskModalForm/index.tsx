import { Modal, Form, Input, DatePicker, Select } from 'antd';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { Task } from '@/types/task';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  editingTask?: Task | null;
}

export default function TaskModalForm({
  visible,
  onCancel,
  onSubmit,
  editingTask,
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue({
        ...editingTask,
        deadline: dayjs(editingTask.deadline),
      });
    } else {
      form.resetFields();
    }
  }, [editingTask]);

  return (
    <Modal
      visible={visible}
      title={editingTask ? 'Chỉnh sửa Task' : 'Thêm Task'}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="title"
          label="Tên Task"
          rules={[{ required: true, message: 'Nhập tên task' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="deadline"
          label="Deadline"
          rules={[{ required: true, message: 'Chọn deadline' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="priority" label="Mức độ ưu tiên" initialValue="medium">
          <Select>
            <Select.Option value="high">Cao</Select.Option>
            <Select.Option value="medium">Trung bình</Select.Option>
            <Select.Option value="low">Thấp</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="tags" label="Tag">
          <Select mode="tags" placeholder="Nhập tag" />
        </Form.Item>
      </Form>
    </Modal>
  );
}