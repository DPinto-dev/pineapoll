/*
 * All routes for querying the Polls table are defined here
 * Loaded in server.js into /polls,
 */
// IMPORTS --------------------------------------------------
const express = require("express");
const router = express.Router();
const {
  generateRandomString,
  createPollCard
} = require("../public/scripts/helpers");
const { getPollByCreator, addNewPoll } = require("../db/database");

module.exports = pool => {
  /*
   * Polls Index - Browse. List all polls for a particular email
   */

  // Let's treat this route as an api? Maybe..
  router.get("/", (req, res) => {
    router.get("/:email", (req, res) => {
      const email = req.params.email;
      getPollByCreator(email)
        .then(results => {
          pollsArray = [];
          for (const poll of results.rows) {
            pollsArray.push(createPollCard(poll));
          }
          const templateVars = { pollsArray };
          res.render("polls_browse", templateVars);
        })
        .catch(err => console.log(err));
    });
  });

  /**
   * POST to /polls - from "Home"
   */
  router.post("/", (req, res) => {
    const ownerEmail = req.body.email;
    const templateVars = { ownerEmail };
    res.render("polls_new", templateVars);
  });

  /*
   * GET New Poll Form
   */
  router.get("/new", (req, res) => {
    const ownerEmail = req.body.email;
    const templateVars = { ownerEmail };
    res.render("polls_new", templateVars);
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
