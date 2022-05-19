import React, { useState } from 'react';
import axios from 'axios';

export default function CommentCreate({ postId }) {
  const [content, setContent] = useState('');

  const onSubmit = async (e) => {
      e.preventDefault();
      await axios.post(`http://localhost:5001/posts/${postId}/comments`, {content});
      setContent('');
  }

  return (
    <div className='container'>
      <form className="form-gourp" onSubmit={onSubmit}>
        <div>
          <label>New Comment</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
