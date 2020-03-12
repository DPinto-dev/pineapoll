/*
 * All database queries will be exported as functions and called from
 * within the route handler in polls.js (...)
 */
const pool = require("./db-index");
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
  // 1st - We create a new poll:
  pool.query(
     `INSERT INTO polls (name, description, code, creator_id) VALUES ($1, $2, $3, $4) RETURNING *`,
     [pollName, pollDescription, newPollCode, 10002]
   )
   .then(results => {
     const pollId = results.rows[0].id;
     
    // 2nd - Add options to the poll that was just created
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

const getPollIdByCode = pollCode => {
  return pool.query(`SELECT id FROM polls WHERE code = '${pollCode}'`)
}
exports.getPollIdByCode = getPollIdByCode;


const getPollOptionId = (pollId, serialOrder) => {
  pool.query(`SELECT  poll_options.id as optionid
  FROM poll_options 
  JOIN polls ON polls.id = poll_id
  WHERE polls.id = $1 AND serial_order = $2`, [pollId, serialOrder])
    .then(results => {
      const pollOptionId = results.rows[0].optionid;
      return pollOptionId;
    })
    return pollOptionId;
}
exports.getPollOptionId = getPollOptionId;

/**
 * Receives an object with pollId and optionsId and inserts the vote into the db 
 * @param {Object} result 
 */
const addResultsToDb = result => {

  const { pollId, serialOrderArr, optionIdArr } = result;
  console.log(`optionIdArr - inside addResultsToDb ${optionIdArr} end of array`);
  console.log("typeof optionIdArr", typeof optionIdArr);
  console.log("optionIdArr.length", optionIdArr.length);

   let queryString = `INSERT INTO poll_results (poll_id, poll_option_id, user_id, rank) VALUES `;


   // Add all the options to the queryString for insertion into DB
   for (let i = 0; i < optionIdArr.length; i++) {
     if (i === optionIdArr.length - 1) {
       queryString += ` (${pollId}, '${optionIdArr[i]}', 'Diogo', ${optionIdArr.length - i}) RETURNING *;`
     } else {
       queryString += ` (${pollId}, '${optionIdArr[i]}', 'Diogo', ${optionIdArr.length - i}), `
     }
   }
   console.log("TCL: queryString", queryString)
   
   return pool.query(queryString)
   .then(res => res.rows)
   .catch(err => console.log("Error inside the pool.query from database.js", err))

}
exports.addResultsToDb = addResultsToDb;
  




// poll_options.id, poll_options.poll_id, poll_options.name, poll_options.serial_order

// poll_results.id, poll_results.poll_id, poll_results.poll_option_id, poll_results.user_id, poll_results.rank


// creators
// id	creator_email

// polls
// id	name	description	code	creation_date	is_active	creator_id

// poll_options
// id	poll_id	name	serial_order

// poll_results:
// id	poll_id	poll_option_id	user_id	rank