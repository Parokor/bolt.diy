// server.js - Entry point for bolt.diy application
require('dotenv').config();
const express = require('express');
const { createRequestHandler } = require('@remix-run/express');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 80; // RunPod uses port 80 by default

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Health check endpoint for RunPod
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Log API configuration
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`Log Level: ${process.env.LOG_LEVEL || 'info'}`);
console.log(`GROQ API: ${process.env.GROQ_API_KEY ? 'Configured' : 'Missing'}`);
console.log(`GROQ Turbo: ${process.env.FEATURE_GROQ_TURBO === 'true' ? 'Enabled' : 'Disabled'}`);

// Serve Remix app (using build output from remix vite:build)
app.all(
  '*',
  createRequestHandler({
    build: require(path.join(process.cwd(), 'build/index.js')),
    mode: process.env.NODE_ENV
  })
);

// Start server
app.listen(PORT, () => {
  console.log(`bolt.diy server running on http://localhost:${PORT}`);
});
