require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./logger');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use((err, req, res, next) => {
    logger.error({
      message: err.message,
      stack: err.stack,
      path: req.path,
      body: req.body,
      query: req.query,
      params: req.params,
    }); // Log the error details
  
    res.status(err.status || 500).json({ error: 'Internal Server Error' });
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    body: req.body,
    query: req.query,
    params: req.params,
  }); // Log the error details

  res.status(err.status || 500).json({ error: 'Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
