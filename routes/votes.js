const express = require("express");
const router = express.Router();
const { generateRandomString } = require("../public/scripts/helpers");
const escapeUnsafeChars = require("../public/scripts/helpers")

module.exports = pool => {
  router.post('/', (req, res) => {
    const pollCode = req.body['poll-code'];
    res.redirect(`/votes/${pollCode}`);
  })
  //populates the poll options
  router.get('/:pollCode', (req, res) => {
    console.log(req.params["pollCode"]);
    const pollCode = req.params["pollCode"].trim();
    console.log('this is the pollcode entered: ', pollCode);
    pool.query(`
      SELECT id
      FROM polls
      WHERE code = $1
    `, [pollCode])
    .then(results => {
      const id = results.rows[0].id;
      console.log('this should be the id:', id)
      pool.query(`
      SELECT polls.name AS question, poll_options.name AS options
      FROM polls
      JOIN poll_options ON polls.id = poll_options.poll_id
      WHERE poll_id = $1
      `, [id])
      .then(results => {
        const question = results.rows[0].question;
        let resultsArray = [];
        for (let i = 0; i < results.rows.length; i++) {
          resultsArray.push(results.rows[i].options)
        }
        let templateVars =  { question, pollOptions: resultsArray }
      res.render('vote_screen.ejs', templateVars);
      })
    })
  });
  router.get("/results/:pollCode", (req, res) => {
    const pollCode = req.params.pollCode
    res.render("results_graph", { pollCode });
  });
  return router;
}
