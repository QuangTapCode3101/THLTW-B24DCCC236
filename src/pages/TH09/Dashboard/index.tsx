import { Card, Col, Row, Statistic } from 'antd';
import dayjs from 'dayjs';
import { getTasks } from '@/utils/taskStorage';
import styles from './index.less';

export default function Dashboard() {
  const tasks = getTasks();

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'done').length;
  const overdue = tasks.filter(
    t => t.status !== 'done' && dayjs(t.deadline).isBefore(dayjs())
  ).length;

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card className={styles.statCard}>
          <Statistic title="Tổng số Task" value={total} />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Hoàn thành"
            value={completed}
            valueStyle={{ color: 'green' }}
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card>
          <Statistic
            title="Quá hạn"
            value={overdue}
            valueStyle={{ color: 'red' }}
          />
        </Card>
      </Col>
    </Row>
  );
}