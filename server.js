server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Your feedback array (replace with a database in production)
const feedbackData = [];

// Submit feedback endpoint
app.post('/submit-feedback', (req, res) => {
    const { rating, comment, timestamp } = req.body;
    // Basic validation
    if (!rating || rating < 1 || rating > 5 || !comment) {
        return res.status(400).json({ message: 'Invalid feedback data' });
    }
    feedbackData.push({ rating, comment, timestamp });
    res.json({ message: 'Feedback submitted successfully' });
});

// Analyze feedback endpoint
app.get('/analyze-feedback', (req, res) => {
    const analysis = analyzeFeedback(feedbackData);
    res.json(analysis);
});

function analyzeFeedback(data) {
    // Analysis logic here
    return { /* analysis results */ };
}

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


