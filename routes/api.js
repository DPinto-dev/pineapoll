// IMPORTS --------------------------------------------------
const express = require("express");
const router = express.Router();
const {
  generateRandomString,
  createPollCard
} = require("../public/scripts/helpers");
const { getPollByCreator, addNewPoll } = require("../db/database");
const sendMailGun = require("../public/scripts/mailgun-module");

module.exports = function(pool) {
  router.get("/:pollCode", (req, res) => {
    pool
      .query(
        `
        SELECT id
        FROM polls
        WHERE code = $1
      `,
        [req.params.pollCode]
      )
      .then(results => {
        let id = results.rows[0].id;
        return pool.query(
          `SELECT name, SUM(poll_results.rank) AS borda FROM poll_options
        LEFT JOIN poll_results ON poll_options.id = poll_option_id
        WHERE poll_options.poll_id = $1
        GROUP BY name;`,
          [id]
        );
      })
      .then(results => res.json(results.rows));
  });

  /*
   * Endpoint for retrieving all polls by an user
   */
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

  /**
   * Send email route
   */
  router.get("/share/:pollCode", (req, res) => {
    const pollCode = req.params.pollCode;
    const email = {
      from: "PineaPOLL <diogosp4m@gmail.com>",
      to: "aidanemiddleton@gmail.com",
      subject: "You've been invited to take place in a poll",
      text: `Hello! You have been in invited to take part in a poll hosted by pineapPOLL. To vote, all you have to do is follow this link:
      http://9adb6eef.ngrok.io/votes/${pollCode}`
    };
    sendMailGun(email);
    res.redirect(`/`);
  });

  return router;
};
