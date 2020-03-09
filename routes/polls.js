/*
 * All routes for querying the Polls table are defined here
 * Loaded in server.js into /polls,
 */

const express = require("express");
const router = express.Router();

module.exports = pool => {
  router.get("/", (req, res) => {
    pool
      .query(`SELECT * FROM polls;`)
      .then(data => {
        const polls = data.rows;
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

  router.get("/creator", (req,res) => {
      pool.query(`
    SELECT * FROM polls
    JOIN creators ON polls.creator_id = creators.id
    WHERE creator_email = $1;`, ['lighthouse@gmail.com']) 
        .then(result => res.send(result.rows[0] || null))
        // .then(result => console.log(result))
        .catch(err => console.log(err));
    });

  return router;
};
