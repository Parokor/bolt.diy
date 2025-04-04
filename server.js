const express = require('express');
const app = express();
const PORT = process.env.PORT || 80; // RunPod uses port 80

// Middleware
app.use(express.json()); // for JSON bodies
app.use(express.static('public')); // serve static files

// Load Bolt.diy's main application logic
const boltDiyApp = require('./app/lib/api/connection'); // adjust if needed

// Health check (important for RunPod)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// All other routes go through Bolt.diy
app.use('/api', boltDiyApp); // or whatever entry point you have

// Start server
app.listen(PORT, () => {
  console.log(`Bolt.diy server running on http://localhost:${PORT}`);
});
