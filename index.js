// Base requirement:
const express = require('express');

// Server:
const server = express();
const PORT = 5454;

// Middleware:
server.use(express.json);




// Listen for incoming requests:
server.listen( PORT, () => {
  console.log(`Server listening on port: ${PORT}.`);
});