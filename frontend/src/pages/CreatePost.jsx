import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the new post data to our protected route
            await axios.post('http://localhost:5000/api/posts', {
                title,
                content,
                coverImage
            });
            
            alert('Post published successfully!');
            navigate('/'); // Redirect back to the Home page feed
        } catch (err) {
            console.error('Error creating post:', err);
            alert('Failed to publish post. Please make sure you are logged in.');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
            <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Write a New Story</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    style={{ padding: '0.8rem', fontSize: '1.1rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Cover Image URL (Optional)" 
                    value={coverImage} 
                    onChange={(e) => setCoverImage(e.target.value)} 
                    style={{ padding: '0.8rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <textarea 
                    placeholder="Tell your story..." 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    rows="10"
                    style={{ padding: '0.8rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
                    required 
                />
                <button 
                    type="submit" 
                    style={{ 
                        padding: '0.8rem', 
                        backgroundColor: '#0070f3', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '4px', 
                        fontSize: '1rem', 
                        fontWeight: 'bold', 
                        cursor: 'pointer' 
                    }}
                >
                    Publish Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;