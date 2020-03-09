/*
 * All database queries will be exported as functions and called from
 * within the route handler in polls.js (...)
 */

/**
 * Get a single poll from the database given the creator's email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getPollByCreator = function(email) {
  return pool
    .query(
      `
    SELECT * FROM polls
    JOIN creators on polls.creator_id = creators.id
    WHERE creator_email = $1;`,
      [email]
    )
    .then(result => result.rows[0] || null)
    .catch(err => console.log(err));
};
exports.getPollByCreator = getPollByCreator;

// SELECT * FROM poll_options
// LEFT JOIN poll_results ON poll_options.id = poll_option_id
// WHERE poll_options.poll_id = 1
// GROUP BY poll_options.id, poll_results.id;
