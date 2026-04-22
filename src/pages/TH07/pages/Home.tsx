import React, { useState } from 'react';
import { Row, Col, Input, Pagination } from 'antd';
import PostCard from '../components/PostCard';
import { Post } from '../interfaces/Post';
import { initialPosts } from '../data/mockData';
import { useEffect } from 'react';
const Home: React.FC<{ posts?: Post[] }> = (props) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [search, setSearch] = useState('');
    const [tag, setTag] = useState<string | null>(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const saved = localStorage.getItem('blog_posts');
        if (saved) {
            setPosts(JSON.parse(saved));
        } else {
            setPosts(initialPosts);
        }
    }, []);
    const filtered = posts?.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) &&
        (!tag || p.tags.includes(tag))
    ) || [];

    const displayPosts = filtered.slice((page - 1) * 9, page * 9);

    return (
        <div style={{ padding: 24 }}>
            <Input.Search
                placeholder="Tìm kiếm tiêu đề..."
                onChange={e => setSearch(e.target.value)}
                style={{ marginBottom: 20, maxWidth: 300 }}
            />
            <Row gutter={[16, 16]}>
                {displayPosts.map(p => (
                    <Col xs={24} sm={12} md={8} key={p.id}>
                        <PostCard post={p} onTagClick={(t) => { setTag(t); setPage(1); }} />
                    </Col>
                ))}
            </Row>
            <Pagination
                current={page}
                pageSize={9}
                total={filtered.length}
                onChange={setPage}
                style={{ marginTop: 24, textAlign: 'center' }}
            />
        </div>
    );
};

export default Home;