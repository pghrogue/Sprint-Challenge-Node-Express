// Base requires:
const express = require('express');
const router = express.Router();

// App requires:
const projects = require('../data/helpers/projectModel');
const customMW = require('../middleware/checkValidProject');


/* ---------- Endpoints for /api/projects ---------- */
// GET (list):
router.get( '/', (req, res) => {
  projects
    .get()
    .then( list => {
      res.json(list);
    })
    .catch( err => {
      res.status(500).json({ error: "Project information could not be retrieved."})
    });
  // end projects
});

// GET by id:
router.get( '/:id', customMW.checkValidProject, (req, res) => {
  const { id } = req.params;

  projects
    .get(id)
    .then( list => {
      res.json(list);
    })
    .catch( err => {
      res.status(500).json({ error: `Project information for id: ${id} could not be retrieved.`})
    });
  // end projects
});

// Get actions:
router.get( '/:id/actions', customMW.checkValidProject, (req, res) => {
  const { id } = req.params;

  projects
    .getProjectActions(id)
    .then( list => {
      res.json(list);
    })
    .catch( err => {
      res.status(500).json({ error: `Project actions could not be retrieved.`})
    });
  // end projects
});

// POST:
router.post( '/', (req, res) => {});

// PUT:
router.put( '/:id', (req, res) => {});

// DELETE:
router.delete( '/:id', (req, res) => {});


/* ---------- Export ---------- */
module.exports = router;
