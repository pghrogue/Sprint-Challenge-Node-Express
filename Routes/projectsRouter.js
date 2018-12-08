// Base requires:
const express = require('express');
const router = express.Router();

// App requires:
const projects = require('../data/helpers/projectModel');


/* ---------- Endpoints for /api/projects ---------- */
// GET (list):
router.get( '/', (req, res) => {});

// GET by id:
router.get( '/:id', (req, res) => {});

// POST:
router.post( '/', (req, res) => {});

// PUT:
router.put( '/:id', (req, res) => {});

// DELETE:
router.delete( '/:id', (req, res) => {});


/* ---------- Export ---------- */
module.exports = router;
