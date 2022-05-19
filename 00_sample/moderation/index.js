const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
    const {type, data} = req.body;

    if (type === 'commentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://localhost:5005/events', {
            event: {
                type: 'commentModerated', 
                data: { 
                    id: data.id,
                    status,
                    postId: data.postId,
                    content: data.content
                }
            }
        });
    }

    res.send({});
});

app.listen(5003, () => console.log('moderation service run'))