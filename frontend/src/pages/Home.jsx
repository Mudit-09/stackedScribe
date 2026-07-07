import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/posts');
                setPosts(res.data);
            } catch (err) {
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (loading) {
        return <div style={{ padding: '6rem 0', textAlign: 'center', color: '#64748b', fontWeight: '500' }}>Loading stories...</div>;
    }

    return (
        <div>
            {/* Elegant Landing Hero Header */}
            <header style={{
                textAlign: 'center',
                padding: '5rem 1rem 4rem 1rem',
                borderBottom: '1px solid #e2e8f0',
                marginBottom: '4rem',
                backgroundColor: '#ffffff',
                marginLeft: '-2rem',
                marginRight: '-2rem'
            }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.04em', lineHeight: '1.1', marginBottom: '1rem' }}>
                    Stay curious<span style={{ color: '#2563eb' }}>.</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: '540px', margin: '0 auto', lineHeight: '1.5', fontWeight: '400' }}>
                    Discover stories, thinking, and expertise from writers on any technical topic.
                </p>
            </header>

            {/* Core Blog Feed Container */}
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                <h3 style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.12em', color: '#64748b', marginBottom: '2rem', fontWeight: '700' }}>
                    Trending Stories
                </h3>
                
                {posts.length === 0 ? (
                    <div style={{ background: '#fff', padding: '4rem 2rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <p style={{ color: '#64748b', fontSize: '1.05rem' }}>No posts published yet. Be the trendsetter!</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {posts.map((post) => (
                            <article 
                                key={post._id} 
                                style={{ 
                                    background: '#ffffff',
                                    padding: '2.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.02)',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 10px 20px -3px rgb(0 0 0 / 0.04)';
                                    e.currentTarget.style.borderColor = '#cbd5e1';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.02)';
                                    e.currentTarget.style.borderColor = '#e2e8f0';
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#64748b', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#475569', fontSize: '0.75rem' }}>
                                        {post.author?.username?.charAt(0).toUpperCase() || 'W'}
                                    </div>
                                    <span style={{ fontWeight: '600', color: '#334155' }}>{post.author?.username || 'Writer'}</span>
                                    <span>•</span>
                                    <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>

                                <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.75rem', letterSpacing: '-0.02em', lineHeight: '1.3' }}>
                                    <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color: '#0f172a' }}>
                                        {post.title}
                                    </Link>
                                </h2>

                                <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                    {post.content.substring(0, 180)}...
                                </p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '600', fontSize: '0.95rem' }}>
                                        Read full story →
                                    </Link>
                                    <span style={{ fontSize: '0.85rem', color: '#94a3b8', background: '#f1f5f9', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                                        Technical
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;