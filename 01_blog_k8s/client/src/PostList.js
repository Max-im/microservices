import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

export default function PostList() {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get('http://posts.com/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='container'>
      <h1>Posts</h1>
      <div className='d-flex flex-row flex-wrap justify-content-between'>
        {Object.values(posts).map((post) => (
          <div className='card' style={{ width: '30%', marginBottom: '30px' }} key={post.id}>
            <div className='card-body'>
              <h3>{post.title}</h3>
              <CommentList comments={post.comments} />
              <CommentCreate postId={post.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
