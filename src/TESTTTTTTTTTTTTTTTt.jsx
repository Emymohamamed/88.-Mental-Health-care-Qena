import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Postes.css';

const initialHardcoded = [
  {
    id: 1, // Added ID for consistency
    doctor: 'Dr. Noha Smith',
    image: '/images/about-img.jpg',
    time: '2 days ago',
    content: '',
    imageOnly: '/images/post6.jpg',
    reactions: { like: 0, love: 0, angry: 0, supportive: 0 },
    comments: [
      { identity: 'Ali', text: 'This image speaks volumes!', time: '2 days ago' },
      { identity: 'Fatima', text: 'Powerful visual.', time: '2 days ago' },
    ],
  },
  {
    id: 2, // Added ID for consistency
    doctor: 'Dr. Sara Mohamed',
    image: '/images/doc/c.webp',
    time: 'One week ago',
    title: 'How to Deal with Anxiety',
    content: `If you suffer from anxiety, try these simple steps:\n1- Deep breathing.\n2- Exercise.\n3- Write about your feelings.`,
    reactions: { like: 0, love: 0, angry: 0, supportive: 0 },
    comments: [
      { identity: 'Omar', text: 'Can you talk about how to support friends?', time: '1 week ago' },
      { identity: 'Sarah', text: 'Very important topic!', time: '1 week ago' },
    ],
  },
  {
    id: 3, // Added ID for consistency
    doctor: 'Dr. Ahmad Hassan',
    image: '/images/doc/r.webp',
    time: '3 days ago',
    title: 'The Importance of Mental Health',
    content:
      'Mental health is just as important as physical health. Regular check-ins with a mental health professional can help maintain your well-being.',
    reactions: { like: 0, love: 0, angry: 0, supportive: 0 },
    comments: [
      { identity: 'Omar', text: "I've had a difficult experience with anxiety...", time: '3 days ago' },
      { identity: 'Sarah', text: 'Loved the article!', time: '3 days ago' },
    ],
  },
];

const books = [
  {
    title: 'The Body Keeps the Score',
    description: 'How trauma affects body and mind.',
    img: '/images/71Ha3OShqSL._SY466_.jpg',
    link: 'https://www.amazon.com/Body-Keeps-Score-Healing-Trauma/dp/0670785938',
  },
  {
    title: 'Feeling Good: The New Mood Therapy',
    description: 'CBT techniques to improve mood.',
    img: '/images/book2.jpeg',
    link: 'https://www.amazon.com/Feeling-Good-New-Mood-Therapy/dp/0380810336',
  },
  {
    title: 'The Gifts of Imperfection',
    description: 'Self-acceptance over perfection.',
    img: '/images/book3.jpeg',
    link: 'https://www.goodreads.com/book/show/6982138-the-gifts-of-imperfection',
  },
  {
    title: "Man's Search for Meaning",
    description: 'Explores life meaning and suffering.',
    img: '/images/book4.jpeg',
    link: 'https://www.goodreads.com/book/show/4069.Man_s_Search_for_Meaning',
  },
  {
    title: 'Anxiety Relief: Self Help',
    description: 'Strategies to reduce anxiety.',
    img: '/images/book5.jpeg',
    link: 'https://books.google.com/books/about/Anxiety_Relief_Self_Help.html?id=K0X4DAAAQBAJ',
  },
];

const reactionEmojis = { like: '👍', love: '❤', angry: '😡', supportive: '🤗' };

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://mentalhealth.runasp.net/api/Post/GetAllPosts', {
        // Removed Authorization header as per requirement for unauthenticated access
      });
      if (!response.ok) {
        if (response.status === 500) {
          throw new Error('Server error: Unable to fetch posts. Using fallback data.');
        }
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("posts", data);
      setPosts(data);
    } catch (err) {
      setError(err.message);
      // Fallback to hardcoded data on error
      setPosts(initialHardcoded);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = async () => {
    setError('');
    setSuccess('');

    const userRole = localStorage.getItem('userRole');
    if (!userRole || !['doctor', 'therapist'].includes(userRole.toLowerCase())) {
      setError('Only doctors and therapists can create posts.');
      return;
    }

    if (!postTitle || !postContent) {
      setError('Please fill in both title and content fields.');
      return;
    }

    const formData = new FormData();
    formData.append('Title', postTitle);
    formData.append('Content', postContent);
    if (preview) {
      const byteString = atob(preview.split(',')[1]);
      const mimeString = preview.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
      const file = new File([ab], 'postImage.jpg', { type: mimeString });
      formData.append('Image', file);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://mentalhealth.runasp.net/api/Post/AddPost', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to add post');
      const newPost = await response.json();
      setPosts([newPost, ...posts]);
      setPostTitle('');
      setPostContent('');
      setPreview(null);
      setSuccess('Post added successfully!');
    } catch (err) {
      setError(err.message || 'An error occurred while adding the post.');
    }
  };

  const handleEditPost = (postId) => {
    const post = posts.find(p => p.id === postId);
    setSelectedPostId(postId);
    setPostTitle(post.title);
    setPostContent(post.content);
    setEditMode(true);
  };

  const handleSaveEdit = async () => {
    if (!postTitle || !postContent) {
      setError('Please fill in both title and content fields.');
      return;
    }

    const formData = new FormData();
    formData.append('Title', postTitle);
    formData.append('Content', postContent);
    if (preview) {
      const byteString = atob(preview.split(',')[1]);
      const mimeString = preview.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
      const file = new File([ab], 'postImage.jpg', { type: mimeString });
      formData.append('Image', file);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://mentalhealth.runasp.net/api/Post/EditPost/${selectedPostId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to edit post');
      const updatedPost = await response.json();
      setPosts(posts.map(p => p.id === selectedPostId ? updatedPost : p));
      setPostTitle('');
      setPostContent('');
      setPreview(null);
      setSelectedPostId(null);
      setEditMode(false);
      setSuccess('Post updated successfully!');
    } catch (err) {
      setError(err.message || 'An error occurred while updating the post.');
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://mentalhealth.runasp.net/api/Post/DeletePost/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to delete post');
      setPosts(posts.filter(p => p.id !== postId));
      setSuccess('Post deleted successfully!');
    } catch (err) {
      setError(err.message || 'An error occurred while deleting the post.');
    }
  };

  const handleEditImage = async (postId) => {
    if (!preview) {
      setError('Please upload an image to update.');
      return;
    }

    const formData = new FormData();
    const byteString = atob(preview.split(',')[1]);
    const mimeString = preview.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    const file = new File([ab], 'postImage.jpg', { type: mimeString });
    formData.append('Image', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://mentalhealth.runasp.net/api/Post/EditImage/${postId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to update image');
      const updatedPost = await response.json();
      setPosts(posts.map(p => p.id === postId ? updatedPost : p));
      setPreview(null);
      setSuccess('Image updated successfully!');
    } catch (err) {
      setError(err.message || 'An error occurred while updating the image.');
    }
  };

  const handleDeleteImage = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://mentalhealth.runasp.net/api/Post/DeleteImage/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to delete image');
      const updatedPost = { ...posts.find(p => p.id === postId), image: null };
      setPosts(posts.map(p => p.id === postId ? updatedPost : p));
      setSuccess('Image deleted successfully!');
    } catch (err) {
      setError(err.message || 'An error occurred while deleting the image.');
    }
  };

  const handleAddReaction = async (postId, reactionType) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to add a reaction.');
      return;
    }

    try {
      const response = await fetch('http://mentalhealth.runasp.net/api/Post/AddReact', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, reactionType, reactedAt: new Date().toISOString() }),
      });
      if (!response.ok) throw new Error('Failed to add reaction');
      const updatedPost = await response.json();
      setPosts(posts.map(p => p.id === postId ? updatedPost : p));
      setError(''); // Clear any previous error
    } catch (err) {
      setError(err.message || 'An error occurred while adding reaction.');
    }
  };

  const handleAddComment = async (text, postId, identity) => {
    if (!text.trim()) {
      setError('Comment cannot be empty.');
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in to add a comment.');
      return;
    }

    try {
      const response = await fetch('http://mentalhealth.runasp.net/api/Post/AddComment', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, text, identity, commentedAt: new Date().toISOString() }),
      });
      if (!response.ok) throw new Error('Failed to add comment');
      fetchPosts(); // Refresh posts to include new comment
      setError(''); // Clear any previous error
    } catch (err) {
      setError(err.message || 'An error occurred while adding comment.');
    }
  };

  return (
    <div className="posts-page">
      <Navbar />
      <section className="section-padding">
        <Container>
          <Row>
            <Col md={3} className="sidebar">
              <h3>Books</h3>
              {books.map((b, i) => (
                <div key={i} className="book-item">
                  <img src={b.img} alt={b.title} className="book-image" />
                  <div className="book-title">{b.title}</div>
                  <div className="book-description">{b.description}</div>
                  <a href={b.link} className="post-book-button" target="_blank" rel="noreferrer">
                    View Book
                  </a>
                </div>
              ))}
            </Col>
            <Col md={9} className="container-post">
              <div className="post-submission">
                <h2>{editMode ? 'Edit Post' : 'New Post'}</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Enter post title"
                />
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Write your post here..."
                />
                <div className="file-upload">
                  <label htmlFor="imageUpload">📷 Upload Image</label>
                  <input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
                {preview && <img src={preview} className="uploaded-image" alt="Preview" />}
                {editMode ? (
                  <div>
                    <button onClick={handleSaveEdit}>Save Changes</button>
                    <button onClick={() => { setEditMode(false); setSelectedPostId(null); setPostTitle(''); setPostContent(''); setPreview(null); }}>Cancel</button>
                  </div>
                ) : (
                  <button onClick={handlePostSubmit}>Submit Post</button>
                )}
              </div>

              {posts.map((post) => (
                <div key={post.id} className="post">
                  <div className="post-header">
                    <img src={post.image || '/images/d2.jpg'} className="doctor-image" alt={post.doctor} />
                    <span className="doctor-name">{post.doctor}</span>
                    <span className="post-time">{post.time}</span>
                  </div>
                  <h2>{post.title}</h2>
                  <div className="post-content">
                    {post.content.split('\n').map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </div>
                  <div className="reactions">
                    {['like', 'love', 'angry', 'supportive'].map((type) => (
                      <button
                        key={type}
                        className="reaction-button"
                        onClick={() => handleAddReaction(post.id, type)}
                      >
                        {reactionEmojis[type]} {type.charAt(0).toUpperCase() + type.slice(1)} ({post.reactions?.[type] || 0})
                      </button>
                    ))}
                  </div>
                  <div>
                    <button onClick={() => handleEditPost(post.id)}>Edit</button>
                    <button onClick={() => handleDeletePost(post.id)}>Delete Post</button>
                    {post.image && <button onClick={() => handleDeleteImage(post.id)}>Delete Image</button>}
                    {!post.image && preview && <button onClick={() => handleEditImage(post.id)}>Update Image</button>}
                  </div>
                  <CommentForm postId={post.id} onAddComment={handleAddComment} />
                  <div className="comments-list">
                    {post.comments?.map((com, j) => (
                      <div key={j} className="comment">
                        <strong>{com.identity === 'anonymous' ? 'Anonymous' : com.identity}:</strong>{' '}
                        {com.text}
                        <span className="comment-time">{com.commentedAt || com.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
};

const CommentForm = ({ postId, onAddComment }) => {
  const [text, setText] = useState('');
  const [identity, setIdentity] = useState('named');

  const submitComment = () => {
    onAddComment(text, postId, identity);
    setText('');
  };

  return (
    <div className="comment-section">
      <div className="identity-selection">
        <label>
          <input
            type="radio"
            checked={identity === 'named'}
            value="named"
            onChange={(e) => setIdentity(e.target.value)}
          />{' '}
          You
        </label>
        <label>
          <input
            type="radio"
            checked={identity === 'anonymous'}
            value="anonymous"
            onChange={(e) => setIdentity(e.target.value)}
          />{' '}
          Anonymous
        </label>
      </div>
      <textarea
        rows="3"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your comment here..."
      />
      <button className="post-comment-button" onClick={submitComment}>
        Add Comment
      </button>
    </div>
  );
};

const fetchPosts = async () => {
  try {
    const response = await fetch('http://mentalhealth.runasp.net/api/Post/GetAllPosts');
    if (!response.ok) throw new Error('Failed to fetch posts');
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message || 'Error fetching posts');
  }
};

export default PostsPage;