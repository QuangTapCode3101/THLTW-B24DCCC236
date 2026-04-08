import React, { useState } from 'react';
import { Row, Col, Card, Button, List, Typography, Steps, Divider, Empty, message, Avatar } from 'antd';
import { PlusOutlined, DeleteOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { DESTINATIONS } from '../MockData';

const { Title, Text } = Typography;

const Planner = () => {
  const [myPlan, setMyPlan] = useState([]);

  const addToPlan = (item) => {
    setMyPlan([...myPlan, { ...item, planId: Date.now() }]);
    message.success(`Đã thêm ${item.name} vào lịch trình`);
  };

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2}>Lập kế hoạch chuyến đi</Title>
      <Row gutter={24}>
        <Col xs={24} lg={8}>
          <Card title="Lịch trình của bạn" bordered={false} style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            {myPlan.length > 0 ? (
              <Steps
                direction="vertical"
                current={myPlan.length}
                items={myPlan.map((item, index) => ({
                  title: `Ngày ${index + 1}: ${item.name}`,
                  description: item.location,
                  icon: <EnvironmentOutlined />,
                  subTitle: <Button type="link" danger onClick={() => setMyPlan(myPlan.filter(i => i.planId !== item.planId))}><DeleteOutlined /></Button>
                }))}
              />
            ) : (
              <Empty description="Chưa có điểm đến nào" />
            )}
            <Divider />
            <div style={{ textAlign: 'right' }}>
              <Text strong>Tổng dự kiến: </Text>
              <Text style={{ color: '#ff4d4f', fontSize: '18px' }}>
                {myPlan.reduce((sum, item) => sum + item.price, 0).toLocaleString()} Đ
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card title="Gợi ý điểm đến" bordered={false} style={{ borderRadius: '8px' }}>
            <List
              itemLayout="horizontal"
              dataSource={DESTINATIONS}
              renderItem={(item) => (
                <List.Item
                  actions={[<Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => addToPlan(item)} />]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.image} shape="square" size={64} />}
                    title={item.name}
                    description={`${item.location} | Dự kiến chi phí: ${item.price.toLocaleString()} Đ`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Planner;