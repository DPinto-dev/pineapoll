/*
 * All routes for querying the Polls table are defined here
 * Loaded in server.js into /polls,
 */

const express = require("express");
const router = express.Router();

module.exports = db => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM polls;`)
      .then(data => {
        const polls = data.rows[0];
        console.log(polls);
        const {
          id,
          name,
          description,
          code,
          creation_date,
          is_active,
          creator_id
        } = polls;
        console.log(name, description, code);
        res.json({ polls });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
