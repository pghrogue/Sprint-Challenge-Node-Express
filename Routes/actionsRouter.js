// Base requires:
const express = require('express');
const router = express.Router();

// App requires:
const actions = require('../data/helpers/actionModel');
const customMW = require('../middleware/checkValidAction');


/* ---------- Endpoints for /api/actions ---------- */
// GET (list):
router.get( '/', (req, res) => {
  actions
    .get()
    .then( list => {
      res.json(list);
    })
    .catch( err => {
      res.status(500).json({ error: "Action information could not be retrieved."})
    });
  // end actions
});


// GET by id:
router.get( '/:id', customMW.checkValidAction, (req, res) => {
  const { id } = req.params;

  actions
    .get(id)
    .then( list => {
      res.json(list);
    })
    .catch( err => {
      res.status(500).json({ error: `Action information for id: ${id} could not be retrieved.`})
    });
  // end actions
});


// POST:
router.post( '/', (req, res) => {
  const actionData = req.body;

  // Check for empty required fields:
  if( !actionData.project_id || !actionData.description || !actionData.notes ) {
    res.status(400).json({ error: "Please provide name, description & project_id of the action."});
  } else {
    // Check for empty completed field:
    if( !actionData.completed ) {
      actionData.completed = 0;
    }
    // Insert:
    actions
      .insert(actionData)
      .then( newAction => {
        res.json(newAction);
      })
      .catch( err => {
        res.status(500).json({ error: "Could not add new action."});
      });
    // end actions
  }
});

// PUT:
router.put( '/:id', (req, res) => {
  const actionData = req.body;
  const { id } = req.params;

  // Check for empty required fields:
  if( !actionData.project_id || !actionData.description || !actionData.notes || !actionData.completed ) {
    res.status(400).json({ error: "Please provide: name, description, project_id & completed status."});
  } else {
    actions
      .update(id, actionData)
      .then( newAction => {
        if( !newAction || newAction === null ) {
          res.status(404).json({ error: "Action not found." });
        } else {
          res.json( newAction );
        }
      })
      .catch( err => {
        res.status(500).json({ error: "Could not update action."});
      });
    // end actions
  }
});

// DELETE:
router.delete( '/:id', customMW.checkValidAction, (req, res) => {
  const { id } = req.params;

  actions
    .remove(id)
    .then( count => {
      res.json({ message: `${count} action deleted.`});
    })
    .catch( err => {
      res.status(500).json({error: "There was an error deleting the action."});
    })
  // end action
});


/* ---------- Export ---------- */
module.exports = router;
