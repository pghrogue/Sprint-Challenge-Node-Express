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
router.put( '/:id', (req, res) => {
  const projectData = req.body;
  const { id } = req.params;

  // Check for empty required fields:
  if( !projectData.name || !projectData.description || !projectData.completed ) {
    res.status(400).json({ error: "Please provide: name, description & completed status."});
  } else {
    projects
      .update(id, projectData)
      .then( newProject => {
        if( !newProject || newProject === null ) {
          res.status(404).json({ error: "Project not found." });
        } else {
          res.json( newProject );
        }
      })
      .catch( err => {
        res.status(500).json({ error: "Could not update project."});
      });
    // end projects
  }
});

// DELETE:
router.delete( '/:id', customMW.checkValidProject, (req, res) => {
  const { id } = req.params;

  projects
    .remove(id)
    .then( count => {
      res.json({ message: `${count} project deleted.`});
    })
    .catch( err => {
      res.status(500).json({error: "There was an error deleting the project."});
    })
  // end projects
});


/* ---------- Export ---------- */
module.exports = router;
