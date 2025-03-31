const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const communityRoutes = require('./routes/community');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/community', communityRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app; 