const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const posts = {};

const app = express();
app.use(express.json());
app.use(cors());

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const postId = randomBytes(4).toString('hex');
    const post = {id: postId, title: req.body.title};
    posts[postId] = post;

    await axios.post('http://localhost:5005/events', {event: {type: 'postCreated', data: post}});

    res.status(201).send(posts[postId]);
});

app.post('/events', (req, res) => {
    res.end();
});

app.listen(5000, () => console.log('posts service run'))