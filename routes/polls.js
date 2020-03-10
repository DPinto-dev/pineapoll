/*
 * All routes for querying the Polls table are defined here
 * Loaded in server.js into /polls,
 */
// IMPORTS --------------------------------------------------
const express = require("express");
const router = express.Router();
const { generateRandomString } = require("../public/scripts/helpers");

module.exports = pool => {
  /*
   * Polls Index - Browse. List all polls for a particular email
   */
  router.get("/", (req, res) => {
    pool
      .query(
        `
    SELECT * FROM polls
    JOIN creators ON polls.creator_id = creators.id
    WHERE creator_email = $1;`,
        ["lighthouse@gmail.com"]
      )
      // .then(result => res.send(result.rows[0] || null))
      // .then(result => console.log(result))
      .then(result => {
        const {
          id,
          name,
          description,
          code,
          creation_date,
          is_active,
          creator_id
        } = result.rows[0];
        const templateVars = {
          id,
          name,
          description,
          code,
          creation_date,
          is_active,
          creator_id
        };
        res.render("polls_browse", templateVars);
      })
      .catch(err => console.log(err));
  });

  /*
   * GET New Poll From
   */
  router.get("/new", (req, res) => {
    res.render("polls_new");
  });

  /*
   * POST New poll to Database
   */
  router.post("/new", (req, res) => {
    // There will be an email on the database = creator_id in the query
    const { pollName, pollDescription, pollOption1 } = req.body;
    console.log(pollName, pollDescription, pollOption1);
    const newPollCode = generateRandomString();

    // Add a new poll
    pool
      .query(
        `INSERT INTO polls (name, description, code, creator_id) VALUES ($1, $2, $3, $4) RETURNING *`,
        [pollName, pollDescription, newPollCode, 10002]
      )
      .then(
        pool.query(
          `
      SELECT * FROM polls WHERE polls.code = $1`,
          [newPollCode]
        )
      )
      .then(results => console.log("Return from Select", results.rows));

    // Add options
  });

  /*
   * Testing route
   */
  router.get("/test", (req, res) => {
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

  return router;
};
