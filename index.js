// Base require:
const express = require('express');

// Middleware requires:
const morgan = require('morgan');

// Route requires:
const projectsRouter = require('./Routes/projectsRouter');
const actionsRouter = require('./Routes/actionsRouter');

// Server:
const server = express();
const PORT = 5454;


/* ---------- Middleware: ---------- */
server.use(
  express.json(),
  morgan('dev')
);


/* ---------- Routes Middleware: ---------- */
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

// Default route handlers - for testing.
server.get( '/', (req, res) => {
  res.json({ message: "Connected" });
});
server.get( '/api', (req, res) => {
  res.json({ message: "Connected to API" });
});


/* ---------- Listen for incoming requests: ---------- */
server.listen( PORT, () => {
  console.log(`Server listening on port: ${PORT}.`);
});