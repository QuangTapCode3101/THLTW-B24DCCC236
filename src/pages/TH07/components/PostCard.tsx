import React from 'react';
import { Card, Tag, Typography, Space } from 'antd'; // Thêm Space để căn chỉnh
import { Link } from 'umi';
import { Post } from '../interfaces/Post';

const { Text } = Typography;

interface Props { post: Post; onTagClick: (tag: string) => void; }

const PostCard: React.FC<Props> = ({ post, onTagClick }) => {
    return (
        <Card
            hoverable
            cover={<img alt={post.title} src={post.thumbnail} style={{ height: 180, objectFit: 'cover' }} />}
            actions={[<Link key="view" to={`/th07/post/${post.id}`}>Xem chi tiết</Link>]}
            style={{ height: '100%' }}
        >
            <Card.Meta
                title={<strong>{post.title}</strong>}
                description={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                            {post.date}
                        </Text>

                        <p style={{
                            height: 40,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            margin: 0
                        }}>
                            {post.summary}
                        </p>

                        {/* Sửa lại phần Tag cho đẹp */}
                        <Space size={[0, 4]} wrap>
                            {post.tags.map(t => (
                                <Tag
                                    key={t}
                                    color="blue"
                                    style={{ cursor: 'pointer', borderRadius: '4px' }}
                                    onClick={() => onTagClick(t)}
                                >
                                    {t}
                                </Tag>
                            ))}
                        </Space>
                    </div>
                }
            />
        </Card>
    );
};

export default PostCard;