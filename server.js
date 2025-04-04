// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // GitPod uses custom ports

// Middleware
app.use(express.json()); // for JSON bodies
app.use(express.static('public')); // serve static files

// Import API connection module
const apiRoutes = require('./app/lib/api/connection');

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// API routes
app.use('/api', apiRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`bolt.diy server running on http://localhost:${PORT}`);
  console.log(`GROQ API integration: ${process.env.GROQ_API_KEY ? 'Configured' : 'Missing'}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
