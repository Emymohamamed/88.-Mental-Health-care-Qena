import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/Postes.css';

const initialHardcoded = [
  {
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
  const [hcPosts, setHcPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [preview, setPreview] = useState(null);
  const [isDoctorOrTherapist, setIsDoctorOrTherapist] = useState(false); // Assume role from context
  const [isAdmin, setIsAdmin] = useState(false); // Assume role from context
  const [isUser, setIsUser] = useState(false); // Assume role from context
  const [isDoctor, setIsDoctor] = useState(false); // Assume role from context
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token'); // أو 'accessToken' حسب اسم المفتاح عندك
        const response = await axios.get(
          'http://mentalhealth.runasp.net/api/Post/GetAllPosts',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedPosts = response.data.map(post => ({
          ...post,
          reactions: { like: 0, love: 0, angry: 0, supportive: 0 },
          comments: [],
        })).reverse();

        console.log("response", response);
        setPosts(fetchedPosts);

      } catch (error) {
        console.log('Failed to fetch posts, using hardcoded data:', error);
        const storedHardComments = JSON.parse(localStorage.getItem('hardComments')) || {};
        const storedHardReactions = JSON.parse(localStorage.getItem('hardReactions')) || {};

        const mergedHard = initialHardcoded.map((hp, idx) => ({
          ...hp,
          comments: storedHardComments[idx] || hp.comments,
          reactions: storedHardReactions[idx] || hp.reactions,
        })).reverse();

        setHcPosts(mergedHard);
      }
    };

    fetchPosts();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handlePostSubmit = () => {
    if (!isDoctorOrTherapist) return;
    const newPost = {
      doctor: 'You', // Should be dynamic based on logged-in user
      image: '/images/d2.jpg',
      time: new Date().toLocaleString(),
      title: postTitle,
      content: postContent,
      imagePreview: preview,
      reactions: { like: 0, love: 0, angry: 0, supportive: 0 },
      comments: [],
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem('posts', JSON.stringify(updated));
    setPostTitle('');
    setPostContent('');
    setPreview(null);
  };

  const handleAddComment = (text, index, identity) => {
    const comment = { text, identity, time: new Date().toLocaleString() };

    if (index < hcPosts.length) {
      const updatedHard = [...hcPosts];
      updatedHard[index].comments.push(comment);
      setHcPosts(updatedHard);

      const persisted = JSON.parse(localStorage.getItem('hardComments')) || {};
      persisted[index] = updatedHard[index].comments;
      localStorage.setItem('hardComments', JSON.stringify(persisted));
    } else {
      const idx = index - hcPosts.length;
      const copy = [...posts];
      if (!copy[idx].comments) copy[idx].comments = [];
      copy[idx].comments.push(comment);
      setPosts(copy);
      localStorage.setItem('posts', JSON.stringify(copy));
    }
  };

  const handleReaction = (type, index) => {
    if (index < hcPosts.length) {
      const updatedHard = [...hcPosts];
      updatedHard[index].reactions[type]++;
      setHcPosts(updatedHard);

      const storedReactions = JSON.parse(localStorage.getItem('hardReactions')) || {};
      storedReactions[index] = updatedHard[index].reactions;
      localStorage.setItem('hardReactions', JSON.stringify(storedReactions));
    } else {
      const idx = index - hcPosts.length;
      const copy = [...posts];
      copy[idx].reactions[type]++;
      setPosts(copy);
      localStorage.setItem('posts', JSON.stringify(copy));
    }
  };

  const handleDeletePost = async (id, index) => {
    if (!(isAdmin || isUser)) return;
    try {
      await axios.delete(`http://mentalhealth.runasp.net/api/Post/DeletePost/${id}`);
      if (index < hcPosts.length) {
        const updatedHard = hcPosts.filter((_, i) => i !== index);
        setHcPosts(updatedHard);
        localStorage.setItem('hardComments', JSON.stringify(updatedHard.map((p, i) => p.comments[i] || [])));
        localStorage.setItem('hardReactions', JSON.stringify(updatedHard.map((p, i) => p.reactions[i] || {})));
      } else {
        const idx = index - hcPosts.length;
        const updated = posts.filter((_, i) => i !== idx);
        setPosts(updated);
        localStorage.setItem('posts', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleEditPost = (post, index) => {
    if (!isDoctor) return;
    setEditingPost({ ...post, index });
    setPostTitle(post.title || '');
    setPostContent(post.content || '');
    setPreview(post.imagePreview || null);
  };

  const handleSaveEdit = async () => {
    if (!isDoctor || !editingPost) return;
    const updatedPost = {
      title: postTitle,
      content: postContent,
      image: preview,
    };
    try {
      await axios.put(`http://mentalhealth.runasp.net/api/Post/EditPost/${editingPost.id}`, updatedPost, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (editingPost.index < hcPosts.length) {
        const updatedHard = [...hcPosts];
        updatedHard[editingPost.index] = { ...updatedHard[editingPost.index], ...updatedPost };
        setHcPosts(updatedHard);
      } else {
        const idx = editingPost.index - hcPosts.length;
        const updated = [...posts];
        updated[idx] = { ...updated[idx], ...updatedPost };
        setPosts(updated);
        localStorage.setItem('posts', JSON.stringify(updated));
      }
      setEditingPost(null);
      setPostTitle('');
      setPostContent('');
      setPreview(null);
    } catch (error) {
      console.error('Failed to edit post:', error);
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
              {isDoctorOrTherapist && (
                <div className="post-submission">
                  <h2>New Post</h2>
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
                  {editingPost ? (
                    <button onClick={handleSaveEdit}>Save Edit</button>
                  ) : (
                    <button onClick={handlePostSubmit}>Submit Post</button>
                  )}
                </div>
              )}
              {[...hcPosts, ...posts].map((post, i) => (
                <div key={i} className="post">
                  <div className="post-header">
                    <img src={post.image || post.imagePreview} className="doctor-image" alt={post.doctor} />
                    <span className="doctor-name">{post.doctor}</span>
                    <span className="post-time">{post.time}</span>
                  </div>
                  <h2>{post.title}</h2>
                  {post.imageOnly ? (
                    <img src={post.imageOnly} alt="Post visual" className="post-image-only" />
                  ) : (
                    <div className="post-content">
                      {post.content.split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </div>
                  )}
                  <div className="reactions">
                    {['like', 'love', 'angry', 'supportive'].map((type) => (
                      <button
                        key={type}
                        className="reaction-button"
                        onClick={() => handleReaction(type, i)}
                      >
                        {reactionEmojis[type]} {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                    {Object.entries(post.reactions).map(([t, c]) => (
                      <span key={t} className="reaction-count">
                        {t.charAt(0).toUpperCase() + t.slice(1)}s: {c}
                      </span>
                    ))}
                  </div>
                  <CommentForm index={i} onAddComment={handleAddComment} />
                  <div className="comments-list">
                    {post.comments.map((com, j) => (
                      <div key={j} className="comment">
                        <strong>{com.identity === 'anonymous' ? 'Anonymous' : com.identity}:</strong>{' '}
                        {com.text}
                        <span className="comment-time">{com.time}</span>
                      </div>
                    ))}
                  </div>
                  {(isAdmin || isUser) && (
                    <button onClick={() => handleDeletePost(post.id, i)}>Delete Post</button>
                  )}
                  {isDoctor && (
                    <button onClick={() => handleEditPost(post, i)}>Edit Post</button>
                  )}
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

const CommentForm = ({ index, onAddComment }) => {
  const [text, setText] = useState('');
  const [identity, setIdentity] = useState('named');
  const submit = () => text.trim() && onAddComment(text, index, identity) && setText('');
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
      <button className="post-comment-button" onClick={submit}>
        Add Comment
      </button>
    </div>
  );
};

export default PostsPage;