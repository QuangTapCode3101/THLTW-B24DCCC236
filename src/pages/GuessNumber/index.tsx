import React, { useState, useEffect } from 'react';
import { Card, InputNumber, Button, Progress, Typography, Space, Result, message } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import styles from './index.less';

const { Title } = Typography;

const GuessNumber: React.FC = () => {
	const [target, setTarget] = useState<number>(0);
	const [guess, setGuess] = useState<number | null>(null);
	const [attempts, setAttempts] = useState<number>(0);
	const [status, setStatus] = useState<'playing' | 'win' | 'lose'>('playing');

	const init = () => {
		setTarget(Math.floor(Math.random() * 100) + 1);
		setAttempts(0);
		setStatus('playing');
		setGuess(null);
	};

	useEffect(() => init(), []);

	const handleGuess = () => {
		if (guess === null) return;
		const newCount = attempts + 1;
		setAttempts(newCount);

		if (guess === target) {
			setStatus('win');
		} else if (newCount >= 10) {
			setStatus('lose');
		} else {
			if (guess < target) {
				message.info('Thấp quá!');
			} else {
				message.info('Cao quá!');
			}
		}
	};

	return (
		<PageContainer>
			<Card className={styles.gameCard}>
				{status !== 'playing' ? (
					<Result
						status={status === 'win' ? 'success' : 'error'}
						title={status === 'win' ? 'Chúc mừng! Bạn đã thắng!' : 'Bạn đã hết lượt!'}
						subTitle={`Số đúng là: ${target}`}
						extra={
							<Button type='primary' onClick={init}>
								Chơi lại
							</Button>
						}
					/>
				) : (
					<Space direction='vertical' align='center' style={{ width: '100%' }}>
						<Title level={3}>Đoán số từ 1 - 100</Title>
						<Progress type='circle' percent={attempts * 10} format={() => `${attempts}/10`} />
						<InputNumber min={1} max={100} value={guess} onChange={setGuess} size='large' />
						<Button type='primary' onClick={handleGuess} block>
							Đoán
						</Button>
					</Space>
				)}
			</Card>
		</PageContainer>
	);
};
export default GuessNumber;
