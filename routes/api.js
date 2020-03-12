const express = require("express");
const router = express.Router();



module.exports = function(pool) {
  router.get('/:pollCode', (req, res) => {
    pool.query(`
        SELECT id
        FROM polls
        WHERE code = $1
      `, [req.params.pollCode])
      .then(results => {
        let id = results.rows[0].id;
        return pool.query(`SELECT name, SUM(poll_results.rank) AS borda FROM poll_options
        LEFT JOIN poll_results ON poll_options.id = poll_option_id
        WHERE poll_options.poll_id = $1
        GROUP BY name;`, [id])
      })
      .then(results => res.json(results.rows));
  });

  return router;
}
