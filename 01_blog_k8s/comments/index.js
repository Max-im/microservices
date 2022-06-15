const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const comments = {};

const app = express();
app.use(express.json());
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
  res.send(comments[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const postId = req.params.id;
  const id = randomBytes(4).toString('hex');

  comments[postId] = comments[postId] || [];
  const comment = { id, postId, content: req.body.content, statys: 'pending' };
  comments[postId].push(comment);

  await axios.post('http://event-bus-srv:5005/events', {
    event: { type: 'commentCreated', data: comment },
  });

  res.status(201).send(comments[postId]);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'commentModerated') {
    const { postId, id, status } = data;
    const commentsArr = comments[postId];
    const comment = commentsArr.find((c) => c.id === id);
    comment.status = status;
    await axios.post('http://event-bus-srv:5005/events', {
      event: { type: 'commentUpdated', data: comment },
    });
  }

  res.end();
});

app.listen(5001, () => console.log('comments service run'));
