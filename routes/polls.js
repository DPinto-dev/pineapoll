/*
 * All routes for querying the Polls table are defined here
 * Loaded in server.js into /polls,
 */
// IMPORTS --------------------------------------------------
const express = require("express");
const router = express.Router();
const { generateRandomString } = require("../public/scripts/helpers");
const { getPollByCreator, addNewPoll } = require("../db/database");

module.exports = pool => {
  /*
   * Polls Index - Browse. List all polls for a particular email
   */
  router.get("/", (req, res) => {
    getPollByCreator("lighthouse@gmail.com")
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
   * GET New Poll Form
   */
  router.get("/new", (req, res) => {
    res.render("polls_new");
  });


  /*
   * POST New poll to Database
   */
  router.post("/new", (req, res) => {
    // There will be an email on the database = creator_id in the query
    let poll = req.body;
    addNewPoll(poll);
    res.redirect("/polls/new");
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
