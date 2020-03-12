const express = require("express");
const router = express.Router();
const { generateRandomString } = require("../public/scripts/helpers");
const escapeUnsafeChars = require("../public/scripts/helpers")

module.exports = pool => {

  router.post('/', (req, res) => {
    const pollCode = req.body['poll-code'].trim();
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
        SELECT name
        FROM poll_options
        WHERE poll_id = $1
      `, [id])
      .then(results => {
        let resultsArray = [];
        for (let i = 0; i < results.rows.length; i++) {
          resultsArray.push(results.rows[i].name)
        }
        let templateVars =  { pollOptions: resultsArray }
      res.render('vote_screen.ejs', templateVars);
      })
    })
  })
  return router;
}

router.get("/results/:pollCode", (req, res) => {
  const pollCode = req.params.pollCode
  res.render("results_graph", { pollCode });
});
