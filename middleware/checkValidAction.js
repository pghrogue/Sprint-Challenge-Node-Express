/*
 * checkValidAction.js
 * Custom middleware function to check if the id given corresponds
 * to a valid project in the database.
 */
const actions = require('../data/helpers/actionModel');

const checkValidAction = (req, res, next) => {
  const { id } = req.params;

  actions
    .get(id)
    .then( found => {
      next();
    })
    .catch( err => {
      res.status(404).json({ error: "Invalid action ID."});
    });
  // end actions
};


module.exports = {
  checkValidAction: checkValidAction
};