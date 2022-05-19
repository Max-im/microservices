const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
    const { event } = req.body;

    events.push(event);

    axios.post('http://localhost:5000/events', event);
    axios.post('http://localhost:5001/events', event);
    axios.post('http://localhost:5002/events', event);
    axios.post('http://localhost:5003/events', event);

    res.send({status: 'OK'});
});


app.get('/events', (req, res) => {
    res.send(events);    
});

app.listen(5005, () => console.log('EVENT BUS run'))