// Base require:
const express = require('express');

// Middleware requires:
const morgan = require('morgan');

// Route requires:

// Server:
const server = express();
const PORT = 5454;

// Middleware:
server.use(
  express.json,
  morgan('dev')
);

// Routes:


// Listen for incoming requests:
server.listen( PORT, () => {
  console.log(`Server listening on port: ${PORT}.`);
});