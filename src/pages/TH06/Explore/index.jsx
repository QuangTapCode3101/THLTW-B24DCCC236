import React, { useState } from 'react';
import { Row, Col, Card, Tag, Select, Input, Space, Button, Modal, Typography } from 'antd';
import { CalendarOutlined, CarOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { DESTINATIONS } from '../MockData';

const { Title, Text } = Typography;

const Explore = () => {
  const [filterType, setFilterType] = useState('all');
  const [selectedTour, setSelectedTour] = useState(null); // Lưu tour đang xem chi tiết

  const filteredData = DESTINATIONS.filter(item => filterType === 'all' || item.type === filterType);

  return (
    <div style={{ padding: '24px', background: '#f5f5f5' }}>
      <Title level={2} style={{ color: '#003a8c', borderBottom: '2px solid #ff4d4f', width: 'fit-content' }}>
        HOT TOUR
      </Title>

      <Space style={{ marginBottom: 24 }}>
        <Select defaultValue="all" style={{ width: 200 }} onChange={setFilterType}>
          <Select.Option value="all">Tất cả điểm đến</Select.Option>
          <Select.Option value="beach">Du lịch Biển</Select.Option>
          <Select.Option value="mountain">Vùng núi cao</Select.Option>
        </Select>
      </Space>

      <Row gutter={[20, 20]}>
        {filteredData.map(item => (
          <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
            <Card
              hoverable
              bodyStyle={{ padding: '12px' }}
              cover={
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  {/* Tag Sale 0% giống ảnh mẫu */}
                  <div style={{
                    position: 'absolute', top: 0, right: 15, background: '#ff4d4f',
                    color: 'white', padding: '5px 10px', zIndex: 1, fontWeight: 'bold',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)'
                  }}>
                    SALE <br/> 0%
                  </div>
                  <img alt={item.name} src={item.image} style={{ height: 180, width: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 10, left: 10, color: 'white', background: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>
                    <CalendarOutlined /> 4 Ngày / 3 Đêm
                  </div>
                </div>
              }
            >
              <Title level={5} style={{ fontSize: '14px', height: '40px', overflow: 'hidden' }}>
                HÀ NỘI - {item.name.toUpperCase()} (4 Ngày / 3 Đêm)
              </Title>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  <CarOutlined /> Máy Bay & Ô Tô
                </Text>
                <Text type="secondary" style={{ fontSize: '12px' }}>Giá từ</Text>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                <Text type="secondary" style={{ fontSize: '12px' }}><CalendarOutlined /> 2026</Text>
                <Text style={{ color: '#ff4d4f', fontWeight: 'bold', fontSize: '16px' }}>
                  {item.price.toLocaleString()} Đ
                </Text>
              </div>

              <Button 
                type="primary" 
                block 
                style={{ marginTop: 15, background: '#fa8c16', borderColor: '#fa8c16' }}
                onClick={() => setSelectedTour(item)}
              >
                Giữ Chỗ
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* MODAL CHI TIẾT TOUR */}
      <Modal
        title={selectedTour?.name}
        open={!!selectedTour}
        onCancel={() => setSelectedTour(null)}
        footer={[
          <Button key="back" onClick={() => setSelectedTour(null)}>Đóng</Button>,
          <Button key="submit" type="primary" danger>Đặt Tour ngay</Button>
        ]}
        width={800}
      >
        {selectedTour && (
          <Row gutter={20}>
            <Col span={12}>
              <img src={selectedTour.image} style={{ width: '100%', borderRadius: '8px' }} />
            </Col>
            <Col span={12}>
              <Title level={4}>Giới thiệu chi tiết</Title>
              <p><b>Địa điểm:</b> <EnvironmentOutlined /> {selectedTour.location}</p>
              <p><b>Mô tả:</b> Đây là hành trình khám phá {selectedTour.name} tuyệt vời nhất năm 2026 với dịch vụ 5 sao.</p>
              <div style={{ background: '#fff7e6', padding: '15px', borderRadius: '8px' }}>
                <Text strong style={{ color: '#d46b08' }}>Lịch trình bao gồm:</Text>
                <ul>
                  <li>Vé máy bay khứ hồi</li>
                  <li>Khách sạn 4 sao trung tâm</li>
                  <li>Các bữa ăn theo chương trình</li>
                </ul>
              </div>
            </Col>
          </Row>
        )}
      </Modal>
    </div>
  );
};

export default Explore;