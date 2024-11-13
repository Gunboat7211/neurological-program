const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/medical-survey', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

// Define a Schema and Model
const ResponseSchema = new mongoose.Schema({
    name: String,
    email: String,
    score: Number,
    date: { type: Date, default: Date.now }
});

const Response = mongoose.model('Response', ResponseSchema);

// API endpoint to save responses
app.post('/api/responses', async (req, res) => {
    const response = new Response(req.body);
    await response.save();
    res.status(201).send(response);
});

// API endpoint to get responses
app.get('/api/responses', async (req, res) => {
    const responses = await Response.find();
    res.send(responses);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



