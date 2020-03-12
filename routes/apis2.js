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
   * Endpoint for retrieve all polls by an user
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
};
