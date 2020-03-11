/*
 * All database queries will be exported as functions and called from
 * within the route handler in polls.js (...)
 */
const pool = require("../db/db-index");
const { generateRandomString, escapeUnsafeChars } = require("../public/scripts/helpers");
/**
 * Get a single poll from the database given the creator's email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getPollByCreator = email => {
  return pool.query(
    `
    SELECT * FROM polls
    JOIN creators on polls.creator_id = creators.id
    WHERE creator_email = $1;`,
    [email]
  );
  // .then(result => result.rows[0] || null)
  // .catch(err => console.log(err));
};
exports.getPollByCreator = getPollByCreator;

/**
 * Adds a new poll to the database
 * @param {Object} body Req.body sent whe a new poll is submitted
 * @param {Array} body.option Is an array of options POSTed by the HTML form
 * @return {Promise<{}>} A promise sent back to the route handler
 */
const addNewPoll = body => {
  const { pollName, pollDescription, options } = body;
  console.log("TCL: body", body)
  const newPollCode = generateRandomString();

  //NTS: 'RETURNING *' will return the poll that was just inserted into the DB
  //! Currently we are hardcoding the creator_id for demo purposes
  pool.query(
     `INSERT INTO polls (name, description, code, creator_id) VALUES ($1, $2, $3, $4) RETURNING *`,
     [pollName, pollDescription, newPollCode, 10002]
   )
   .then(results => {
     const pollId = results.rows[0].id;
     
    // PREPARED STATEMENT
    //TODO: serial order is not being brought correctly yet
    let queryString = `INSERT INTO poll_options (poll_id, name, serial_order) VALUES `;

    // Add all the options to the queryString for insertion into DB
    for (let i = 0; i < options.length; i++) {
      if (i === options.length - 1) {
        queryString += ` (${pollId}, '${options[i]}', ${i + 1}) RETURNING *;`
      } else {
        queryString += ` (${pollId}, '${options[i]}', ${i + 1}), `
      }
    }
    console.log("TCL: queryString", queryString)
    
    return pool.query(queryString)
    .then(res => res.rows)
    .catch(err => console.log("Error inside the pool.query from database.js", err))
   });
}
exports.addNewPoll = addNewPoll;


const postResults = body => {
  
}


const getResultsByPollId = poll_id => {
  if (thisIsTheQueryWIP) {
    let queryString = `
      SELECT name, SUM(poll_results.rank) AS borda FROM poll_options
      LEFT JOIN poll_results ON poll_options.id = poll_option_id
      WHERE poll_options.poll_id = 10000
      GROUP BY name`;
  }
}
exports.getResultsByPollId = getResultsByPollId;

// poll_options.id, poll_options.poll_id, poll_options.name, poll_options.serial_order

// poll_results.id, poll_results.poll_id, poll_results.poll_option_id, poll_results.user_id, poll_results.rank