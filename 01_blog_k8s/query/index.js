const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

function handleEvent(type, data) {
  if (type === 'postCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === 'commentCreated') {
    const { postId, id, content, status } = data;
    posts[postId].comments.push({ id, content, status });
  }
  if (type === 'commentUpdated') {
    const { postId, id, content, status } = data;
    const comment = posts[postId].comments.find((c) => c.id === id);

    comment.content = content;
    comment.status = status;
  }
}

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(5002, async () => {
  console.log('query run');
  const eventsArr = await axios.get('http://event-bus-srv:5005/events');
  for (const e of eventsArr.data) {
    handleEvent(e.type, e.data);
  }
});
