import React from 'react';

export default function CommentList({ comments }) {
  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}: {comment.status}</li>
        ))}
      </ul>
    </div>
  );
}
