/*
 * checkValidProject.js
 * Custom middleware function to check if the id given corresponds
 * to a valid project in the database.
 */
const project = require('../data/helpers/projectModel');

const checkValidProject = (req, res, next) => {
  const { id } = req.params;

  project
    .get(id)
    .then( found => {
      next();
    })
    .catch( err => {
      res.status(404).json({ error: "Invalid project ID."});
    });
  // end project
};


module.exports = {
  checkValidProject: checkValidProject
};