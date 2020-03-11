const express = require("express");
const router = express.Router();
const { generateRandomString } = require("../public/scripts/helpers");


module.exports = pool => {

  router.post('/', (req, res) => {
    const pollCode = req.body['poll-code'];
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
      .then(results => console.log('this should be the names of the options', results.rows))
    })
    res.redirect('/');
  })
  return router;
}

