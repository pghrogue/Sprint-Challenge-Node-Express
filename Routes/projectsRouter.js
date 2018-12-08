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

// Get actions - may need to come back to this later. Need to add POST first to
// check for what happens when no actions are available for valid project:
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
router.post( '/', (req, res) => {
  const projectData = req.body;

  // Check for empty required fields:
  if( !projectData.name || !projectData.description ) {
    res.status(400).json({ error: "Please provide name and description of the project."});
  } else {
    // Check for empty completed field:
    if( !projectData.completed ) {
      projectData.completed = 0;
    }
    // Insert:
    projects
      .insert(projectData)
      .then( newProject => {
        res.json(newProject);
      })
      .catch( err => {
        res.status(500).json({ error: "Could not add new project."});
      });
    // end projects
  }
});

// PUT:
router.put( '/:id', (req, res) => {});

// DELETE:
router.delete( '/:id', (req, res) => {});


/* ---------- Export ---------- */
module.exports = router;
