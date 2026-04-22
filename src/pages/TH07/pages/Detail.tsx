import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'; 
import { Button, Tag, Divider, Typography } from 'antd';
import ReactMarkdown from 'react-markdown';
import { Post } from '../interfaces/Post';
import { initialPosts } from '../data/mockData'; 

const Detail: React.FC<{ posts?: Post[]; onView?: (id: string) => void }> = ({ posts, onView }) => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory(); 
  
  // 3. Lấy dữ liệu an toàn
  const data = posts || initialPosts;
  const post = data.find((p) => p.id === id);

  useEffect(() => {
    if (id && onView) {
      onView(id);
    }
  }, [id, onView]);

  if (!post) return <div style={{ padding: 24 }}>404 Không tìm thấy bài viết</div>;

  return (
    <div style={{ padding: '24px', maxWidth: 800, margin: '0 auto' }}>

      <Button onClick={() => history.goBack()} style={{ marginBottom: 20 }}>
        Quay lại
      </Button>
      
      <Typography.Title>{post.title}</Typography.Title>
      
      <Typography.Text type="secondary">
        Ngày đăng: {post.date} | Lượt xem: {post.views}
      </Typography.Text>
      
      <div style={{ margin: '16px 0' }}>
        {post.tags?.map((t) => (
          <Tag key={t} color="blue">{t}</Tag>
        ))}
      </div>
      
      <Divider />
      
      <div className="markdown-content">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Detail;
