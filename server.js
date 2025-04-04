const express = require('express');
const app = express();
// Listen on port 3000 as requested, and fall back to process.env.PORT for other environments
const PORT = 3000;

// Middleware
app.use(express.json()); // for JSON bodies
app.use(express.static('public')); // serve static files

// Load Bolt.diy's main application logic
let boltDiyApp;
try {
    boltDiyApp = require('./app/lib/api/connection'); // adjust if needed
} catch (error) {
    console.error("ERROR: Could not load bolt.diy application logic from './app/lib/api/connection'. Please check the path.");
    console.error(error);
    // Fallback to a simple handler to avoid crashing the server entirely
    boltDiyApp = (req, res) => {
        res.status(500).json({ error: "Bolt.diy application logic not loaded." });
    };
}


// Health check (can be useful)
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// All other API routes go through Bolt.diy
app.use('/api', boltDiyApp);

// Optional: Serve something on the root path if you have static assets in 'public'
// If there's an index.html in 'public', it will be served automatically
app.get('/', (req, res) => {
    res.send('Bolt.diy backend is running. Static files are served from "/public", API from "/api".');
});

// Start server
app.listen(PORT, () => {
    console.log(`Bolt.diy server is starting on port ${PORT}`);

    if (process.env.GITPOD_WORKSPACE_URL) {
        const previewUrl = `https://${PORT}-${process.env.GITPOD_WORKSPACE_URL.substring(8)}`;
        console.log(`Your application should be available on Gitpod at: ${previewUrl}`);
    } else {
        console.log(`Your application should be available locally at: http://localhost:${PORT}`);
    }
});
